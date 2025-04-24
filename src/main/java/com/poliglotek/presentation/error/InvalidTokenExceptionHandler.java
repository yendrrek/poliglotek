package com.poliglotek.presentation.error;

import com.poliglotek.application.auth.exceptions.InvalidTokenException;
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
@Requires(classes = { InvalidTokenException.class, ExceptionHandler.class })
public class InvalidTokenExceptionHandler implements ExceptionHandler<InvalidTokenException, HttpResponse<Object>> {

    private static final Logger LOG = LoggerFactory.getLogger(InvalidTokenExceptionHandler.class);

    @Override
    public HttpResponse<Object> handle(HttpRequest request, InvalidTokenException e) {
        LOG.error(e.getMessage(), e);
        return HttpResponse.unauthorized();
    }
}
