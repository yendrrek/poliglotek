package com.transtopolish.model.googlesearch;

import io.micronaut.core.annotation.Introspected;
import io.micronaut.serde.annotation.Serdeable;
import lombok.Data;

@Introspected
@Serdeable.Deserializable
@Data
public class SearchInformation {
    private final double searchTime;
    private final String formattedSearchTime;
    private final String totalResults;
    private final String formattedTotalResults;
}
