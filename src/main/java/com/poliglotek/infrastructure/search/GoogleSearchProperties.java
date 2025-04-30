package com.poliglotek.infrastructure.search;

import io.micronaut.context.annotation.ConfigurationProperties;

@ConfigurationProperties("google-cloud.search")
public class GoogleSearchProperties {

    private String apiKey;
    private String engineId;
    private int limit;

    public String getApiKey() {
        return apiKey;
    }

    public void setApiKey(String apiKey) {
        this.apiKey = apiKey;
    }

    public String getEngineId() {
        return engineId;
    }

    public void setEngineId(String engineId) {
        this.engineId = engineId;
    }

    public int getLimit() {
        return limit;
    }

    public void setLimit(int limit) {
        this.limit = limit;
    }
}
