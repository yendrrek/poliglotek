package com.transtopolish;

import com.transtopolish.googlesearch.model.SearchResponseWrapper;
import io.micronaut.http.MediaType;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.Header;
import io.micronaut.http.annotation.QueryValue;
import io.micronaut.http.client.annotation.Client;

import static io.micronaut.http.HttpHeaders.USER_AGENT;

@Client("https://www.googleapis.com/customsearch/v1")
@Header(name = USER_AGENT, value = "Micronaut HTTP Client")
public interface HttpClient {
    @Get(value = "?key={customSearchApiKey}&cx={searchEngineId}&q='{query}'&lr={documentLanguage}&count=10&safe=active&cr={countryCode}",
            produces = MediaType.APPLICATION_JSON, consumes = MediaType.APPLICATION_JSON)
    SearchResponseWrapper fetchSearchResults(@QueryValue String customSearchApiKey,
                                             @QueryValue String searchEngineId,
                                             @QueryValue String query,
                                             @QueryValue String documentLanguage,
                                             @QueryValue String countryCode);
}
