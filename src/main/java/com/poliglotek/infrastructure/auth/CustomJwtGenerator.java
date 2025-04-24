package com.poliglotek.infrastructure.auth;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.poliglotek.application.auth.TokenGenerator;
import io.micronaut.security.authentication.Authentication;
import io.micronaut.security.token.jwt.generator.JwtTokenGenerator;
import jakarta.inject.Singleton;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@Singleton
public class CustomJwtGenerator implements TokenGenerator {

    private final JwtTokenGenerator jwtTokenGenerator;
    private static final int TOKEN_EXPIRATION_3_HOURS_IN_SECONDS = 10800;

    public CustomJwtGenerator(JwtTokenGenerator jwtTokenGenerator) {
        this.jwtTokenGenerator = jwtTokenGenerator;
    }

    public String generateToken(GoogleIdToken.Payload payload) {
        Map<String, Object> attributes = populateAttributes(payload.getEmail(), payload);
        String userId = payload.getSubject();
        return generateCustomJWT(attributes, userId);
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
