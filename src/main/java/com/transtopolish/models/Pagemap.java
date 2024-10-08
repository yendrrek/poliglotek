package com.transtopolish.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.micronaut.core.annotation.Introspected;
import io.micronaut.serde.annotation.Serdeable;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Introspected
@Serdeable
@Data
@AllArgsConstructor
public class Pagemap {
    @JsonProperty("cse_thumbnail")
    private List<CseThumbnail> cseThumbnail;

    private final List<Metatag> metatags;

    @JsonProperty("cse_image")
    private List<CseImage> cseImage;
}
