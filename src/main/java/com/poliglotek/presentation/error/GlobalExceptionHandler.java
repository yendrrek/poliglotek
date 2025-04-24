package com.poliglotek.presentation.error;

import com.poliglotek.application.auth.exceptions.GlobalException;
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
@Requires(classes = { GlobalException.class, Exception.class })
public class GlobalExceptionHandler implements ExceptionHandler<Exception, HttpResponse<Object>> {

    private static final Logger LOG = LoggerFactory.getLogger(GlobalExceptionHandler.class);
    private static final String LOGIN_ERROR_MESSAGE = "Error during login process";

    @Override
    public HttpResponse<Object> handle(HttpRequest request, Exception e) {
        LOG.error(LOGIN_ERROR_MESSAGE, e);
        return HttpResponse.serverError(LOGIN_ERROR_MESSAGE);
    }
}
