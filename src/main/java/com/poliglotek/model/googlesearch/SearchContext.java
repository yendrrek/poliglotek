package com.poliglotek.model.googlesearch;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable
public class SearchContext {

    private String title;

    public SearchContext(String title) {
        this.title = title;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
