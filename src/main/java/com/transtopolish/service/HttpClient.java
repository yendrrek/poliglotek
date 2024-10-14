package com.transtopolish.service;

import com.transtopolish.model.googlesearch.SearchResponseWrapper;
import io.micronaut.http.MediaType;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.Header;
import io.micronaut.http.annotation.QueryValue;
import io.micronaut.http.client.annotation.Client;

import static io.micronaut.http.HttpHeaders.USER_AGENT;

@Client("https://www.googleapis.com/customsearch/v1")
@Header(name = USER_AGENT, value = "Micronaut HTTP Client")
public interface HttpClient {
    @Get(produces = MediaType.APPLICATION_JSON, consumes = MediaType.APPLICATION_JSON)
    SearchResponseWrapper fetchSearchResults(@QueryValue String key,
                                             @QueryValue String cx,
                                             @QueryValue String q,
                                             @QueryValue String lr,
                                             @QueryValue(defaultValue = "active") String safe,
                                             @QueryValue String cr);
}
