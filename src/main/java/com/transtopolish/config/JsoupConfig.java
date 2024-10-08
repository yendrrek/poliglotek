package com.transtopolish.config;

import io.micronaut.context.annotation.ConfigurationProperties;
import lombok.Getter;

@Getter
@ConfigurationProperties( "jsoup")
public class JsoupConfig {
    private String userAgent;
}
