package com.poliglotek.controller;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.poliglotek.service.TokenBlacklistService;
import io.micronaut.context.annotation.Value;
import io.micronaut.http.HttpRequest;
import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Post;
import io.micronaut.security.annotation.Secured;
import io.micronaut.security.authentication.Authentication;
import io.micronaut.security.rules.SecurityRule;
import io.micronaut.security.token.jwt.generator.JwtTokenGenerator;
import io.micronaut.serde.annotation.Serdeable;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@Controller("/api")
public class AuthController {

    private final String googleClientId;
    private final JwtTokenGenerator jwtTokenGenerator;
    private final TokenBlacklistService tokenBlacklistService;

    public AuthController(@Value("${google-cloud.client-id}") String googleClientId,
                          JwtTokenGenerator jwtTokenGenerator,
                          TokenBlacklistService tokenBlacklistService) {
        this.googleClientId = googleClientId;
        this.jwtTokenGenerator = jwtTokenGenerator;
        this.tokenBlacklistService = tokenBlacklistService;
    }

    @Post("/login")
    @Secured(SecurityRule.IS_ANONYMOUS)
    public LoginResponse login(@Body LoginRequest request) throws GeneralSecurityException, IOException {
        GoogleIdTokenVerifier verifier = buildVerifier();
        GoogleIdToken googleIdToken = verifier.verify(request.googleIdToken);
        if (googleIdToken == null) {
            throw new SecurityException("Invalid Google ID token");
        }
        GoogleIdToken.Payload payload = googleIdToken.getPayload();
        String userId = payload.getSubject();
        String email = payload.getEmail();
        Map<String, Object> attributes = new HashMap<>();
        attributes.put("email", email);
        attributes.put("role", Collections.singletonList("USER"));
        Authentication authentication = Authentication.build(
                userId, // This becomes the 'sub' claim in the JWT
                attributes
        );

        Integer _24h = 24 * 60 * 60;
        String customJWT = jwtTokenGenerator.generateToken(authentication, _24h)
                .orElseThrow(() -> new RuntimeException("Failed to generate custom JWT"));
        return new LoginResponse(customJWT);
    }

    @Serdeable
    public record LoginRequest(String googleIdToken) {}

    @Serdeable
    public record LoginResponse(String customToken) {}

    @Post("/logout")
    @Secured(SecurityRule.IS_AUTHENTICATED)
    public void logout(HttpRequest<?> request) throws ExecutionException, InterruptedException {
        String authHeader = request.getHeaders().get("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            tokenBlacklistService.blacklistToken(token);
        }
    }

    private GoogleIdTokenVerifier buildVerifier() {
        return new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), GsonFactory.getDefaultInstance())
                .setAudience(Collections.singletonList(googleClientId))
                .build();
    }
}
