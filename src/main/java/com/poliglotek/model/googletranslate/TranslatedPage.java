package com.poliglotek.model.googletranslate;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable
public record TranslatedPage(String id, String body, String url) { }
