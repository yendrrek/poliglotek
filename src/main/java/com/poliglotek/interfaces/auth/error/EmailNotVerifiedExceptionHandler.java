package com.poliglotek.interfaces.auth.error;

import com.poliglotek.domain.auth.exception.EmailNotVerifiedException;
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
@Requires(classes = { EmailNotVerifiedExceptionHandler.class, ExceptionHandler.class })
public class EmailNotVerifiedExceptionHandler implements
        ExceptionHandler<EmailNotVerifiedException, HttpResponse<Object>> {

    private static final Logger LOG = LoggerFactory.getLogger(EmailNotVerifiedExceptionHandler.class);

    @Override
    public HttpResponse<Object> handle(HttpRequest request, EmailNotVerifiedException e) {
        LOG.error(e.getMessage(), e);
        return HttpResponse.unauthorized();
    }
}
