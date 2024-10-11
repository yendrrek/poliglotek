package com.transtopolish.googlesearch.model;

import io.micronaut.core.annotation.Introspected;
import io.micronaut.serde.annotation.Serdeable;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Introspected
@Serdeable
@Data
@AllArgsConstructor
public class SearchResponseWrapper {
    private final String kind;
    private final SearchUrl url;
    private final SearchQueries queries;
    private final SearchContext context;
    private final SearchInformation searchInformation;
    private final List<SearchItem> items;
}
