package com.poliglotek.infrastructure.auth;

import io.micronaut.context.annotation.ConfigurationProperties;

@ConfigurationProperties("google-cloud.oauth")
public class GoogleOAuthProperties {

    private String clientId;

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }
}
