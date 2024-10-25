package com.transtopolish.controller;

import com.transtopolish.service.TranslationService;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.QueryValue;
import io.micronaut.scheduling.TaskExecutors;
import io.micronaut.scheduling.annotation.ExecuteOn;

import java.util.List;

@Controller("/translate")
@ExecuteOn(TaskExecutors.BLOCKING)
public class TranslationController {

    private final TranslationService translationService;

    public TranslationController(TranslationService translationService) {
        this.translationService = translationService;
    }

    @Get()
    public List<String> fetchTranslatedPages(@QueryValue String query, @QueryValue String langCode, @QueryValue String countryCode) {
        return translationService.translatePages(query, langCode, countryCode);
    }
}
