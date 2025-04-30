package com.poliglotek.infrastructure.search.clientmodel;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable
public class SearchUrl {
    private String type;
    private String template;

    public SearchUrl(String type, String template) {
        this.type = type;
        this.template = template;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getTemplate() {
        return template;
    }

    public void setTemplate(String template) {
        this.template = template;
    }
}
