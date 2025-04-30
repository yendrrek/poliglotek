package com.poliglotek.infrastructure.translation;

import io.micronaut.context.annotation.ConfigurationProperties;

@ConfigurationProperties("google-cloud.translation")
public class GoogleTranslateProperties {

    private String projectId;

    public String getProjectId() {
        return projectId;
    }

    public void setProjectId(String projectId) {
        this.projectId = projectId;
    }
}
