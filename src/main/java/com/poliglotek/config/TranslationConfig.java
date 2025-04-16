package com.poliglotek.config;

public final class TranslationConfig {

    private TranslationConfig() {}

    public static final String TARGET_LANGUAGE_POLISH = "pl";
    public static final String GLOBAL_LOCATION = "global";
    public static final String TEXT_HTML = "text/html";
    public static final int CHARACTERS_LIMIT = 15000; // Hard limit: 30000; recommended: 5000, but websites need more
    public static final int CHARACTERS_LIMIT_LOG_IN_THOUSANDS = 15;
}
