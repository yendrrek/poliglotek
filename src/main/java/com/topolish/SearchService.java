package com.topolish;

import com.topolish.models.SearchResponseWrapper;
import io.micronaut.context.annotation.Context;
import io.micronaut.context.event.ApplicationEventListener;
import io.micronaut.context.event.StartupEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Context
public class SearchService /*implements ApplicationEventListener<StartupEvent>*/ {

    private final Logger log = LoggerFactory.getLogger(SearchService.class);
    private final HttpClient httpClient;

    public SearchService(HttpClient httpClient) {
        this.httpClient = httpClient;
    }

//    @Override
//    public void onApplicationEvent(StartupEvent event) {
//        fetchResults();
//    }

    public SearchResponseWrapper fetchResults() {
        SearchResponseWrapper results = httpClient.fetchSearchResults();
        return results;
    }
}
