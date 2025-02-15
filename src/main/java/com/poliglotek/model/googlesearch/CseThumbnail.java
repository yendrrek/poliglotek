package com.poliglotek.model.googlesearch;

import io.micronaut.core.annotation.Introspected;
import io.micronaut.serde.annotation.Serdeable;
import lombok.AllArgsConstructor;
import lombok.Data;

@Introspected
@Serdeable.Deserializable
@Data
@AllArgsConstructor
public class CseThumbnail {
    private final String src;
    private final String width;
    private final String height;
}
