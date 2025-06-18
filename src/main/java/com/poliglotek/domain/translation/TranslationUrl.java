package com.poliglotek.domain.translation;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable
public record TranslationUrl(String url) {}
