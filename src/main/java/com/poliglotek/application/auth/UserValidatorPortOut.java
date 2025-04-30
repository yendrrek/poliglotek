package com.poliglotek.application.auth;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.poliglotek.domain.auth.EmailNotVerifiedException;
import com.poliglotek.domain.auth.InvalidTokenException;

public interface UserValidatorPortOut {

    GoogleIdToken.Payload validate(String googleIdToken)
            throws InvalidTokenException, InvalidRequestException, EmailNotVerifiedException;
}
