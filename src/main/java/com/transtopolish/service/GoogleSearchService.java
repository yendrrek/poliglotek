package com.transtopolish.service;

import com.transtopolish.config.GoogleCloudConfig;
import com.transtopolish.model.googlesearch.SearchItem;
import com.transtopolish.model.googlesearch.SearchResponseWrapper;
import jakarta.inject.Singleton;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@Singleton
public class GoogleSearchService {

    private final Logger log = LoggerFactory.getLogger(GoogleSearchService.class);
    private final GoogleCustomSearchClient httpClient;
    private final GoogleCloudConfig googleCloudConfig;
    private static final String LANG_PREFIX = "lang_";

    public GoogleSearchService(GoogleCustomSearchClient httpClient, GoogleCloudConfig googleCloudConfig) {
        this.httpClient = httpClient;
        this.googleCloudConfig = googleCloudConfig;
    }

    public List<String> fetchUrls(String translatedQuery, String langCode, String countryCode) {
        String customSearchApiKey = googleCloudConfig.getCustomSearchApiKey();
        String searchEngineId = googleCloudConfig.getCustomSearchEngineId();
        String documentLanguage = LANG_PREFIX + langCode;
        SearchResponseWrapper results = httpClient.fetchSearchResults(
                customSearchApiKey,
                searchEngineId,
                translatedQuery,
                documentLanguage,
                null,
                countryCode,
                null);
        return results.getItems().stream()
                .map(SearchItem::getLink)
                .toList().subList(0, 2); // todo: get only two urls for testing to not abuse google search api
    }
}
