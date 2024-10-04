package com.topolish;

import io.micronaut.context.annotation.Context;
import io.micronaut.context.event.ApplicationEventListener;
import io.micronaut.context.event.StartupEvent;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;

@Context
public class ScrapService implements ApplicationEventListener<StartupEvent> {

    private final Logger log = LoggerFactory.getLogger(ScrapService.class);

    public Document scrapWebPage() {
        String url = "https://www.argentina.gob.ar/justicia/derechofacil/leysimple/vacunacion";
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

    @Override
    public void onApplicationEvent(StartupEvent event) {
        scrapWebPage();
    }
}
