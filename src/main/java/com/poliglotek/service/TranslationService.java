package com.poliglotek.service;

import com.google.cloud.translate.v3.*;
import com.poliglotek.model.googletranslate.TranslatedPage;
import com.poliglotek.model.jsoup.ScrapedPage;
import com.poliglotek.model.translationresponse.TranslationResponse;
import io.micronaut.context.annotation.Value;
import jakarta.inject.Singleton;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.security.SecureRandom;
import java.util.List;
import java.util.Objects;

@Singleton
public class TranslationService {

    private final Logger log = LoggerFactory.getLogger(TranslationService.class);
    private final GoogleSearchService googlesearchService;
    private final ScrapeService scrapService;
    private final String projectId;
    private static final String POLISH = "pl";
    private static final String GLOBAL_LOCATION = "global";
    private static final String TEXT_HTML = "text/html";
    private static final String BASE_CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    private static final int ID_LENGTH = 10;
    private static final int CHARACTERS_LIMIT = 15000; // Hard limit: 30000; recommended: 5000, but websites need more
    private static final int CHARACTERS_LIMIT_LOG = 15;

    public TranslationService(GoogleSearchService googleSearchService,
                              ScrapeService scrapService,
                              @Value("${googleCloud.projectId}") String projectId) {
        this.googlesearchService = googleSearchService;
        this.scrapService = scrapService;
        this.projectId = projectId;
    }

    public TranslationResponse<List<TranslatedPage>> getTranslatedPagesResponse(String query,
                                                                                String targetLang,
                                                                                String countryCode) {
        log.info("Query: {} | Target language: {} | Page location: {}", query, targetLang, countryCode);
        String translatedQuery = getTranslation(query, targetLang, projectId);
        log.info("Polish query: '{}' is translated to '{}' as '{}'", query, targetLang, translatedQuery);
        List<String> urls = googlesearchService.fetchUrls(translatedQuery, targetLang, countryCode);
        if (urls == null || urls.isEmpty()) {
            log.info("No results for combination | {} | {} | {} |", query, targetLang, countryCode);
            return TranslationResponse.error("Nie znaleziono żadnych stron");
        }
        List<ScrapedPage> pages = scrapService.scrapePages(urls);
        if (containsFailedPage(pages)) {
            List<ScrapedPage> filteredPages = removeFailedPages(pages);
            List<TranslatedPage> translatedPages = translatePages(filteredPages);
            int numberOfFailedPages = pages.size() - filteredPages.size();
            log.warn("Number of pages which failed to be scraped: {}", numberOfFailedPages);
            String warning = createFailedPageWarning(numberOfFailedPages);
            return TranslationResponse.success(translatedPages, warning);
        }
        List<TranslatedPage> translatedPages = translatePages(pages);
        if (translatedPages.stream().allMatch(Objects::isNull)) {
            return TranslationResponse.error("Ilość znaków do tłumaczenia na każdej wyszukanej stronie " +
                    "przekracza limit " + CHARACTERS_LIMIT_LOG + " tysięcy");
        }
        if (translatedPages.contains(null)) {
            String warning = createCharacterLimitWarning(translatedPages);
            return TranslationResponse.success(translatedPages, warning);
        }
        return TranslationResponse.success(translatedPages);
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
        String translatedPageId = createTranslatedPageId();
        String translation = getTranslation(pageBody, POLISH, projectId);
        return new TranslatedPage(translatedPageId, translation, page.url());
    }

    private String createCharacterLimitWarning(List<TranslatedPage> translatedPages) {
        int numberOfPagesWithTooManyCharacters = (int) translatedPages.stream().filter(Objects::isNull).count();
        return String.format("Niektóre z wyszukanych stron przekraczają limit %s tysięcy znaków, więc nie mogą być " +
                "przetłumaczone. Ilość tych stron: %s.", CHARACTERS_LIMIT_LOG, numberOfPagesWithTooManyCharacters);
    }

    private String createFailedPageWarning(int numberOfUnsupportedPages) {
        return String.format("Niektóre wyszukane strony nie zostały przetłumaczone, ponieważ posiadają " +
                "nieobsługiwany format, bądź są niedostępne. Ilość tych stron: %s", numberOfUnsupportedPages);
    }

    private boolean hasPageTooManyCharacters(String pageBody) {
        int numberOfCharacters = pageBody.length();
        log.info("Number of web page characters to translate: {}", numberOfCharacters);
        if (numberOfCharacters > CHARACTERS_LIMIT) {
            log.error("Number of web page characters to translate must not exceed {} characters", CHARACTERS_LIMIT);
            return true;
        }
        return false;
    }

    private String getTranslation(String text, String targetLang, String projectId) {
        TranslateTextResponse response = translatePage(text, targetLang, projectId);
        if (response == null) {
            log.error("Response from Google Custom Search must not be null");
            return null;
        }
        return buildTranslation(response);
    }

    private TranslateTextResponse translatePage(String text, String targetLang, String projectId) {
        try (TranslationServiceClient client = TranslationServiceClient.create()) {
            LocationName parent = LocationName.of(projectId, GLOBAL_LOCATION);
            TranslateTextRequest request = TranslateTextRequest.newBuilder()
                    .setParent(parent.toString())
                    .setMimeType(TEXT_HTML)
                    .setTargetLanguageCode(targetLang)
                    .addContents(text)
                    .build();
            return client.translateText(request);
        } catch (Exception e) {
            log.error("Error translating web page", e);
            return null;
        }
    }

    private String buildTranslation(TranslateTextResponse response) {
        StringBuilder translatedHTML = new StringBuilder();
        List<Translation> translationList = response.getTranslationsList();
        for (com.google.cloud.translate.v3.Translation translation : translationList) {
            translatedHTML.append(translation.getTranslatedText());
        }
        return translatedHTML.toString();
    }

    private String createTranslatedPageId() {
        SecureRandom secureRandom = new SecureRandom();
        StringBuilder id = new StringBuilder(ID_LENGTH);
        for (int i = 0; i < ID_LENGTH; i++) {
            int index = secureRandom.nextInt(BASE_CHARACTERS.length());
            id.append(BASE_CHARACTERS.charAt(index));
        }
        return id.toString();
    }

    private boolean containsFailedPage(List<ScrapedPage> scrapedPages) {
        return scrapedPages.stream().anyMatch(page -> page.body() == null);
    }

    private List<ScrapedPage> removeFailedPages(List<ScrapedPage> scrapedPages) {
        return scrapedPages.stream()
                .filter(page -> page.body() != null)
                .toList();
    }
}
