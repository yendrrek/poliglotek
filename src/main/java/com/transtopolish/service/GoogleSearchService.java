package com.transtopolish.service;

import com.transtopolish.configuration.googlecustomsearch.ExcludedEcommerceConfig;
import com.transtopolish.model.googlesearch.SearchItem;
import com.transtopolish.model.googlesearch.SearchResponseWrapper;
import io.micronaut.context.annotation.Value;
import jakarta.inject.Singleton;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@Singleton
public class GoogleSearchService {

    private final Logger log = LoggerFactory.getLogger(GoogleSearchService.class);
    private final GoogleCustomSearchClient httpClient;
    private final String customSearchApiKey;
    private final String customSearchEngineId;
    private final ExcludedEcommerceConfig excludedEcommerceConfig;
    private static final String LANG_PREFIX = "lang_";

    public GoogleSearchService(GoogleCustomSearchClient httpClient,
                               @Value("${googleCloud.customSearchApiKey}") String customSearchApiKey,
                               @Value("${googleCloud.customSearchEngineId}")  String customSearchEngineId,
                               ExcludedEcommerceConfig excludedEcommerceConfig) {
        this.httpClient = httpClient;
        this.customSearchApiKey = customSearchApiKey;
        this.customSearchEngineId = customSearchEngineId;
        this.excludedEcommerceConfig = excludedEcommerceConfig;
    }

    public List<String> fetchUrls(String translatedQuery, String langCode, String countryCode) {
        log.info("Fetching URLs for query '{}'. Target language is {}. Page location: {}", translatedQuery, langCode, countryCode);
        String documentLanguage = LANG_PREFIX + langCode;
        SearchResponseWrapper results = httpClient.fetchSearchResults(
                customSearchApiKey,
                customSearchEngineId,
                translatedQuery,
                documentLanguage,
                null,
                countryCode,
                excludedEcommerceConfig.getLanguage().get(langCode));
        return results.getItems().stream()
                .map(SearchItem::getLink)
                .toList().subList(0, 2); // todo: get only two urls for testing to not abuse google search api
    }
}
