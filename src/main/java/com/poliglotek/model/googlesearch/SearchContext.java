package com.poliglotek.model.googlesearch;

import io.micronaut.core.annotation.Introspected;
import io.micronaut.serde.annotation.Serdeable;
import lombok.Data;

@Introspected
@Serdeable.Deserializable
@Data
public class SearchContext {
    private final String title;
}
