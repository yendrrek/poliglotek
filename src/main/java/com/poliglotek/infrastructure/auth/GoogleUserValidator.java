package com.poliglotek.infrastructure.auth;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.poliglotek.application.auth.exception.InvalidRequestException;
import com.poliglotek.application.auth.port.out.UserValidatorPort;
import com.poliglotek.domain.auth.exception.EmailNotVerifiedException;
import com.poliglotek.domain.auth.exception.InvalidTokenException;
import com.poliglotek.domain.auth.exception.TokenValidationException;
import com.poliglotek.infrastructure.auth.config.GoogleOAuthProperties;
import jakarta.inject.Singleton;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;

@Singleton
public class GoogleUserValidator implements UserValidatorPort {

    private final GoogleIdTokenVerifier verifier;
    private final GoogleOAuthProperties googleOAuthProperties;

    public GoogleUserValidator(GoogleOAuthProperties googleOAuthProperties1) {
        this.googleOAuthProperties = googleOAuthProperties1;
        this.verifier = initialiseVerifier();
    }

    public GoogleIdToken.Payload validate(String googleIdToken)
            throws InvalidTokenException, InvalidRequestException, EmailNotVerifiedException {
        try {
            GoogleIdToken token = verifier.verify(googleIdToken);
            validate(token);

            GoogleIdToken.Payload payload = token.getPayload();
            validate(payload);

            return payload;

        } catch (GeneralSecurityException | IOException e) {
            throw new TokenValidationException("Error during token verification");
        }
    }

    private GoogleIdTokenVerifier initialiseVerifier() {
        return new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), GsonFactory.getDefaultInstance())
                .setAudience(Collections.singletonList(googleOAuthProperties.getClientId()))
                .build();
    }

    private void validate(GoogleIdToken googleIdToken) {
        if (googleIdToken == null) throw new InvalidTokenException("Invalid Google ID token received");
    }

    private void validate(GoogleIdToken.Payload payload) {
        if (!payload.getEmailVerified())
            throw new EmailNotVerifiedException("Unverified email attempt: " + payload.getEmail());
    }
}
