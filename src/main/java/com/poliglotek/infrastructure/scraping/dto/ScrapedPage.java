package com.poliglotek.infrastructure.scraping.dto;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable
public record ScrapedPage(String body, String url) {}
