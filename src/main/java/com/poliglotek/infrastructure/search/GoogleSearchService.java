package com.poliglotek.infrastructure.search;

import com.poliglotek.application.translation.GoogleSearchPortOut;
import com.poliglotek.domain.translation.UrlFound;
import com.poliglotek.infrastructure.search.clientmodel.SearchItem;
import com.poliglotek.infrastructure.search.clientmodel.SearchResponseWrapper;
import jakarta.inject.Singleton;

import java.util.List;
import java.util.stream.Collectors;

// https://programmablesearchengine.google.com/controlpanel/overview?cx=8296b888e31bc4fb4
// Limit of 10,000 queries per day
// All Amazon domains are excluded through the front-end settings (url above)
@Singleton
public class GoogleSearchService implements GoogleSearchPortOut {

    private final GoogleSearchClient googleSearchClient;
    private final GoogleSearchProperties googleSearchProperties;
    private static final String LANG_PREFIX = "lang_";

    public GoogleSearchService(GoogleSearchClient googleSearchClient,
                               GoogleSearchProperties googleSearchProperties) {
        this.googleSearchClient = googleSearchClient;
        this.googleSearchProperties = googleSearchProperties;
    }

    @Override
    public List<UrlFound> fetchUrls(String translatedQuery, String langCode, String countryCode) {
        String documentLanguage = LANG_PREFIX + langCode;
        String excludeTerms = SearchTermsExcludedConstants.ECOMMERCE_TERMS.get(langCode.toLowerCase());
        String excludedFileTypes = buildExcludedFileTypes();
        SearchResponseWrapper results = googleSearchClient.fetchSearchResults(
                googleSearchProperties.getApiKey(),
                googleSearchProperties.getEngineId(),
                translatedQuery + excludedFileTypes,
                documentLanguage,
                null,
                countryCode,
                excludeTerms
        );
        List<SearchItem> searchItems = results.getItems();
        if (searchItems == null) {
            return null;
        }
        return searchItems.stream()
                .map(item -> new UrlFound(item.getLink()))
                .limit(googleSearchProperties.getLimit())
                .toList();
    }

    private String buildExcludedFileTypes() {
        String queryOperator = " -filetype:";
        return SearchTermsExcludedConstants.FILE_TYPES.stream()
                .map(type -> queryOperator + type)
                .collect(Collectors.joining());
    }
}
