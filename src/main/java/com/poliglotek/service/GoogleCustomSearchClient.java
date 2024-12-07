package com.poliglotek.service;

import com.poliglotek.model.googlesearch.SearchResponseWrapper;
import io.micronaut.http.MediaType;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.Header;
import io.micronaut.http.annotation.QueryValue;
import io.micronaut.http.client.annotation.Client;

import static io.micronaut.http.HttpHeaders.USER_AGENT;

@Client("https://www.googleapis.com/customsearch/v1")
@Header(name = USER_AGENT, value = "Micronaut HTTP Client")
public interface GoogleCustomSearchClient {
    @Get(produces = MediaType.APPLICATION_JSON, consumes = MediaType.APPLICATION_JSON)
    SearchResponseWrapper fetchSearchResults(@QueryValue String key,
                                             @QueryValue String cx,
                                             @QueryValue String q,
                                             @QueryValue String lr,
                                             @QueryValue(defaultValue = "active") String safe,
                                             @QueryValue String cr,
                                             @QueryValue String excludeTerms);
    // todo: remove elements with cookie notification. test: "literatura baskijska"
}
