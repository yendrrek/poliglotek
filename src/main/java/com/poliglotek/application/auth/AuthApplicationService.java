package com.poliglotek.application.auth;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.poliglotek.interfaces.auth.LoginRequest;
import com.poliglotek.interfaces.auth.LoginResponse;
import jakarta.inject.Singleton;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Singleton
public class AuthApplicationService {

    private static final Logger LOG = LoggerFactory.getLogger(AuthApplicationService.class);
    private final TokenGeneratorPortOut tokenGeneratorPortOut;
    private final UserValidatorPortOut userValidatorPortOut;

    public AuthApplicationService(TokenGeneratorPortOut tokenGeneratorPort,
                                  UserValidatorPortOut userValidatorPortOut) {
        this.tokenGeneratorPortOut = tokenGeneratorPort;
        this.userValidatorPortOut = userValidatorPortOut;
    }

    public LoginResponse login(LoginRequest request) {
        validateRequest(request);
        String customJWT = authenticate(request.googleIdToken());
        return new LoginResponse(customJWT);
    }

    private void validateRequest(LoginRequest request) {
        if (request == null || request.googleIdToken() == null || request.googleIdToken().isBlank())
            throw new InvalidRequestException("Google ID token is required");
    }

    private String authenticate(String googleIdToken) {
        GoogleIdToken.Payload payload = userValidatorPortOut.validate(googleIdToken);
        String customJWT = tokenGeneratorPortOut.generateToken(payload);
        LOG.info("User successfully logged in: {}", payload.getEmail());
        return customJWT;
    }
}
