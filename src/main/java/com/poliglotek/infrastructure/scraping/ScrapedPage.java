package com.poliglotek.infrastructure.scraping;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable
public record ScrapedPage(String body, String url) {}
