package com.poliglotek.application.auth;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;

public interface TokenGeneratorPortOut {

    String generateToken(GoogleIdToken.Payload payload);
}
