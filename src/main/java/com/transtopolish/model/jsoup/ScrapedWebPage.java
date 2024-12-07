package com.transtopolish.model.jsoup;

import io.micronaut.core.annotation.Introspected;
import io.micronaut.serde.annotation.Serdeable;

@Introspected
@Serdeable.Serializable
public record ScrapedWebPage(String body, String url) { }
