package com.poliglotek.infrastructure.search.clientmodel;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.micronaut.serde.annotation.Serdeable;

@Serdeable
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

    public Metatag(String ogImage,
                   String themeColor,
                   String twitterCard,
                   String twitterTitle,
                   String articlePublishedTime,
                   String gtmPadre,
                   String ogSiteName,
                   String twitterUrl,
                   String ogTitle,
                   String ogUpdatedTime,
                   String msapplicationNavbuttonColor,
                   String ogDescription,
                   String twitterImage,
                   String gtmId,
                   String appleMobileWebAppStatusBarStyle,
                   String articleModifiedTime,
                   String viewport,
                   String gtmPadres,
                   String gtmRaiz,
                   String twitterDescription,
                   String ogUrl,
                   String gtmTipo) {
        this.ogImage = ogImage;
        this.themeColor = themeColor;
        this.twitterCard = twitterCard;
        this.twitterTitle = twitterTitle;
        this.articlePublishedTime = articlePublishedTime;
        this.gtmPadre = gtmPadre;
        this.ogSiteName = ogSiteName;
        this.twitterUrl = twitterUrl;
        this.ogTitle = ogTitle;
        this.ogUpdatedTime = ogUpdatedTime;
        this.msapplicationNavbuttonColor = msapplicationNavbuttonColor;
        this.ogDescription = ogDescription;
        this.twitterImage = twitterImage;
        this.gtmId = gtmId;
        this.appleMobileWebAppStatusBarStyle = appleMobileWebAppStatusBarStyle;
        this.articleModifiedTime = articleModifiedTime;
        this.viewport = viewport;
        this.gtmPadres = gtmPadres;
        this.gtmRaiz = gtmRaiz;
        this.twitterDescription = twitterDescription;
        this.ogUrl = ogUrl;
        this.gtmTipo = gtmTipo;
    }

    public String getOgImage() {
        return ogImage;
    }

    public void setOgImage(String ogImage) {
        this.ogImage = ogImage;
    }

    public String getThemeColor() {
        return themeColor;
    }

    public void setThemeColor(String themeColor) {
        this.themeColor = themeColor;
    }

    public String getTwitterCard() {
        return twitterCard;
    }

    public void setTwitterCard(String twitterCard) {
        this.twitterCard = twitterCard;
    }

    public String getTwitterTitle() {
        return twitterTitle;
    }

    public void setTwitterTitle(String twitterTitle) {
        this.twitterTitle = twitterTitle;
    }

    public String getArticlePublishedTime() {
        return articlePublishedTime;
    }

    public void setArticlePublishedTime(String articlePublishedTime) {
        this.articlePublishedTime = articlePublishedTime;
    }

    public String getGtmPadre() {
        return gtmPadre;
    }

    public void setGtmPadre(String gtmPadre) {
        this.gtmPadre = gtmPadre;
    }

    public String getOgSiteName() {
        return ogSiteName;
    }

    public void setOgSiteName(String ogSiteName) {
        this.ogSiteName = ogSiteName;
    }

    public String getTwitterUrl() {
        return twitterUrl;
    }

    public void setTwitterUrl(String twitterUrl) {
        this.twitterUrl = twitterUrl;
    }

    public String getOgTitle() {
        return ogTitle;
    }

    public void setOgTitle(String ogTitle) {
        this.ogTitle = ogTitle;
    }

    public String getOgUpdatedTime() {
        return ogUpdatedTime;
    }

    public void setOgUpdatedTime(String ogUpdatedTime) {
        this.ogUpdatedTime = ogUpdatedTime;
    }

    public String getMsapplicationNavbuttonColor() {
        return msapplicationNavbuttonColor;
    }

    public void setMsapplicationNavbuttonColor(String msapplicationNavbuttonColor) {
        this.msapplicationNavbuttonColor = msapplicationNavbuttonColor;
    }

    public String getOgDescription() {
        return ogDescription;
    }

    public void setOgDescription(String ogDescription) {
        this.ogDescription = ogDescription;
    }

    public String getTwitterImage() {
        return twitterImage;
    }

    public void setTwitterImage(String twitterImage) {
        this.twitterImage = twitterImage;
    }

    public String getGtmId() {
        return gtmId;
    }

    public void setGtmId(String gtmId) {
        this.gtmId = gtmId;
    }

    public String getAppleMobileWebAppStatusBarStyle() {
        return appleMobileWebAppStatusBarStyle;
    }

    public void setAppleMobileWebAppStatusBarStyle(String appleMobileWebAppStatusBarStyle) {
        this.appleMobileWebAppStatusBarStyle = appleMobileWebAppStatusBarStyle;
    }

    public String getArticleModifiedTime() {
        return articleModifiedTime;
    }

    public void setArticleModifiedTime(String articleModifiedTime) {
        this.articleModifiedTime = articleModifiedTime;
    }

    public String getViewport() {
        return viewport;
    }

    public void setViewport(String viewport) {
        this.viewport = viewport;
    }

    public String getGtmPadres() {
        return gtmPadres;
    }

    public void setGtmPadres(String gtmPadres) {
        this.gtmPadres = gtmPadres;
    }

    public String getGtmRaiz() {
        return gtmRaiz;
    }

    public void setGtmRaiz(String gtmRaiz) {
        this.gtmRaiz = gtmRaiz;
    }

    public String getTwitterDescription() {
        return twitterDescription;
    }

    public void setTwitterDescription(String twitterDescription) {
        this.twitterDescription = twitterDescription;
    }

    public String getOgUrl() {
        return ogUrl;
    }

    public void setOgUrl(String ogUrl) {
        this.ogUrl = ogUrl;
    }

    public String getGtmTipo() {
        return gtmTipo;
    }

    public void setGtmTipo(String gtmTipo) {
        this.gtmTipo = gtmTipo;
    }
}
