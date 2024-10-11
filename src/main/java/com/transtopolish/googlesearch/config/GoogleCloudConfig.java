package com.transtopolish.googlesearch.config;

import io.micronaut.context.annotation.ConfigurationProperties;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ConfigurationProperties("googleCloud")
public class GoogleCloudConfig {
    private String projectId;
    private String customSearchApiKey;
    private String customSearchEngineId;
}
