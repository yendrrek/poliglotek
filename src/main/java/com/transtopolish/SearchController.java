package com.transtopolish;

import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.QueryValue;
import io.micronaut.scheduling.TaskExecutors;
import io.micronaut.scheduling.annotation.ExecuteOn;

@Controller("/search")
@ExecuteOn(TaskExecutors.BLOCKING)
public class SearchController {

    private final SearchService searchService;

    public SearchController(SearchService searchService) {
        this.searchService = searchService;
    }

    @Get("/query")
    public String searchInGoogle(@QueryValue String value) {
        return searchService.fetchResult(value);
    }
}
