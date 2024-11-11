package com.transtopolish.service;

import com.transtopolish.model.jsoup.ScrapedPage;
import io.micronaut.context.annotation.Value;
import jakarta.inject.Singleton;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.safety.Safelist;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.List;

@Singleton
public class ScrapService {

    private final Logger log = LoggerFactory.getLogger(ScrapService.class);
    private final String userAgent;
    private static final String ON_PREFIX = "on";
    private static final String[] TAGS_ONLY = { "a", "img", "map", "area" };
    private static final String TAGS_WITH_CONTENT = "ul, ol, li, dl, dt, dd, menu, nav";

    public ScrapService(@Value("${jsoup.userAgent}") String userAgent) {
        this.userAgent = userAgent;
    }

    public List<ScrapedPage> scrapWebPages(List<String> urls) {
        return urls.stream()
                .map(url -> new ScrapedPage(scrapWebPage(url, userAgent), url))
                .toList();
    }

    private String scrapWebPage(String url, String userAgent) {
        log.info("Scrapping {}", url);
        try {
            Document doc = Jsoup
                    .connect(url)
                    .userAgent(userAgent).get();
            doc.select(TAGS_WITH_CONTENT).remove();
            doc.body().getAllElements().forEach(this::removeJsAttributes);
            Safelist safelist = Safelist.relaxed()
                    .removeTags(TAGS_ONLY)
                    .removeAttributes(":all", "style");
            String safeBody = Jsoup.clean(doc.body().html(), safelist);
            return filterElemenstWithContent(Jsoup.parse(safeBody));
        } catch (IOException e) {
            log.error("Error scrapping {}", url, e);
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

    private static String filterElemenstWithContent(Document doc) {
        Element combinedElement = new Element("div");
        for (Element element : doc.getAllElements()) {
            if (!element.ownText().trim().isEmpty()) {
                Element clonedElement = element.clone();
                clonedElement.empty();
                clonedElement.appendText(element.ownText());
                combinedElement.appendChild(clonedElement);
            }
        }
        return removeObsoleteCharacters(combinedElement.html());
    }

    private static String removeObsoleteCharacters(String combinedElement) {
        return combinedElement
                .replace("\n", "")
                .replaceAll("\\s+", " ")
                .replaceAll("(?s)<body>.*?</body>", "")
                .replaceAll("</span><span>", " ")
                .replaceAll("<span>", "");
    }
}
