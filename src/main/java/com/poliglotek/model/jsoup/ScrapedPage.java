package com.poliglotek.model.jsoup;

import io.micronaut.core.annotation.Introspected;
import io.micronaut.serde.annotation.Serdeable;

@Introspected
@Serdeable.Serializable
public record ScrapedPage(String body, String url) { }
