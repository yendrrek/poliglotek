package com.transtopolish.service

import com.transtopolish.config.JsoupConfig
import io.micronaut.test.extensions.spock.annotation.MicronautTest
import jakarta.inject.Inject
import org.jsoup.Jsoup
import org.jsoup.nodes.Document
import org.jsoup.nodes.Element
import org.jsoup.select.Elements
import spock.lang.Specification
import spock.lang.Subject
import spock.lang.Unroll

@MicronautTest
class ScrapServiceTest extends Specification {

    @Inject
    @Subject
    ScrapService scrapService

    @Inject
    JsoupConfig mockJsoupConfig = Mock()

    @Unroll
    def "scrapWebPages should return cleaned HTML for URLs"() {
        given:
        String userAgent = "Mozilla"
        String url = "http://example.com"
        mockJsoupConfig.getUserAgent() >> userAgent
        Document mockDocument = Mock()
        Element mockBody = Mock()
        Elements mockElements = Mock()
        mockDocument.body() >> mockBody
        mockBody.outerHtml() >> "<html><body>Test</body></html>"
        mockDocument.getAllElements() >> mockElements
        Jsoup.connect(url).userAgent(userAgent).get() >> mockDocument

        when:
        List<String> result = scrapService.scrapWebPages([url])

        then:
        result.size() == 1
        result[0] == "<html><body>Test</body></html>"

//        cleanup:
        // Perform any necessary cleanup here
    }
}
