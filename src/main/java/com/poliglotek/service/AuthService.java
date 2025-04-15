package com.poliglotek.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.poliglotek.model.loginrequest.LoginRequest;
import com.poliglotek.model.loginresponse.LoginResponse;
import io.micronaut.context.annotation.Value;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.HttpStatus;
import io.micronaut.http.exceptions.HttpStatusException;
import io.micronaut.security.authentication.Authentication;
import io.micronaut.security.token.jwt.generator.JwtTokenGenerator;
import jakarta.inject.Singleton;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@Singleton
public class AuthService {

    private static final Logger LOG = LoggerFactory.getLogger(AuthService.class);
    private static final int TOKEN_EXPIRATION_3_HOURS_IN_SECONDS = 10800;
    private GoogleIdTokenVerifier verifier;
    private final JwtTokenGenerator jwtTokenGenerator;

    @Value("${google-cloud.client-id}")
    private String googleClientId;

    @PostConstruct
    public void init() {
        this.verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), GsonFactory.getDefaultInstance())
                .setAudience(Collections.singletonList(googleClientId))
                .build();
    }

    public AuthService(JwtTokenGenerator jwtTokenGenerator) {
        this.jwtTokenGenerator = jwtTokenGenerator;
    }

    public HttpResponse<LoginResponse> validateLoginProcess(LoginRequest request) {
        try {
            validateRequest(request);
            GoogleIdToken token = verifier.verify(request.googleIdToken());
            validateToken(token);
            GoogleIdToken.Payload payload = token.getPayload();
            String email = payload.getEmail();
            validatePayload(payload, email);
            Map<String, Object> attributes = populateAttributes(email, payload);
            String userId = payload.getSubject();
            String customJWT = generateCustomJWT(attributes, userId);
            LOG.info("User successfully logged in: {}", email);
            return HttpResponse.ok(new LoginResponse(customJWT));
        } catch (GeneralSecurityException | IOException e) {
            LOG.error("Error during token verification", e);
            throw new HttpStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Unable to verify token");
        }
    }

    private void validateRequest(LoginRequest request) {
        boolean isInvalid = request == null || request.googleIdToken() == null || request.googleIdToken().isBlank();
        if (isInvalid) {
            throw new HttpStatusException(HttpStatus.BAD_REQUEST, "Google ID token is required");
        }
    }

    private void validateToken(GoogleIdToken googleIdToken) {
        if (googleIdToken == null) {
            LOG.warn("Invalid Google ID token received");
            throw new HttpStatusException(HttpStatus.UNAUTHORIZED, "Invalid Google ID token");
        }
    }

    private void validatePayload(GoogleIdToken.Payload payload, String email) {
        if (!payload.getEmailVerified()) {
            LOG.warn("Unverified email attempt: {}", email);
            throw new HttpStatusException(HttpStatus.UNAUTHORIZED, "Email not verified");
        }
    }

    private Map<String, Object> populateAttributes(String email, GoogleIdToken.Payload payload) {
        Map<String, Object> attributes = new HashMap<>();
        attributes.put("email", email);
        attributes.put("name", payload.get("name"));
        attributes.put("picture", payload.get("picture"));
        attributes.put("roles", Collections.singletonList("USER"));
        return attributes;
    }

    private String generateCustomJWT(Map<String, Object> attributes, String userId) {
        Authentication authentication = Authentication.build(userId, attributes);
        return jwtTokenGenerator.generateToken(authentication, TOKEN_EXPIRATION_3_HOURS_IN_SECONDS)
                .orElseThrow(() -> new RuntimeException("Failed to generate custom JWT"));
    }
}
