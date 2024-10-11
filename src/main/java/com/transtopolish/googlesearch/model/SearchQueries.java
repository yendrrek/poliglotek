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
public class SearchQueries {
    private final List<SearchRequest> request;
    private final List<SearchRequest> nextPage;
}
