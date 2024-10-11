package com.transtopolish.googlesearch.service;

import com.google.cloud.translate.Translate;
import com.google.cloud.translate.TranslateOptions;
import com.google.cloud.translate.Translation;
import jakarta.inject.Singleton;

@Singleton
public class SearchQueryTranslation {
    public String translateSearchQuery(String searchTerm, String targetLanguage) {
        Translate translateWithBasicEdition = TranslateOptions.getDefaultInstance().getService();
        Translation translation = translateWithBasicEdition.translate(searchTerm, Translate.TranslateOption.targetLanguage(targetLanguage));
        return translation.getTranslatedText();
    }
}
