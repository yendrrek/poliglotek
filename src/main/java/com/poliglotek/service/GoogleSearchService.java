package com.poliglotek.service;

import com.poliglotek.config.ExcludedFromGoogleCustomSearch;
import com.poliglotek.model.googlesearch.SearchItem;
import com.poliglotek.model.googlesearch.SearchResponseWrapper;
import io.micronaut.context.annotation.Value;
import jakarta.inject.Singleton;

import java.util.List;
import java.util.stream.Collectors;

// https://programmablesearchengine.google.com/controlpanel/overview?cx=8296b888e31bc4fb4
// Limit of 10,000 queries per day
// All Amazon domains are excluded through the front-end settings (link above)
@Singleton
public class GoogleSearchService {

    private final GoogleCustomSearchClient httpClient;
    private final String customSearchApiKey;
    private final String customSearchEngineId;
    private static final String LANG_PREFIX = "lang_";

    public GoogleSearchService(GoogleCustomSearchClient httpClient,
                               @Value("${googleCloud.customSearchApiKey}") String customSearchApiKey,
                               @Value("${googleCloud.customSearchEngineId}")  String customSearchEngineId) {
        this.httpClient = httpClient;
        this.customSearchApiKey = customSearchApiKey;
        this.customSearchEngineId = customSearchEngineId;
    }

    public List<String> fetchUrls(String translatedQuery, String langCode, String countryCode) {
        String documentLanguage = LANG_PREFIX + langCode;
        String excludeTerms = ExcludedFromGoogleCustomSearch.ECOMMERCE_TERMS.get(langCode.toLowerCase());
        String excludedFileTypes = buildExcludedFileTypes();
        SearchResponseWrapper results = httpClient.fetchSearchResults(
                customSearchApiKey,
                customSearchEngineId,
                translatedQuery + excludedFileTypes,
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
                .limit(1)
                .toList();
    }

    private String buildExcludedFileTypes() {
        String queryOperator = " -filetype:";
        return ExcludedFromGoogleCustomSearch.FILE_TYPES.stream()
                .map(type -> queryOperator + type)
                .collect(Collectors.joining());
    }
}
