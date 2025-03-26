package com.poliglotek.model.jsoup;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable
public record ScrapedPage(String body, String url) { }
