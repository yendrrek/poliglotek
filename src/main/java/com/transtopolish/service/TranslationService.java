package com.transtopolish.service;

import com.google.cloud.translate.v3.LocationName;
import com.google.cloud.translate.v3.TranslateTextRequest;
import com.google.cloud.translate.v3.TranslateTextResponse;
import com.google.cloud.translate.v3.TranslationServiceClient;
import com.transtopolish.model.googletranslate.TranslatedPage;
import com.transtopolish.model.jsoup.ScrapedPage;
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
    private static final String BASE_CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    private static final int ID_LENGTH = 10;

    public TranslationService(GoogleSearchService googleSearchService,
                              ScrapService scrapService,
                              @Value("${googleCloud.projectId}") String projectId) {
        this.googlesearchService = googleSearchService;
        this.scrapService = scrapService;
        this.projectId = projectId;
    }

    public List<TranslatedPage> getTranslatedPages(String query, String targetLang, String countryCode) {
        String translatedQuery = getTranslation(query, targetLang, projectId);
        List<String> urls = googlesearchService.fetchUrls(translatedQuery, targetLang, countryCode);
        List<ScrapedPage> scrapedPages = scrapService.scrapWebPages(urls);
        return scrapedPages.stream()
                .map(page -> new TranslatedPage(
                        createTranslatedPageId(),
                        getTranslation(page.body(), POLISH, projectId),
                        page.url())
                )
                .toList();
    }

    private String getTranslation(String text, String targetLang, String projectId) {
        TranslateTextResponse response = translatePage(text, targetLang, projectId);
        if (response != null) {
            return buildTranslation(response);
        }
        log.error("Response from Google Custom Search must not be null");
        return null;
    }

    private TranslateTextResponse translatePage(String text, String targetLang, String projectId) {
        log.info("Number of characters to translate: {}", text.length());
        try (TranslationServiceClient client = TranslationServiceClient.create()) {
            LocationName parent = LocationName.of(projectId, GLOBAL_LOCATION);
            TranslateTextRequest request = TranslateTextRequest.newBuilder()
                    .setParent(parent.toString())
                    .setMimeType(TEXT_HTML)
                    .setTargetLanguageCode(targetLang)
                    .addContents(text)
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
        SecureRandom secureRandom = new SecureRandom();
        StringBuilder id = new StringBuilder(ID_LENGTH);
        for (int i = 0; i < ID_LENGTH; i++) {
            int index = secureRandom.nextInt(BASE_CHARACTERS.length());
            id.append(BASE_CHARACTERS.charAt(index));
        }
        return id.toString();
    }
}
