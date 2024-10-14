package com.transtopolish.service;

import com.transtopolish.config.GoogleCloudConfig;
import com.transtopolish.model.googlesearch.SearchResponseWrapper;
import jakarta.inject.Singleton;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Singleton
public class GoogleSearchService {

    private final Logger log = LoggerFactory.getLogger(GoogleSearchService.class);
    private final HttpClient httpClient;
    private final GoogleCloudConfig googleCloudConfig;
    private static final String LANG_PREFIX = "lang_";

    public GoogleSearchService(HttpClient httpClient, GoogleCloudConfig googleCloudConfig) {
        this.httpClient = httpClient;
        this.googleCloudConfig = googleCloudConfig;
    }

    public String fetchPageUrl(String translatedQuery, String langCode, String countryCode) {
        String customSearchApiKey = googleCloudConfig.getCustomSearchApiKey();
        String searchEngineId = googleCloudConfig.getCustomSearchEngineId();
        String documentLanguage = LANG_PREFIX + langCode;
        SearchResponseWrapper results = httpClient.fetchSearchResults(
                customSearchApiKey,
                searchEngineId,
                translatedQuery,
                documentLanguage,
                null,
                countryCode);
        return results.getItems().getFirst().getLink();
    }
}
