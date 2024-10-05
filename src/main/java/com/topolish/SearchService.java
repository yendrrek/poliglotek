package com.topolish;

import com.topolish.models.SearchResponseWrapper;
import io.micronaut.context.annotation.Context;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Context
public class SearchService {

    private final Logger log = LoggerFactory.getLogger(SearchService.class);
    private final HttpClient httpClient;
    private final ScrapService scrapService;

    public SearchService(HttpClient httpClient, ScrapService scrapService) {
        this.httpClient = httpClient;
        this.scrapService = scrapService;
    }

    public String fetchResult(String query) {
        SearchResponseWrapper results = httpClient.fetchSearchResults(query);
        String url = results.getItems().get(0).getLink();
        return scrapService.scrapWebPage(url);
    }
}
