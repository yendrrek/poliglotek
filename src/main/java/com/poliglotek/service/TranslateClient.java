package com.poliglotek.service;

import com.google.cloud.translate.v3.*;
import io.micronaut.context.annotation.Value;
import jakarta.inject.Singleton;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

import static com.poliglotek.config.TranslationConfig.GLOBAL_LOCATION;
import static com.poliglotek.config.TranslationConfig.TEXT_HTML;

@Singleton
public class TranslateClient {

    private static final Logger LOG = LoggerFactory.getLogger(TranslateClient.class);
    private final String projectId;

    public TranslateClient(@Value("${google-cloud.project-id}") String projectId) {
        this.projectId = projectId;
    }

    public String translateQuery(String text, String targetLang) {
        TranslateTextResponse response = callTranslateApi(text, targetLang);
        if (response == null) {
            LOG.error("Response from Google Custom Search must not be null");
            return null;
        }
        return buildTranslation(response);
    }

    private TranslateTextResponse callTranslateApi(String text, String targetLang) {
        try (TranslationServiceClient client = TranslationServiceClient.create()) {
            LocationName parent = LocationName.of(projectId, GLOBAL_LOCATION);
            TranslateTextRequest request = TranslateTextRequest.newBuilder()
                    .setParent(parent.toString())
                    .setMimeType(TEXT_HTML)
                    .setTargetLanguageCode(targetLang)
                    .addContents(text)
                    .build();
            return client.translateText(request);
        } catch (Exception e) {
            LOG.error("Error translating web page", e);
            return null;
        }
    }

    private String buildTranslation(TranslateTextResponse response) {
        StringBuilder translatedHTML = new StringBuilder();
        List<Translation> translationList = response.getTranslationsList();
        for (com.google.cloud.translate.v3.Translation translation : translationList) {
            translatedHTML.append(translation.getTranslatedText());
        }
        return translatedHTML.toString();
    }
}
