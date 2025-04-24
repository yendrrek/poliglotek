package com.poliglotek.presentation.error;

import com.poliglotek.application.auth.exceptions.TokenValidationException;
import io.micronaut.context.annotation.Requires;
import io.micronaut.http.HttpRequest;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.Produces;
import io.micronaut.http.server.exceptions.ExceptionHandler;
import jakarta.inject.Singleton;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Produces
@Singleton
@Requires(classes = { TokenValidationException.class, ExceptionHandler.class })
public class TokenValidationExceptionHandler implements
        ExceptionHandler<TokenValidationException, HttpResponse<Object>> {

    private static final Logger LOG = LoggerFactory.getLogger(TokenValidationExceptionHandler.class);


    @Override
    public HttpResponse<Object> handle(HttpRequest request, TokenValidationException e) {
        LOG.error(e.getMessage(), e);
        return HttpResponse.serverError(e.getMessage());
    }
}
