package com.transtopolish.controller;

import com.transtopolish.model.googletranslate.TranslatedPage;
import com.transtopolish.service.TranslationService;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.QueryValue;
import io.micronaut.scheduling.TaskExecutors;
import io.micronaut.scheduling.annotation.ExecuteOn;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@Controller("/translate")
@ExecuteOn(TaskExecutors.BLOCKING)
public class TranslationController {

    private final Logger log = LoggerFactory.getLogger(TranslationController.class);
    private final TranslationService translationService;
    private static final String logLine = "Query: {}. Target language: {}. Page location: {}";

    public TranslationController(TranslationService translationService) {
        this.translationService = translationService;
    }

    @Get()
    public List<TranslatedPage> getTranslatedPages(@QueryValue String query, @QueryValue String langCode, @QueryValue String countryCode) {
        log.info("User selected >> " + logLine, query, langCode, countryCode);
        List<TranslatedPage> translatedPages = translationService.getTranslatedPages(query, langCode, countryCode);
        if (translatedPages == null || translatedPages.isEmpty()) {
            log.info("No results for combination >> " + logLine, query, langCode, countryCode);
            return List.of(new TranslatedPage(null, null, null));
        }
        return translatedPages;
    }
}
