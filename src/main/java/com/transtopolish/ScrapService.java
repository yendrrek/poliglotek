package com.transtopolish;

import io.micronaut.context.annotation.Context;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;

@Context
public class ScrapService {

    private final Logger log = LoggerFactory.getLogger(ScrapService.class);

    public Document scrapWebPage(String url) {
        String userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36";
        try {
            Document document = Jsoup
                    .connect(url)
                    .userAgent(userAgent).get();
            return document;
        } catch (IOException e) {
            log.error("Error scrapping URL {}", url, e);
            return null;
        }
    }
}
