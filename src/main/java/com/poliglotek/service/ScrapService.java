package com.poliglotek.service;

import com.poliglotek.model.jsoup.ScrapedWebPage;
import jakarta.inject.Singleton;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.safety.Safelist;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@Singleton
public class ScrapService {

    private final Logger log = LoggerFactory.getLogger(ScrapService.class);
    private static final String ON_PREFIX = "on";
    private static final String[] TAGS_ONLY = { "a", "img", "map", "area" };
    private static final String TAGS_WITH_CONTENT = "ul, ol, li, dl, dt, dd, menu, nav";
    private static final String CHROME_DRIVER_PATH = "/usr/bin/chromedriver-linux64/chromedriver";

    public List<ScrapedWebPage> scrapWebPages(List<String> urls) {
        return urls.stream()
                .map(url -> {
                    String page = scrapWebPage(url);
                    return new ScrapedWebPage(page, url);
                })
                .toList();
    }

    // Compatibility between Chrome installed on your machine and Chrome Driver: https://googlechromelabs.github.io/chrome-for-testing/
    // Also useful is the article in your Medium in the folder "Chrome Driver"
    private String scrapWebPage(String url) {
        log.info("Scraping {}", url);
        try {
            System.setProperty("webdriver.chrome.driver", CHROME_DRIVER_PATH);
            ChromeOptions options = new ChromeOptions();
            options.addArguments("--headless", "--window-size-1920, 1200", "--ignore-certificate-errors");
            WebDriver driver = new ChromeDriver(options);
            driver.get(url);
            String page = driver.getPageSource();
            if (page == null) {
                log.error("Page scraped with Selenium is null");
                return null;
            }

            Document doc = Jsoup.parse(page);
            doc.select(TAGS_WITH_CONTENT).remove();
            Element documentBody = doc.body();
            documentBody.getAllElements().forEach(this::removeJsAttributes);
            Safelist safelist = Safelist.relaxed()
                    .removeTags(TAGS_ONLY)
                    .removeAttributes(":all", "style");
            String safeBody = Jsoup.clean(documentBody.html(), safelist);
            driver.quit();
            return filterElemenstWithContent(Jsoup.parse(safeBody));
        } catch (Exception e) {
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
