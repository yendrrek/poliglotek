package com.transtopolish.service;

import com.transtopolish.model.jsoup.ScrapedWebPage;
import io.micronaut.context.annotation.Value;
import jakarta.inject.Singleton;
import org.jsoup.Jsoup;
import org.jsoup.UnsupportedMimeTypeException;
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

    public List<ScrapedWebPage> scrapWebPages(List<String> urls) {
        return urls.stream()
                .map(url -> {
                    String page = scrapWebPage(url, userAgent);
                    return new ScrapedWebPage(page, url);
                })
                .toList();
    }

    private String scrapWebPage(String url, String userAgent) {
        log.info("Scrapping {}", url);
        try {
            Document doc = Jsoup.connect(url).userAgent(userAgent).get();
            doc.select(TAGS_WITH_CONTENT).remove();
            Element documentBody = doc.body();
            documentBody.getAllElements().forEach(this::removeJsAttributes);
            Safelist safelist = Safelist.relaxed()
                    .removeTags(TAGS_ONLY)
                    .removeAttributes(":all", "style");
            String safeBody = Jsoup.clean(documentBody.html(), safelist);
            return filterElemenstWithContent(Jsoup.parse(safeBody));
        } catch (UnsupportedMimeTypeException e) {
            log.warn("Unsupported content type in {}. Skipping it.", url);
            return null;
        } catch (IOException e) {
            log.error("Error scrapping {} due to IO error", url, e);
            return "IOException";
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
