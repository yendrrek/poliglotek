package com.topolish.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class Metatag {
    @JsonProperty("og:image")
    private String ogImage;

    @JsonProperty("theme-color")
    private String themeColor;

    @JsonProperty("twitter:card")
    private String twitterCard;

    @JsonProperty("twitter:title")
    private String twitterTitle;

    @JsonProperty("article:published_time")
    private String articlePublishedTime;

    @JsonProperty("gtm-padre")
    private String gtmPadre;

    @JsonProperty("og:site_name")
    private String ogSiteName;

    @JsonProperty("twitter:url")
    private String twitterUrl;

    @JsonProperty("og:title")
    private String ogTitle;

    @JsonProperty("og:updated_time")
    private String ogUpdatedTime;

    @JsonProperty("msapplication-navbutton-color")
    private String msapplicationNavbuttonColor;

    @JsonProperty("og:description")
    private String ogDescription;

    @JsonProperty("twitter:image")
    private String twitterImage;

    @JsonProperty("gtm-id")
    private String gtmId;

    @JsonProperty("apple-mobile-web-app-status-bar-style")
    private String appleMobileWebAppStatusBarStyle;

    @JsonProperty("article:modified_time")
    private String articleModifiedTime;

    private String viewport;

    @JsonProperty("gtm-padres")
    private String gtmPadres;

    @JsonProperty("gtm-raiz")
    private String gtmRaiz;

    @JsonProperty("twitter:description")
    private String twitterDescription;

    @JsonProperty("og:url")
    private String ogUrl;

    @JsonProperty("gtm-tipo")
    private String gtmTipo;
}
