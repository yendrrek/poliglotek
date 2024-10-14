package com.transtopolish.model.googlesearch;

import io.micronaut.core.annotation.Introspected;
import io.micronaut.serde.annotation.Serdeable;
import lombok.AllArgsConstructor;
import lombok.Data;

@Introspected
@Serdeable
@Data
@AllArgsConstructor
public class SearchItem {
    private final String kind;
    private final String title;
    private final String htmlTitle;
    private final String link;
    private final String displayLink;
    private final String snippet;
    private final String htmlSnippet;
    private final String formattedUrl;
    private final String htmlFormattedUrl;
    private final Pagemap pagemap;
}
