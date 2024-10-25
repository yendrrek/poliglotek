package com.transtopolish.service;

import com.google.cloud.translate.v3.LocationName;
import com.google.cloud.translate.v3.TranslateTextRequest;
import com.google.cloud.translate.v3.TranslateTextResponse;
import com.google.cloud.translate.v3.TranslationServiceClient;
import com.transtopolish.config.GoogleCloudConfig;
import jakarta.inject.Singleton;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.List;

@Singleton
public class TranslationService {

    private final Logger log = LoggerFactory.getLogger(TranslationService.class);
    private final GoogleCloudConfig googleCloudConfig;
    private final GoogleSearchService googlesearchService;
    private final ScrapService scrapService;
    private final QueryTranslationService queryTranslationService;
    private static final String POLISH = "pl";
    private static final String GLOBAL_LOCATION = "global";
    private static final String TEXT_HTML = "text/html";

    public TranslationService(GoogleSearchService googleSearchService,
                              GoogleCloudConfig googleCloudConfig, ScrapService scrapService, QueryTranslationService queryTranslationService) {
        this.googleCloudConfig = googleCloudConfig;
        this.googlesearchService = googleSearchService;
        this.scrapService = scrapService;
        this.queryTranslationService = queryTranslationService;
    }

    public List<String> translatePages(String query, String targetLang, String countryCode) {
        String translatedQuery = queryTranslationService.translateQuery(query, targetLang);
        List<String> urls = googlesearchService.fetchUrls(translatedQuery, targetLang, countryCode);
        List<String> pageBodies = scrapService.scrapWebPages(urls);
        String projectId = googleCloudConfig.getProjectId();
        return pageBodies.stream()
                .map(pageBody -> translatePage(pageBody, projectId))
                .toList();
    }

    private String translatePage(String pageBody, String projectId) {
        try (TranslationServiceClient client = TranslationServiceClient.create()) {
            LocationName parent = LocationName.of(projectId, GLOBAL_LOCATION);
            TranslateTextRequest request = TranslateTextRequest.newBuilder()
                    .setParent(parent.toString())
                    .setMimeType(TEXT_HTML)
                    .setTargetLanguageCode(TranslationService.POLISH)
                    .addContents(pageBody)
                    .build();
            TranslateTextResponse response = client.translateText(request);
            StringBuilder translatedHTML = new StringBuilder();
            for (com.google.cloud.translate.v3.Translation translation : response.getTranslationsList()) {
                translatedHTML.append(translation.getTranslatedText());
            }
            return translatedHTML.toString();
        } catch (IOException e) {
            log.error("Error translatin html page", e);
            return null;
        }
    }
}
