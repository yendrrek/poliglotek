package com.poliglotek.infrastructure.scraping;

import com.poliglotek.application.translation.port.out.ScrapingPort;
import com.poliglotek.domain.translation.search.model.UrlFound;
import com.poliglotek.infrastructure.scraping.dto.ScrapedPage;
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
public class ScrapeService implements ScrapingPort {

    private final Logger log = LoggerFactory.getLogger(ScrapeService.class);
    private static final String ON_PREFIX = "on";
    private static final String[] TAGS_ONLY = { "a", "img", "map", "area" };
    private static final String TAGS_WITH_CONTENT = "ul, ol, li, dl, dt, dd, menu, nav";
    private static final String CHROME_DRIVER_PATH = "/usr/bin/chromedriver-linux64/chromedriver";
    private static final String  USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, " +
            "like Gecko) Chrome/107.0.0.0 Safari/537.36";

    @Override
    public List<ScrapedPage> scrapePages(List<UrlFound> urls) {
        return urls.stream()
                .map(urlFound -> {
                    String url = urlFound.url();
                    String page = scrapePage(url);
                    return new ScrapedPage(page, url);
                })
                .toList();
    }

    // Compatibility between Chrome installed on your machine and Chrome Driver:
    // https://googlechromelabs.github.io/chrome-for-testing/
    // Also useful is the article in your Medium in the folder "Chrome Driver"
    private String scrapePage(String url) {
        log.info("Scraping {}", url);
        Document doc;
        WebDriver driver = null;
        try {
            doc = scrapePageWithJsoup(url);
            if (doc == null) {
                return null;
            }
            if (isDynamicPage(doc)) {
                log.info("Body is empty, so it's probably a dynamic page. Using Selenium for scraping, not Jsoup");
                driver = createChromeDriver();
                String page = scrapePageWithSelenium(url, driver);
                if (page == null) {
                    log.error("Page scraped with Selenium is null");
                    return null;
                }
                driver.quit();
                driver = null;
                doc = Jsoup.parse(page);
            }
            return getPageProcessedWithJsoup(doc);
        } catch (Exception e) {
            log.error("Error scrapping {}", url, e);
            return null;
        } finally {
            if (driver != null) {
                driver.quit();
            }
        }
    }

    private Document scrapePageWithJsoup(String url) {
        try {
            return Jsoup.connect(url).userAgent(USER_AGENT).get();
        } catch (Exception e) {
            log.error("Error scraping {} with Jsoup", url, e);
            return null;
        }
    }

    private boolean isDynamicPage(Document doc) {
        return doc.body().text().isBlank();
    }

    private ChromeDriver createChromeDriver() {
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless", "--window-size-1920, 1200", "--ignore-certificate-errors");
        return new ChromeDriver(options);
    }

    private String scrapePageWithSelenium(String url, WebDriver driver) {
        System.setProperty("webdriver.chrome.driver", CHROME_DRIVER_PATH);
        driver.get(url);
        return driver.getPageSource();
    }

    private String getPageProcessedWithJsoup(Document doc) {
        doc.select(TAGS_WITH_CONTENT).remove();
        Element documentBody = doc.body();
        documentBody.getAllElements().forEach(this::removeJsAttributes);
        Safelist safelist = Safelist.relaxed()
                .removeTags(TAGS_ONLY)
                .removeAttributes(":all", "style");
        String safeBody = Jsoup.clean(documentBody.html(), safelist);
        return filterElementsWithContent(Jsoup.parse(safeBody));
    }

    private void removeJsAttributes(Element bodyElement) {
        bodyElement.attributes().asList().forEach(attribute -> {
            if (attribute.getKey().startsWith(ON_PREFIX)) {
                bodyElement.removeAttr(attribute.getKey());
            }
        });
    }

    private static String filterElementsWithContent(Document doc) {
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
