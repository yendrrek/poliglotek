package com.poliglotek.domain.translation;

import com.poliglotek.application.translation.TranslateClientPortOut;
import com.poliglotek.application.translation.TranslationResult;
import com.poliglotek.infrastructure.scraping.ScrapedPage;
import jakarta.inject.Singleton;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Objects;

import static com.poliglotek.infrastructure.translation.TranslationConstants.*;

@Singleton
public class TranslationDomainService {

    private final Logger LOG = LoggerFactory.getLogger(TranslationDomainService.class);
    private final TranslatedPageIdGenerator idGenerator;
    private final TranslateClientPortOut translateClientPortOut;

    public TranslationDomainService(TranslatedPageIdGenerator idGenerator,
                                    TranslateClientPortOut translateClientPortOut) {
        this.idGenerator = idGenerator;
        this.translateClientPortOut = translateClientPortOut;
    }

    public TranslationResult processTranslation(List<ScrapedPage> pages) {
        List<Translation> translatedPages = translatePages(pages);

        if (allPagesExceedCharacterLimit(translatedPages)) {
            throw new AllPagesCharacterLimitExceededException("Ilość znaków do tłumaczenia na każdej wyszukanej " +
                    "stronie przekracza limit " + CHARACTERS_LIMIT_LOG_IN_THOUSANDS + " tysięcy");
        }

        String warning = null;
        if (somePagesExceedCharacterLimit(translatedPages)) {
            warning = createCharacterLimitWarning(translatedPages);
            translatedPages = translatedPages.stream()
                    .filter(Objects::nonNull)
                    .toList();
        }

        return new TranslationResult(translatedPages, warning);
    }

    private List<Translation> translatePages(List<ScrapedPage> pages) {
        return pages.stream()
                .map(this::translatePage)
                .toList();
    }

    private Translation translatePage(ScrapedPage page) {
        String pageBody = page.body();
        String url = page.url();

        if (pageBody == null || hasPageTooManyCharacters(pageBody, url)) return null;

        return new Translation(
                idGenerator.generate(),
                new TranslatedPage(translateClientPortOut.translate(pageBody, TARGET_LANGUAGE_POLISH)),
                url
        );
    }

    private boolean hasPageTooManyCharacters(String pageBody, String url) {
        int numberOfCharacters = pageBody.length();
        LOG.info("Number of web page characters to translate: {}", numberOfCharacters);
        if (numberOfCharacters > CHARACTERS_LIMIT) {
            LOG.error("Exceeded allowed character limit of {}. Page: {}", CHARACTERS_LIMIT, url);
            return true;
        }
        return false;
    }

    private boolean allPagesExceedCharacterLimit(List<Translation> pages) {
        return !pages.isEmpty() && pages.stream().allMatch(Objects::isNull);
    }

    private boolean somePagesExceedCharacterLimit(List<Translation> pages) {
        return pages.stream().anyMatch(Objects::isNull);
    }

    private String createCharacterLimitWarning(List<Translation> translatedPages) {
        int numberOfPagesWithTooManyCharacters = (int) translatedPages.stream().filter(Objects::isNull).count();
        return String.format("Niektóre z wyszukanych stron przekraczają limit %s tysięcy znaków, więc nie mogą być " +
                "przetłumaczone. Ilość tych stron: %s.", CHARACTERS_LIMIT_LOG_IN_THOUSANDS, numberOfPagesWithTooManyCharacters);
    }
}