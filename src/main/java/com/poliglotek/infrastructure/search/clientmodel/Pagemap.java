package com.poliglotek.infrastructure.search.clientmodel;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.micronaut.serde.annotation.Serdeable;

import java.util.List;

@Serdeable
public class Pagemap {

    @JsonProperty("cse_thumbnail")
    private List<CseThumbnail> cseThumbnail;

    private List<Metatag> metatags;

    @JsonProperty("cse_image")
    private List<CseImage> cseImage;

    public Pagemap(List<CseThumbnail> cseThumbnail, List<Metatag> metatags, List<CseImage> cseImage) {
        this.cseThumbnail = cseThumbnail;
        this.metatags = metatags;
        this.cseImage = cseImage;
    }

    public List<CseThumbnail> getCseThumbnail() {
        return cseThumbnail;
    }

    public void setCseThumbnail(List<CseThumbnail> cseThumbnail) {
        this.cseThumbnail = cseThumbnail;
    }

    public List<Metatag> getMetatags() {
        return metatags;
    }

    public void setMetatags(List<Metatag> metatags) {
        this.metatags = metatags;
    }

    public List<CseImage> getCseImage() {
        return cseImage;
    }

    public void setCseImage(List<CseImage> cseImage) {
        this.cseImage = cseImage;
    }
}
