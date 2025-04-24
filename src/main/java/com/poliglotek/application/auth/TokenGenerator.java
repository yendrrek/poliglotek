package com.poliglotek.application.auth;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;

public interface TokenGenerator {

    String generateToken(GoogleIdToken.Payload payload);
}
