package com.transtopolish.models;

import io.micronaut.core.annotation.Introspected;
import io.micronaut.serde.annotation.Serdeable;
import lombok.AllArgsConstructor;
import lombok.Data;

@Introspected
@Serdeable
@Data
@AllArgsConstructor
public class CseImage {
    String src;
}
