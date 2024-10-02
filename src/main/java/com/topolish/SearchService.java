package com.topolish;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.topolish.models.SearchResponseWrapper;
import io.micronaut.context.annotation.Context;
import io.micronaut.context.event.ApplicationEventListener;
import io.micronaut.context.event.StartupEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Context
public class SearchService implements ApplicationEventListener<StartupEvent> {

    private final HttpClient httpClient;
    private final Logger log = LoggerFactory.getLogger(SearchService.class);

    public SearchService(HttpClient httpClient) {
        this.httpClient = httpClient;
    }

    @Override
    public void onApplicationEvent(StartupEvent event) {
        fetchResults();
    }

    public SearchResponseWrapper fetchResults() {
        SearchResponseWrapper results = httpClient.fetchSearchResults();
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            String jsonString = objectMapper.writeValueAsString(results);
            log.info("Result: {}", jsonString);
            return results;
        } catch (JsonProcessingException e) {
            log.error("Error printing json string", e);
            return null;
        }
    }
}
