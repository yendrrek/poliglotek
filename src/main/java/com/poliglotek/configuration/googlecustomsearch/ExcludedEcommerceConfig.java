package com.poliglotek.configuration.googlecustomsearch;

import io.micronaut.context.annotation.ConfigurationProperties;
import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
@ConfigurationProperties("excludedEcommerce")
public class ExcludedEcommerceConfig {

    private Map<String, String> language;
}
