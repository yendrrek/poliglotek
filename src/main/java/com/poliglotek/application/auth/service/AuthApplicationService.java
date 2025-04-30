package com.poliglotek.application.auth.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.poliglotek.application.auth.exception.InvalidRequestException;
import com.poliglotek.application.auth.port.out.TokenGeneratorPort;
import com.poliglotek.application.auth.port.out.UserValidatorPort;
import com.poliglotek.interfaces.auth.dto.LoginRequest;
import com.poliglotek.interfaces.auth.dto.LoginResponse;
import jakarta.inject.Singleton;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Singleton
public class AuthApplicationService {

    private static final Logger LOG = LoggerFactory.getLogger(AuthApplicationService.class);
    private final TokenGeneratorPort tokenGeneratorPort;
    private final UserValidatorPort userValidatorPort;

    public AuthApplicationService(TokenGeneratorPort tokenGeneratorPort,
                                  UserValidatorPort userValidatorPort) {
        this.tokenGeneratorPort = tokenGeneratorPort;
        this.userValidatorPort = userValidatorPort;
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
        GoogleIdToken.Payload payload = userValidatorPort.validate(googleIdToken);
        String customJWT = tokenGeneratorPort.generateToken(payload);
        LOG.info("User successfully logged in: {}", payload.getEmail());
        return customJWT;
    }
}
