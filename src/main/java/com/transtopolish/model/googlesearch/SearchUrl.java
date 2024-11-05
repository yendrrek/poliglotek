package com.transtopolish.model.googlesearch;

import io.micronaut.core.annotation.Introspected;
import io.micronaut.serde.annotation.Serdeable;
import lombok.AllArgsConstructor;
import lombok.Data;

@Introspected
@Serdeable.Deserializable
@Data
@AllArgsConstructor
public class SearchUrl {
    private final String type;
    private final String template;
}
