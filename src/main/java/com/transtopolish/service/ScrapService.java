package com.transtopolish.service;

import com.transtopolish.config.JsoupConfig;
import jakarta.inject.Singleton;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.safety.Safelist;
import org.jsoup.select.Elements;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;

@Singleton
public class ScrapService {

    private final Logger log = LoggerFactory.getLogger(ScrapService.class);
    private final JsoupConfig jsoupConfig;
    private static final String ON_PREFIX = "on";

    public ScrapService(JsoupConfig jsoupConfig) {
        this.jsoupConfig = jsoupConfig;
    }

    public String scrapWebPage(String url) { // todo: how to remove <p> element and other with inernal links
        String userAgent = jsoupConfig.getUserAgent();
        try {
            Document document = Jsoup
                    .connect(url)
                    .userAgent(userAgent).get();
            Document bodyDoc = Jsoup.parse(document.body().outerHtml());
            Elements bodyElements = bodyDoc.getAllElements();
            bodyElements.forEach(this::removeJsAttributes);
            Safelist safelist = Safelist.relaxed()
                    .removeTags("a", "img", "map", "area")
                    .removeAttributes(":all", "style");
            return Jsoup.clean(bodyDoc.outerHtml(), safelist);
        } catch (IOException e) {
            log.error("Error scrapping URL {}", url, e);
            return null;
        }
    }

    private void removeJsAttributes(Element bodyElement) {
        bodyElement.attributes().asList().forEach(attribute -> {
            if (attribute.getKey().startsWith(ON_PREFIX)) {
                bodyElement.removeAttr(attribute.getKey());
            }
        });
    }
}
