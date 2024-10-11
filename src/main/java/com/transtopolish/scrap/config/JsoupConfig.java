package com.transtopolish.scrap.config;

import io.micronaut.context.annotation.ConfigurationProperties;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@ConfigurationProperties( "jsoup")
public class JsoupConfig {
    private String userAgent;
}
