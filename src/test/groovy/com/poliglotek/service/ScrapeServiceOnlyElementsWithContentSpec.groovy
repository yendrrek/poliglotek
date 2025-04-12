package com.poliglotek.service

import io.micronaut.test.extensions.spock.annotation.MicronautTest
import jakarta.inject.Inject
import spock.lang.Specification
import spock.lang.Subject
import spock.lang.Unroll

@MicronautTest
class ScrapeServiceOnlyElementsWithContentSpec extends Specification {

    @Inject
    @Subject
    ScrapeService scrapeService

    @Unroll
    def "scrapeWebPages should only return HTML elements with content and remove all empty elements"() {
        given:
        String testUrl2 = "https://yendrrek.github.io/poliglotek-testpage2/index.html"

        when:
        List<String> result = scrapeService.scrapePages([testUrl2])

        then:
        result.size() == 1
    }
}
