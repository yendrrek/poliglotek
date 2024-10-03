package com.topolish.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class Pagemap {
    @JsonProperty("cse_thumbnail")
    private CseThumbnail[] cseThumbnail;

    private Metatag[] metatags;

    @JsonProperty("cse_image")
    private CseImage[] cseImage;
}
