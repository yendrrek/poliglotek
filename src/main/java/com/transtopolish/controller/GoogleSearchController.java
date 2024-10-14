package com.transtopolish.controller;

import com.transtopolish.service.GoogleSearchService;
import com.transtopolish.service.ScrapService;
import com.transtopolish.service.TranslationService;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.QueryValue;
import io.micronaut.scheduling.TaskExecutors;
import io.micronaut.scheduling.annotation.ExecuteOn;

@Controller("/search")
@ExecuteOn(TaskExecutors.BLOCKING)
public class GoogleSearchController {

    private final GoogleSearchService googlesearchService;
    private final TranslationService translationService;
    private final ScrapService scrapService;

    public GoogleSearchController(GoogleSearchService googleSearchService,
                                  TranslationService translationService,
                                  ScrapService scrapService) {
        this.googlesearchService = googleSearchService;
        this.translationService = translationService;
        this.scrapService = scrapService;
    }

    @Get()
    public String searchInGoogle(@QueryValue String query, @QueryValue String langCode, @QueryValue String countryCode) {
        String translatedQuery = translationService.translateQuery(query, langCode);
        String url = googlesearchService.fetchPageUrl(translatedQuery, langCode, countryCode);
        String pageBody = scrapService.scrapWebPage(url);
        return translationService.translatePage(pageBody);
    }
}
