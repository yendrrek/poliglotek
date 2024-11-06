package com.transtopolish.service;

import com.google.cloud.translate.v3.LocationName;
import com.google.cloud.translate.v3.TranslateTextRequest;
import com.google.cloud.translate.v3.TranslateTextResponse;
import com.google.cloud.translate.v3.TranslationServiceClient;
import com.transtopolish.model.TranslatedPage;
import io.micronaut.context.annotation.Value;
import jakarta.inject.Singleton;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.security.SecureRandom;
import java.util.List;

@Singleton
public class TranslationService {

    private final Logger log = LoggerFactory.getLogger(TranslationService.class);
    private final GoogleSearchService googlesearchService;
    private final ScrapService scrapService;
    private final String projectId;
    private static final String POLISH = "pl";
    private static final String GLOBAL_LOCATION = "global";
    private static final String TEXT_HTML = "text/html";

    public TranslationService(GoogleSearchService googleSearchService,
                              ScrapService scrapService,
                              @Value("${googleCloud.projectId}") String projectId) {
        this.googlesearchService = googleSearchService;
        this.scrapService = scrapService;
        this.projectId = projectId;
    }

    public List<TranslatedPage> getTranslatedPages(String query, String targetLang, String countryCode) {
        String translatedQuery = queryTranslationService.translateQuery(query, targetLang);
        List<String> urls = googlesearchService.fetchUrls(translatedQuery, targetLang, countryCode);
        List<String> pageBodies = scrapService.scrapWebPages(urls);
        return pageBodies.stream()
                .map(body -> new TranslatedPage(createTranslatedPageId(), getTranslatedPage(body, projectId)))
                .toList();
    }

    private String getTranslatedPage(String pageBody, String projectId) {
        TranslateTextResponse response = translatePage(pageBody, projectId);
        if (response != null) {
            return buildTranslation(response);
        }
        throw new IllegalStateException("Response from Google Custom Search must not be null");
    }

    private TranslateTextResponse translatePage(String pageBody, String projectId) {
        try (TranslationServiceClient client = TranslationServiceClient.create()) {
            LocationName parent = LocationName.of(projectId, GLOBAL_LOCATION);
            TranslateTextRequest request = TranslateTextRequest.newBuilder()
                    .setParent(parent.toString())
                    .setMimeType(TEXT_HTML)
                    .setTargetLanguageCode(POLISH)
                    .addContents(pageBody)
                    .build();
            return client.translateText(request);
        } catch (IOException e) {
            log.error("Error translating html page", e);
            return null;
        }
    }

    private String buildTranslation(TranslateTextResponse response) {
        StringBuilder translatedHTML = new StringBuilder();
        for (com.google.cloud.translate.v3.Translation translation : response.getTranslationsList()) {
            translatedHTML.append(translation.getTranslatedText());
        }
        return translatedHTML.toString();
    }

    private String createTranslatedPageId() {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        int idLength = 10;
        SecureRandom secureRandom = new SecureRandom();
        StringBuilder id = new StringBuilder(idLength);
        for (int i = 0; i < idLength; i++) {
            int index = secureRandom.nextInt(characters.length());
            id.append(characters.charAt(index));
        }
        return id.toString();
    }
}
