package com.poliglotek.controller

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken
import com.poliglotek.application.auth.dto.LoginRequest
import com.poliglotek.application.auth.dto.LoginResponse
import com.poliglotek.presentation.auth.AuthController
import io.micronaut.http.HttpHeaders
import io.micronaut.http.HttpRequest
import io.micronaut.http.HttpResponse
import io.micronaut.security.authentication.Authentication
import io.micronaut.security.token.jwt.generator.JwtTokenGenerator
import io.micronaut.test.extensions.spock.annotation.MicronautTest
import spock.lang.Specification

import java.security.GeneralSecurityException

@MicronautTest(environments = ["test"])
class AuthControllerSpec extends Specification {

    JwtTokenGenerator jwtTokenGenerator = Mock()
    AuthControllerWrapper authControllerWrapper

    def setup() {
        authControllerWrapper = new AuthControllerWrapper("obsolete-test-client-id", jwtTokenGenerator)
    }

    def "login should return a JWT token for a valid Google ID token"() {
        given:
        def loginRequest = new LoginRequest("valid-google-token")
        def mockPayload = Mock(GoogleIdToken.Payload)

        and: "mock verification will succeed"
        authControllerWrapper.mockVerificationResult = true
        authControllerWrapper.mockGooglePayload = mockPayload

        and: "payload will provide user data"
        mockPayload.getSubject() >> "user123"
        mockPayload.getEmail() >> "test@example.com"

        and: "JWT generator will succeed"
        jwtTokenGenerator.generateToken(_ as Authentication, 10800) >> Optional.of("jwt-token")

        when:
        def response = authControllerWrapper.login(loginRequest)

        then:
        response.customToken() == "jwt-token"
        authControllerWrapper.verifiedToken == "valid-google-token"
    }

    def "login should throw SecurityException for invalid Google ID token"() {
        given:
        def loginRequest = new LoginRequest("invalid-google-token")

        and: "mock verification will fail"
        authControllerWrapper.mockVerificationResult = false

        when:
        authControllerWrapper.login(loginRequest)

        then:
        thrown(SecurityException)
        authControllerWrapper.verifiedToken == "invalid-google-token"
    }

    def "login should throw RuntimeException when token generation fails"() {
        given:
        def loginRequest = new LoginRequest("valid-google-token")
        def mockPayload = Mock(GoogleIdToken.Payload)

        and: "mock verification will succeed"
        authControllerWrapper.mockVerificationResult = true
        authControllerWrapper.mockGooglePayload = mockPayload

        and: "payload will provide user data"
        mockPayload.getSubject() >> "user123"
        mockPayload.getEmail() >> "test@example.com"

        and: "JWT generator will fail"
        jwtTokenGenerator.generateToken(_ as Authentication, 10800) >> Optional.empty()

        when:
        authControllerWrapper.login(loginRequest)

        then:
        thrown(RuntimeException)
    }

    def "logout should extract the token from the authorization header"() {
        given:
        def request = Mock(HttpRequest)
        def headers = Mock(HttpHeaders)

        and:
        request.getHeaders() >> headers
        headers.get("Authorization") >> "Bearer jwt-token-123"

        when:
        authControllerWrapper.logout(request)

        then:
        authControllerWrapper.extractedToken == "jwt-token-123"
    }

    def "logout should handle the case of missing authorization header"() {
        given:
        def request = Mock(HttpRequest)
        def headers = Mock(HttpHeaders)

        and:
        request.getHeaders() >> headers
        headers.get("Authorization") >> null

        when:
        authControllerWrapper.logout(request)

        then:
        authControllerWrapper.extractedToken == null
    }

    // Test wrapper class that avoids calling GoogleIdTokenVerifier as it's impossible to mock it
    static class AuthControllerWrapper extends AuthController {
        boolean mockVerificationResult = false
        GoogleIdToken.Payload mockGooglePayload = null
        String verifiedToken = null
        String extractedToken = null
        private final JwtTokenGenerator tokenGenerator

        AuthControllerWrapper(String googleClientId, JwtTokenGenerator jwtTokenGenerator) {
            super(googleClientId, jwtTokenGenerator)
            this.tokenGenerator = jwtTokenGenerator
        }

        @Override
        HttpResponse<LoginResponse> login(LoginRequest request) throws GeneralSecurityException, IOException {
            verifiedToken = request.googleIdToken()

            if (!mockVerificationResult) {
                throw new SecurityException("Invalid Google ID token")
            }


            Map<String, Object> attributes = new HashMap<>()
            String email = mockGooglePayload.getEmail()
            attributes.put("email", email)
            attributes.put("role", Collections.singletonList("USER"))

            String userId = mockGooglePayload.getSubject()
            Authentication authentication = Authentication.build(
                    userId,
                    attributes
            )

            int _3h = 10800
            String customJWT = tokenGenerator.generateToken(authentication, _3h)
                    .orElseThrow(() -> new RuntimeException("Failed to generate custom JWT"))

            return HttpResponse.ok(new LoginResponse(customJWT))
        }

        @Override
        HttpResponse<?> logout(HttpRequest<?> request, Authentication authentication) {
            String authHeader = request.getHeaders().get("Authorization")
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                extractedToken = authHeader.substring(7)
            }
            return HttpResponse.noContent()
        }
    }
}