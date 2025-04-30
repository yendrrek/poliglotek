package com.poliglotek.interfaces.translation.error;

import com.poliglotek.domain.translation.exception.AllPagesCharacterLimitExceededException;
import com.poliglotek.interfaces.translation.dto.TranslationResponse;
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
@Requires(classes = { AllPagesCharacterLimitExceededExceptionHandler.class, ExceptionHandler.class })
public class AllPagesCharacterLimitExceededExceptionHandler implements
        ExceptionHandler<AllPagesCharacterLimitExceededException, HttpResponse<TranslationResponse>> {

    private static final Logger LOG = LoggerFactory.getLogger(AllPagesCharacterLimitExceededExceptionHandler.class);

    @Override
    public HttpResponse<TranslationResponse> handle(HttpRequest request,
                                                    AllPagesCharacterLimitExceededException e) {
        LOG.error(e.getMessage());
        TranslationResponse response = new TranslationResponse(
                false,
                e.getMessage(),
                null,
                null
        );
        return HttpResponse.badRequest(response);
    }
}
