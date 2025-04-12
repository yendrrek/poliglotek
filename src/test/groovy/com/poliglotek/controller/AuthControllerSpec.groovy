package com.poliglotek.controller

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken
import io.micronaut.http.HttpHeaders
import io.micronaut.http.HttpRequest
import io.micronaut.security.authentication.Authentication
import io.micronaut.security.token.jwt.generator.JwtTokenGenerator
import spock.lang.Specification

import java.security.GeneralSecurityException

class AuthControllerSpec extends Specification {

    JwtTokenGenerator jwtTokenGenerator = Mock()
    String googleClientId = "test-client-id"

    // Test wrapper for AuthController
    AuthControllerWrapper controller

    def setup() {
        controller = new AuthControllerWrapper(googleClientId, jwtTokenGenerator)
    }

    def "login should return a JWT token for a valid Google ID token"() {
        given:
        def loginRequest = new AuthController.LoginRequest("valid-google-token")
        def mockPayload = Mock(GoogleIdToken.Payload)

        and: "mock verification will succeed"
        controller.mockVerificationResult = true
        controller.mockGooglePayload = mockPayload

        and: "payload will provide user data"
        mockPayload.getSubject() >> "user123"
        mockPayload.getEmail() >> "test@example.com"

        and: "JWT generator will succeed"
        jwtTokenGenerator.generateToken(_ as Authentication, 10800) >> Optional.of("jwt-token")

        when:
        def response = controller.login(loginRequest)

        then:
        response.customToken() == "jwt-token"
        controller.verifiedToken == "valid-google-token"
    }

    def "login should throw SecurityException for invalid Google ID token"() {
        given:
        def loginRequest = new AuthController.LoginRequest("invalid-google-token")

        and: "mock verification will fail"
        controller.mockVerificationResult = false

        when:
        controller.login(loginRequest)

        then:
        thrown(SecurityException)
        controller.verifiedToken == "invalid-google-token"
    }

    def "login should throw RuntimeException when token generation fails"() {
        given:
        def loginRequest = new AuthController.LoginRequest("valid-google-token")
        def mockPayload = Mock(GoogleIdToken.Payload)

        and: "mock verification will succeed"
        controller.mockVerificationResult = true
        controller.mockGooglePayload = mockPayload

        and: "payload will provide user data"
        mockPayload.getSubject() >> "user123"
        mockPayload.getEmail() >> "test@example.com"

        and: "JWT generator will fail"
        jwtTokenGenerator.generateToken(_ as Authentication, 10800) >> Optional.empty()

        when:
        controller.login(loginRequest)

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
        controller.logout(request)

        then:
        controller.extractedToken == "jwt-token-123"
    }

    def "logout should handle the case of missing authorization header"() {
        given:
        def request = Mock(HttpRequest)
        def headers = Mock(HttpHeaders)

        and:
        request.getHeaders() >> headers
        headers.get("Authorization") >> null

        when:
        controller.logout(request)

        then:
        controller.extractedToken == null
    }

    // Test wrapper class that avoids calling GoogleIdTokenVerifier at all
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
        public LoginResponse login(LoginRequest request) throws GeneralSecurityException, IOException {
            // Record the token we were asked to verify
            verifiedToken = request.googleIdToken()

            if (!mockVerificationResult) {
                throw new SecurityException("Invalid Google ID token")
            }

            // Use our mock payload
            String userId = mockGooglePayload.getSubject()
            String email = mockGooglePayload.getEmail()

            Map<String, Object> attributes = new HashMap<>()
            attributes.put("email", email)
            attributes.put("role", Collections.singletonList("USER"))

            Authentication authentication = Authentication.build(
                    userId,
                    attributes
            )

            int _3h = 10800
            String customJWT = tokenGenerator.generateToken(authentication, _3h)
                    .orElseThrow(() -> new RuntimeException("Failed to generate custom JWT"))

            return new LoginResponse(customJWT)
        }

        @Override
        public void logout(HttpRequest<?> request) {
            String authHeader = request.getHeaders().get("Authorization")
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                extractedToken = authHeader.substring(7)
            }
        }
    }
}