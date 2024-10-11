package com.transtopolish.scrap.service;

import com.transtopolish.scrap.config.JsoupConfig;
import jakarta.inject.Singleton;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;

@Singleton
public class ScrapService {

    private final Logger log = LoggerFactory.getLogger(ScrapService.class);
    private final JsoupConfig jsoupConfig;

    public ScrapService(JsoupConfig jsoupConfig) {
        this.jsoupConfig = jsoupConfig;
    }

    public String scrapWebPage(String url) {
        String userAgent = jsoupConfig.getUserAgent();
        try {
            Document document = Jsoup
                    .connect(url)
                    .userAgent(userAgent).get();
            return document.select("body").outerHtml();
        } catch (IOException e) {
            log.error("Error scrapping URL {}", url, e);
            return null;
        }
    }
}
