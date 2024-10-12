package com.transtopolish.googlesearch.service;

import com.transtopolish.HttpClient;
import com.transtopolish.googlesearch.config.GoogleCloudConfig;
import com.transtopolish.googlesearch.model.SearchResponseWrapper;
import com.transtopolish.scrap.service.ScrapService;
import jakarta.inject.Singleton;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Singleton
public class SearchService {

    private final Logger log = LoggerFactory.getLogger(SearchService.class);
    private final HttpClient httpClient;
    private final ScrapService scrapService;
    private final GoogleCloudConfig googleCloudConfig;
    private static final String LANG_PREFIX = "lang_";

    public SearchService(HttpClient httpClient,
                         ScrapService scrapService,
                         GoogleCloudConfig googleCloudConfig) {
        this.httpClient = httpClient;
        this.scrapService = scrapService;
        this.googleCloudConfig = googleCloudConfig;
    }

    public String fetchPageBody(String translatedQuery, String langCode, String countryCode) {
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
        String url = results.getItems().getFirst().getLink();
        return scrapService.scrapWebPage(url);
    }
}
