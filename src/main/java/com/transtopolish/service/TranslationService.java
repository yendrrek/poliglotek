package com.transtopolish.service;

import com.google.cloud.translate.v3.*;
import com.transtopolish.model.error.Response;
import com.transtopolish.model.googletranslate.TranslatedPage;
import com.transtopolish.model.jsoup.ScrapedWebPage;
import io.micronaut.context.annotation.Value;
import jakarta.inject.Singleton;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.security.SecureRandom;
import java.util.List;
import java.util.Objects;

@Singleton
public class TranslationService {

    private final Logger log = LoggerFactory.getLogger(TranslationService.class);
    private final GoogleSearchService googlesearchService;
    private final ScrapService scrapService;
    private final String projectId;
    private static final String POLISH = "pl";
    private static final String GLOBAL_LOCATION = "global";
    private static final String TEXT_HTML = "text/html";
    private static final String BASE_CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    private static final int ID_LENGTH = 10;
    private static final int CHRACTERS_LIMIT = 20000; // The actual limit is 30.000, recommended is 5.000
    private static final String LOG_LINE = "Query: {}. Target language: {}. Page location: {}";

    public TranslationService(GoogleSearchService googleSearchService,
                              ScrapService scrapService,
                              @Value("${googleCloud.projectId}") String projectId) {
        this.googlesearchService = googleSearchService;
        this.scrapService = scrapService;
        this.projectId = projectId;
    }

    public Response<List<TranslatedPage>> getTranslatedPagesResponse(String query, String targetLang, String countryCode) {
        log.info("User selected >> " + LOG_LINE, query, targetLang, countryCode);
        String translatedQuery = getTranslation(query, targetLang, projectId);
        log.info("Polish query: {}. Translated to {}: {}", query, targetLang, translatedQuery);
        List<String> urls = googlesearchService.fetchUrls(translatedQuery, targetLang, countryCode);
        if (urls == null || urls.isEmpty()) {
            log.info("No results for combination >> " + LOG_LINE, query, targetLang, countryCode);
            return Response.error("Żadne strony nie zostały znalezione");
        }
        List<ScrapedWebPage> scrapedPages = scrapService.scrapWebPages(urls);
        if (isUnsupportedWebPage(scrapedPages)) {
            List<ScrapedWebPage> filteredScrapedPages = removeUnsupportedWebPages(scrapedPages);
            List<TranslatedPage> translatedPages = translatePages(filteredScrapedPages);
            String warning = createUnsupportedPageWarning(scrapedPages, filteredScrapedPages);
            return Response.success(translatedPages, warning);
        }
        if (isIOExceptionWhenScraping(scrapedPages)) {
            return Response.error("Wystąpił problem podczas odczytywania stron.");
        }
        List<TranslatedPage> translatedPages = translatePages(scrapedPages);
        if (translatedPages == null || translatedPages.isEmpty()) {
            return Response.error("Ilość znaków do tłumaczenia na wszystkich wyszukanych stronach przekracza limit 20 tysięcy");
        }
        if (translatedPages.contains(null)) {
            String warning = createCharacterLimitWarning(translatedPages);
            return Response.success(translatedPages, warning);
        }
        return Response.success(translatedPages);
    }

    private List<TranslatedPage> translatePages(List<ScrapedWebPage> scrapedPages) {
        return scrapedPages.stream()
                .map(this::translatePage)
                .toList();
    }

    private TranslatedPage translatePage(ScrapedWebPage page) {
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
        return String.format("Niektóre z wyszukanych stron przekraczają limit 20 tysięcy znaków, " +
                "więc nie mogą być przetłumaczone. Ilość tych stron: %s.", numberOfPagesWithTooManyCharacters);
    }

    private String createUnsupportedPageWarning(List<ScrapedWebPage> scrapedPages, List<ScrapedWebPage> filteredScrapedPages) {
        int numberOfUnsupportedPages = scrapedPages.size() - filteredScrapedPages.size();
        return String.format("Niektóre strony zostały pominięte, ponieważ albo są dokumentami PDF, " +
                "albo posiadają inne nieobsługiwane rozszerzenie. Ilość tych stron: %s.", numberOfUnsupportedPages);
    }

    private boolean hasPageTooManyCharacters(String pageBody) {
        int numberOfCharacters = pageBody.length();
        log.info("Number of web page characters to translate: {}", numberOfCharacters);
        if (numberOfCharacters > CHRACTERS_LIMIT) {
            log.error("Number of web page characters to translate must not exceed {} characters", CHRACTERS_LIMIT);
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
        } catch (IOException e) {
            log.error("Error translating html page", e);
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

    private boolean isUnsupportedWebPage(List<ScrapedWebPage> scrapedPages) {
        return scrapedPages.stream().anyMatch(page -> page.body() == null);
    }

    private boolean isIOExceptionWhenScraping(List<ScrapedWebPage> scrapedPages) {
        return scrapedPages.stream().anyMatch(page -> page.body().equals("IOException"));
    }

    private List<ScrapedWebPage> removeUnsupportedWebPages(List<ScrapedWebPage> scrapedPages) {
        return scrapedPages.stream()
                .filter(page -> page.body() != null)
                .toList();
    }
}
