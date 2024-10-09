package com.transtopolish;

import com.transtopolish.config.GoogleCloudConfig;
import com.transtopolish.models.SearchResponseWrapper;
import jakarta.inject.Singleton;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Singleton
public class SearchService {

    private final Logger log = LoggerFactory.getLogger(SearchService.class);
    private final HttpClient httpClient;
    private final ScrapService scrapService;
    private final GoogleCloudConfig googleCloudConfig;

    public SearchService(HttpClient httpClient,
                         ScrapService scrapService,
                         GoogleCloudConfig googleCloudConfig) {
        this.httpClient = httpClient;
        this.scrapService = scrapService;
        this.googleCloudConfig = googleCloudConfig;
    }

    public String fetchPageBody(String query) {
        String customSearchApiKey = googleCloudConfig.getCustomSearchApiKey();
        String searchEngineId = googleCloudConfig.getCustomSearchEngineId();
        SearchResponseWrapper results = httpClient.fetchSearchResults(customSearchApiKey, searchEngineId, query);
        String url = results.getItems().getFirst().getLink();
        return scrapService.scrapWebPage(url);
    }
}
