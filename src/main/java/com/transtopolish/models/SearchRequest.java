package com.transtopolish.models;

import io.micronaut.core.annotation.Introspected;
import io.micronaut.serde.annotation.Serdeable;
import lombok.AllArgsConstructor;
import lombok.Data;

@Introspected
@Serdeable
@Data
@AllArgsConstructor
public class SearchRequest {
    private final String title;
    private final String totalResults;
    private final String searchTerms;
    private final int count;
    private final int startIndex;
    private final String language;
    private final String inputEncoding;
    private final String outputEncoding;
    private final String safe;
    private final String cx;
    private final String cr;
}
