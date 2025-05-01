package com.poliglotek.application.authentication;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.poliglotek.domain.authentication.EmailNotVerifiedException;
import com.poliglotek.domain.authentication.InvalidTokenException;

public interface UserValidatorPortOut {

    GoogleIdToken.Payload validate(String googleIdToken)
            throws InvalidTokenException, InvalidRequestException, EmailNotVerifiedException;
}
