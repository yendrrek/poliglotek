package com.topolish.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

import java.util.List;

@Getter
public class Pagemap {
    @JsonProperty("cse_thumbnail")
    private List<CseThumbnail> cseThumbnail;

    private List<Metatag> metatags;

    @JsonProperty("cse_image")
    private List<CseImage> cseImage;
}
