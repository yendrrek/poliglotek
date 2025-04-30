package com.poliglotek.application.translation;

import com.poliglotek.domain.translation.TranslationDomainService;
import com.poliglotek.domain.translation.UrlFound;
import com.poliglotek.infrastructure.scraping.ScrapedPage;
import com.poliglotek.interfaces.translation.TranslationResponse;
import jakarta.inject.Singleton;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@Singleton
public class TranslationApplicationService {

    private final Logger LOG = LoggerFactory.getLogger(TranslationApplicationService.class);
    private final ScrapingPortOut scrapingPortOut;
    private final GoogleSearchPortOut googleSearchPortOut;
    private final TranslateClientPortOut translateClientPortOut;
    private final TranslationDomainService translationDomainService;

    public TranslationApplicationService(ScrapingPortOut scrapingPortOut,
                                         GoogleSearchPortOut googleSearchPortOut,
                                         TranslateClientPortOut translateClientPortOut,
                                         TranslationDomainService translationDomainService) {
        this.scrapingPortOut = scrapingPortOut;
        this.googleSearchPortOut = googleSearchPortOut;
        this.translateClientPortOut = translateClientPortOut;
        this.translationDomainService = translationDomainService;
    }

    public TranslationResponse getTranslatedPages(String query,
                                                  String targetLang,
                                                  String countryCode) {

        LOG.info("Query: {} | Target language: {} | Page location: {}", query, targetLang, countryCode);

        String translatedQuery = translateClientPortOut.translate(query, targetLang);
        LOG.info("Polish query: '{}' is translated to '{}' as '{}'", query, targetLang, translatedQuery);

        List<UrlFound> urls = googleSearchPortOut.fetchUrls(translatedQuery, targetLang, countryCode);
        if (urls == null || urls.isEmpty()) {
            LOG.info("No results for combination | {} | {} | {} |", query, targetLang, countryCode);
            return new TranslationResponse(
                    false,
                    "Nie znaleziono żadnych stron",
                    null,
                    null
            );
        }

        List<ScrapedPage> pages = scrapingPortOut.scrapePages(urls);

        TranslationResult result = translationDomainService.processTranslation(pages);
        String warning = result.warning();
        return new TranslationResponse(
                true,
                null,
                warning,
                result.pages()
        );
    }
}
