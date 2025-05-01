package com.poliglotek.infrastructure.authentication;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.poliglotek.application.authentication.InvalidRequestException;
import com.poliglotek.application.authentication.UserValidatorPortOut;
import com.poliglotek.domain.authentication.EmailNotVerifiedException;
import com.poliglotek.domain.authentication.InvalidTokenException;
import com.poliglotek.domain.authentication.TokenValidationException;
import jakarta.inject.Singleton;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;

@Singleton
public class GoogleUserValidator implements UserValidatorPortOut {

    private final GoogleOAuthProperties googleOAuthProperties;
    private final GoogleIdTokenVerifier verifier;

    public GoogleUserValidator(GoogleOAuthProperties googleOAuthProperties) {
        this.googleOAuthProperties = googleOAuthProperties;
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
