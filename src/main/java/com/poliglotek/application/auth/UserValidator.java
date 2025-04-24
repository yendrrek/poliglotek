package com.poliglotek.application.auth;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.poliglotek.application.auth.dto.LoginRequest;
import com.poliglotek.application.auth.exceptions.EmailNotVerifiedException;
import com.poliglotek.application.auth.exceptions.InvalidRequestException;
import com.poliglotek.application.auth.exceptions.InvalidTokenException;

public interface UserValidator {

    GoogleIdToken.Payload validate(LoginRequest request)
            throws InvalidTokenException, InvalidRequestException, EmailNotVerifiedException;
}
