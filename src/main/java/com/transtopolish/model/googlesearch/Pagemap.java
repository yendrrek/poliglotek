package com.transtopolish.model.googlesearch;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.micronaut.core.annotation.Introspected;
import io.micronaut.serde.annotation.Serdeable;
import lombok.Data;

import java.util.List;

@Introspected
@Serdeable.Deserializable
@Data
public class Pagemap {
    @JsonProperty("cse_thumbnail")
    private List<CseThumbnail> cseThumbnail;

    private final List<Metatag> metatags;

    @JsonProperty("cse_image")
    private List<CseImage> cseImage;
}
