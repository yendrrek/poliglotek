package com.poliglotek.interfaces.translation;

import com.poliglotek.application.translation.TranslationApplicationService;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.QueryValue;
import io.micronaut.scheduling.TaskExecutors;
import io.micronaut.scheduling.annotation.ExecuteOn;
import io.micronaut.security.annotation.Secured;
import io.micronaut.security.rules.SecurityRule;

@Controller("/api")
@ExecuteOn(TaskExecutors.BLOCKING)
public class TranslationController {

    private final TranslationApplicationService translationService;

    public TranslationController(TranslationApplicationService translationService) {
        this.translationService = translationService;
    }

    @Get("/translate")
    @Secured(SecurityRule.IS_AUTHENTICATED)
    public HttpResponse<?> translate(@QueryValue String query,
                                     @QueryValue String langCode,
                                     @QueryValue String countryCode) {
        TranslationResponse response = translationService.getTranslatedPages(query, langCode, countryCode);
        return HttpResponse.ok(response);
    }
}
