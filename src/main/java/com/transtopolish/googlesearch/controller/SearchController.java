package com.transtopolish.googlesearch.controller;

import com.transtopolish.googlesearch.service.SearchQueryTranslation;
import com.transtopolish.googlesearch.service.SearchService;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.QueryValue;
import io.micronaut.scheduling.TaskExecutors;
import io.micronaut.scheduling.annotation.ExecuteOn;

@Controller("/search")
@ExecuteOn(TaskExecutors.BLOCKING)
public class SearchController {

    private final SearchService searchService;
    private final SearchQueryTranslation searchQueryTranslation;

    public SearchController(SearchService searchService, SearchQueryTranslation searchQueryTranslation) {
        this.searchService = searchService;
        this.searchQueryTranslation = searchQueryTranslation;
    }

    @Get()
    public String searchInGoogle(@QueryValue String query, @QueryValue String targetLanguage) {
        String translatedQuery = searchQueryTranslation.translateSearchQuery(query, targetLanguage);
        return searchService.fetchPageBody(translatedQuery);
    }
}
