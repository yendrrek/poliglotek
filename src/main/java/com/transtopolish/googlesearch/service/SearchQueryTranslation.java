package com.transtopolish.googlesearch.service;

import com.google.cloud.translate.Translate;
import com.google.cloud.translate.TranslateOptions;
import com.google.cloud.translate.Translation;
import jakarta.inject.Singleton;

@Singleton
public class SearchQueryTranslation {
    public String translateSearchQuery(String query, String targetLang) {
        Translate translateWithBasicEdition = TranslateOptions.getDefaultInstance().getService();
        Translation translation = translateWithBasicEdition.translate(query, Translate.TranslateOption.targetLanguage(targetLang));
        return translation.getTranslatedText();
    }
}
