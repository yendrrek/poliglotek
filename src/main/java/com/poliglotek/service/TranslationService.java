package com.poliglotek.service;

import com.poliglotek.model.googletranslate.TranslatedPage;
import com.poliglotek.model.jsoup.ScrapedPage;
import com.poliglotek.model.translationresponse.TranslationResponse;
import com.poliglotek.utils.IdGenerator;
import jakarta.inject.Singleton;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Objects;

import static com.poliglotek.config.TranslationConfig.*;

@Singleton
public class TranslationService {

    private final Logger LOG = LoggerFactory.getLogger(TranslationService.class);
    private final GoogleSearchService googleSearchService;
    private final ScrapeService scrapService;
    private final IdGenerator idGenerator;
    private final TranslateClient translateClient;

    public TranslationService(GoogleSearchService googleSearchService,
                              ScrapeService scrapService,
                              IdGenerator idGenerator,
                              TranslateClient translateClient) {
        this.googleSearchService = googleSearchService;
        this.scrapService = scrapService;
        this.idGenerator = idGenerator;
        this.translateClient = translateClient;
    }

    public TranslationResponse<List<TranslatedPage>> getTranslatedPagesResponse(String query,
                                                                                String targetLang,
                                                                                String countryCode) {

        LOG.info("Query: {} | Target language: {} | Page location: {}", query, targetLang, countryCode);

        String translatedQuery = translateClient.translateQuery(query, targetLang);
        LOG.info("Polish query: '{}' is translated to '{}' as '{}'", query, targetLang, translatedQuery);

        List<String> urls = googleSearchService.fetchUrls(translatedQuery, targetLang, countryCode);
        if (urls == null || urls.isEmpty()) {
            LOG.info("No results for combination | {} | {} | {} |", query, targetLang, countryCode);
            return TranslationResponse.success(null, "Nie znaleziono żadnych stron");
        }

        List<ScrapedPage> pages = scrapService.scrapePages(urls);

        if (containsFailedPage(pages)) {
            return handleFailedPages(pages);
        }

        List<TranslatedPage> translatedPages = translatePages(pages);

        if (allPagesExceedCharacterLimit(translatedPages)) {
            return TranslationResponse.error("Ilość znaków do tłumaczenia na każdej wyszukanej stronie " +
                    "przekracza limit " + CHARACTERS_LIMIT_LOG_IN_THOUSANDS + " tysięcy");
        }

        if (somePagesExceedCharacterLimit(translatedPages)) {
            String warning = createCharacterLimitWarning(translatedPages);
            return TranslationResponse.success(translatedPages, warning);
        }

        return TranslationResponse.success(translatedPages);
    }

    private TranslationResponse<List<TranslatedPage>> handleFailedPages(List<ScrapedPage> pages) {
        List<ScrapedPage> filteredPages = filterOutFailedPages(pages);
        List<TranslatedPage> translatedPages = translatePages(filteredPages);
        int numberOfFailedPages = pages.size() - filteredPages.size();
        LOG.warn("Number of pages which failed to be scraped: {}", numberOfFailedPages);
        String warning = createFailedPageWarning(numberOfFailedPages);
        return TranslationResponse.success(translatedPages, warning);
    }

    private boolean allPagesExceedCharacterLimit(List<TranslatedPage> pages) {
        return !pages.isEmpty() && pages.stream().allMatch(Objects::isNull);
    }

    private boolean somePagesExceedCharacterLimit(List<TranslatedPage> pages) {
        return pages.stream().anyMatch(Objects::isNull);
    }

    private boolean hasPageTooManyCharacters(String pageBody) {
        int numberOfCharacters = pageBody.length();
        LOG.info("Number of web page characters to translate: {}", numberOfCharacters);
        if (numberOfCharacters > CHARACTERS_LIMIT) {
            LOG.error("Number of web page characters to translate must not exceed {} characters", CHARACTERS_LIMIT);
            return true;
        }
        return false;
    }

    private boolean containsFailedPage(List<ScrapedPage> scrapedPages) {
        return scrapedPages.stream().anyMatch(page -> page.body() == null);
    }

    private List<TranslatedPage> translatePages(List<ScrapedPage> pages) {
        return pages.stream()
                .map(this::translatePage)
                .toList();
    }

    private TranslatedPage translatePage(ScrapedPage page) {
        String pageBody = page.body();
        if (hasPageTooManyCharacters(pageBody)) {
            return null;
        }
        String translatedPageId = idGenerator.generate();
        String translation = translateClient.translateQuery(pageBody, TARGET_LANGUAGE_POLISH);
        return new TranslatedPage(translatedPageId, translation, page.url());
    }

    private List<ScrapedPage> filterOutFailedPages(List<ScrapedPage> scrapedPages) {
        return scrapedPages.stream()
                .filter(page -> page.body() != null)
                .toList();
    }

    private String createCharacterLimitWarning(List<TranslatedPage> translatedPages) {
        int numberOfPagesWithTooManyCharacters = (int) translatedPages.stream().filter(Objects::isNull).count();
        return String.format("Niektóre z wyszukanych stron przekraczają limit %s tysięcy znaków, więc nie mogą być " +
                "przetłumaczone. Ilość tych stron: %s.", CHARACTERS_LIMIT_LOG_IN_THOUSANDS, numberOfPagesWithTooManyCharacters);
    }

    private String createFailedPageWarning(int numberOfUnsupportedPages) {
        return String.format("Niektóre wyszukane strony nie zostały przetłumaczone, ponieważ posiadają " +
                "nieobsługiwany format, bądź są niedostępne. Ilość tych stron: %s", numberOfUnsupportedPages);
    }
}
