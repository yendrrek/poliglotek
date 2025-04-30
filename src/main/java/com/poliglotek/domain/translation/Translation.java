package com.poliglotek.domain.translation;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable
public record Translation(String id, TranslatedPage body, String url) {}
