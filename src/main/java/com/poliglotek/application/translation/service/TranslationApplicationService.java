package com.poliglotek.application.translation.service;

import com.poliglotek.application.translation.dto.TranslationResult;
import com.poliglotek.application.translation.port.out.GoogleSearchPort;
import com.poliglotek.application.translation.port.out.ScrapingPort;
import com.poliglotek.application.translation.port.out.TranslateClientPort;
import com.poliglotek.domain.translation.search.model.UrlFound;
import com.poliglotek.domain.translation.service.TranslationDomainService;
import com.poliglotek.infrastructure.scraping.dto.ScrapedPage;
import com.poliglotek.interfaces.translation.dto.TranslationResponse;
import jakarta.inject.Singleton;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@Singleton
public class TranslationApplicationService {

    private final Logger LOG = LoggerFactory.getLogger(TranslationApplicationService.class);
    private final ScrapingPort scrapingPort;
    private final GoogleSearchPort googleSearchPort;
    private final TranslateClientPort translateClient;
    private final TranslationDomainService translationDomainService;

    public TranslationApplicationService(ScrapingPort scrapingPort,
                                         GoogleSearchPort googleSearchPort,
                                         TranslateClientPort translateClient,
                                         TranslationDomainService translationDomainService) {
        this.scrapingPort = scrapingPort;
        this.googleSearchPort = googleSearchPort;
        this.translateClient = translateClient;
        this.translationDomainService = translationDomainService;
    }

    public TranslationResponse getTranslatedPages(String query,
                                                  String targetLang,
                                                  String countryCode) {

        LOG.info("Query: {} | Target language: {} | Page location: {}", query, targetLang, countryCode);

        String translatedQuery = translateClient.translate(query, targetLang);
        LOG.info("Polish query: '{}' is translated to '{}' as '{}'", query, targetLang, translatedQuery);

        List<UrlFound> urls = googleSearchPort.fetchUrls(translatedQuery, targetLang, countryCode);
        if (urls == null || urls.isEmpty()) {
            LOG.info("No results for combination | {} | {} | {} |", query, targetLang, countryCode);
            return new TranslationResponse(
                    false,
                    "Nie znaleziono żadnych stron",
                    null,
                    null
            );
        }

        List<ScrapedPage> pages = scrapingPort.scrapePages(urls);

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
