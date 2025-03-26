package com.poliglotek.model.googlesearch;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable
public class CseImage {

    private String src;

    public CseImage(String src) {
        this.src = src;
    }

    public String getSrc() {
        return src;
    }

    public void setSrc(String src) {
        this.src = src;
    }
}
