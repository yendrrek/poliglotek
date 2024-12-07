package com.transtopolish.model.googlesearch;

import io.micronaut.core.annotation.Introspected;
import io.micronaut.serde.annotation.Serdeable;
import lombok.Data;

import java.util.List;

@Introspected
@Serdeable.Deserializable
@Data
public class SearchQueries {
    private final List<SearchRequest> request;
    private final List<SearchRequest> nextPage;
}
