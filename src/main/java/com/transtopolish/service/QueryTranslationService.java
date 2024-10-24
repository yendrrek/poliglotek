package com.transtopolish.service;

import com.google.cloud.translate.Translate;
import com.google.cloud.translate.TranslateOptions;
import com.google.cloud.translate.Translation;

public class QueryTranslationService {

    public String translateQuery(String query, String targetLang) {
        Translate translateWithBasicEdition = TranslateOptions.getDefaultInstance().getService();
        Translation translation = translateWithBasicEdition.translate(query, Translate.TranslateOption.targetLanguage(targetLang));
        return translation.getTranslatedText();
    }
}
