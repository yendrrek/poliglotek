package com.transtopolish.service

import io.micronaut.test.extensions.spock.annotation.MicronautTest
import jakarta.inject.Inject
import spock.lang.Specification
import spock.lang.Subject
import spock.lang.Unroll

@MicronautTest
class ScrapServiceOnlyElementsWithContentTest extends Specification {

    @Inject
    @Subject
    ScrapService scrapService

    @Unroll
    def "scrapWebPages should only return HTML elements with content and remove all empty elements"() {
        given:
        String testUrl2 = "https://yendrrek.github.io/transtopol-testpage2/index.html"

        when:
        List<String> result = scrapService.scrapWebPages([testUrl2])

        then:
        result.size() == 1
    }
}
