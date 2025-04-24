package com.poliglotek.application.auth;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.poliglotek.application.auth.dto.LoginRequest;
import com.poliglotek.application.auth.dto.LoginResponse;
import com.poliglotek.application.auth.exceptions.InvalidRequestException;
import jakarta.inject.Singleton;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Singleton
public class AuthService {

    private static final Logger LOG = LoggerFactory.getLogger(AuthService.class);
    private final TokenGenerator tokenGenerator;
    private final UserValidator userValidator;

    public AuthService(TokenGenerator tokenGenerator,
                       UserValidator userValidator) {
        this.tokenGenerator = tokenGenerator;
        this.userValidator = userValidator;
    }

    public LoginResponse validateLoginProcess(LoginRequest request) {
        validateRequest(request);
        GoogleIdToken.Payload payload = userValidator.validate(request);
        String customJWT = tokenGenerator.generateToken(payload);
        LOG.info("User successfully logged in: {}", payload.getEmail());
        return new LoginResponse(customJWT);
    }

    private void validateRequest(LoginRequest request) {
        if (request == null || request.googleIdToken() == null || request.googleIdToken().isBlank())
            throw new InvalidRequestException("Google ID token is required");
    }
}
