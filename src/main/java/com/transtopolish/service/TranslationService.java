package com.transtopolish.service;

import com.google.cloud.translate.Translate;
import com.google.cloud.translate.TranslateOptions;
import com.google.cloud.translate.Translation;
import com.google.cloud.translate.v3.LocationName;
import com.google.cloud.translate.v3.TranslateTextRequest;
import com.google.cloud.translate.v3.TranslateTextResponse;
import com.google.cloud.translate.v3.TranslationServiceClient;
import com.transtopolish.config.GoogleCloudConfig;
import jakarta.inject.Singleton;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;

@Singleton
public class TranslationService {

    private final Logger log = LoggerFactory.getLogger(TranslationService.class);
    private final GoogleCloudConfig googleCloudConfig;
    private static final String POLISH = "pl";
    private static final String GLOBAL_LOCATION = "global";
    private static final String TEXT_HTML = "text/html";

    public TranslationService(GoogleCloudConfig googleCloudConfig) {
        this.googleCloudConfig = googleCloudConfig;
    }

    public String translateQuery(String query, String targetLang) {
        Translate translateWithBasicEdition = TranslateOptions.getDefaultInstance().getService();
        Translation translation = translateWithBasicEdition.translate(query, Translate.TranslateOption.targetLanguage(targetLang));
        return translation.getTranslatedText();
    }

    public String translatePage(String html) {
        String projectId = googleCloudConfig.getProjectId();
        try (TranslationServiceClient client = TranslationServiceClient.create()) {
            LocationName parent = LocationName.of(projectId, GLOBAL_LOCATION);
            TranslateTextRequest request = TranslateTextRequest.newBuilder()
                    .setParent(parent.toString())
                    .setMimeType(TEXT_HTML)
                    .setTargetLanguageCode(TranslationService.POLISH)
                    .addContents(html)
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
