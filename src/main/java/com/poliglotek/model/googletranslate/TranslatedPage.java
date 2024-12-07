package com.poliglotek.model.googletranslate;

import io.micronaut.core.annotation.Introspected;
import io.micronaut.serde.annotation.Serdeable;

@Introspected
@Serdeable.Serializable
public record TranslatedPage(String id, String body, String url) { }
