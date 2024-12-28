package com.poliglotek.service;

import com.poliglotek.configuration.googlecustomsearch.ExcludedEcommerceConfig;
import com.poliglotek.model.googlesearch.SearchItem;
import com.poliglotek.model.googlesearch.SearchResponseWrapper;
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
    private final String excludedSocialMedia;
    private static final String LANG_PREFIX = "lang_";

    public GoogleSearchService(GoogleCustomSearchClient httpClient,
                               @Value("${googleCloud.customSearchApiKey}") String customSearchApiKey,
                               @Value("${googleCloud.customSearchEngineId}")  String customSearchEngineId,
                               @Value("${excludedSocialMedia}") String excludedSocialMedia,
                               ExcludedEcommerceConfig excludedEcommerceConfig) {
        this.httpClient = httpClient;
        this.customSearchApiKey = customSearchApiKey;
        this.customSearchEngineId = customSearchEngineId;
        this.excludedEcommerceConfig = excludedEcommerceConfig;
        this.excludedSocialMedia = excludedSocialMedia;
    }

    public List<String> fetchUrls(String translatedQuery, String langCode, String countryCode) {
        String documentLanguage = LANG_PREFIX + langCode;
        String excludeTerms = buildTermsExcludedFromSearch(langCode);
        SearchResponseWrapper results = httpClient.fetchSearchResults(
                customSearchApiKey,
                customSearchEngineId,
                translatedQuery,
                documentLanguage,
                null,
                countryCode,
                excludeTerms);
        List<SearchItem> searchItems = results.getItems();
        if (searchItems == null) {
            return null;
        }
        return searchItems.stream()
                .map(SearchItem::getLink)
                .limit(4)
                .toList();
    }

    private String buildTermsExcludedFromSearch(String langCode) {
        String eCommerceTerms = excludedEcommerceConfig.getLanguage().get(langCode.toLowerCase());
        return eCommerceTerms + ", " + excludedSocialMedia;
    }
}
