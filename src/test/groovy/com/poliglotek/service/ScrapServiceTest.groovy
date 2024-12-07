package com.poliglotek.service

import io.micronaut.test.extensions.spock.annotation.MicronautTest
import jakarta.inject.Inject
import spock.lang.Specification
import spock.lang.Subject
import spock.lang.Unroll

@MicronautTest
class ScrapServiceTest extends Specification {

    @Inject
    @Subject
    ScrapService scrapService

    @Unroll
    def "scrapWebPages should return cleaned HTML for URLs"() {
        given:
        String testUrl1 = "https://yendrrek.github.io/poliglotek-testpage/index.html"

        when:
        List<String> result = scrapService.scrapWebPages([testUrl1])

        then:
        result.size() == 1
        List<String> jsAttributesWhichShoulBeRemoved = [
                "onclick", "ondblclick", "onmousedown", "onmouseup",
                "onmouseover", "onmousemove", "onmouseout", "onkeydown",
                "onkeypress", "onkeyup", "onload", "onunload", "onabort",
                "onerror", "onresize", "onscroll", "onselect", "onchange",
                "onsubmit", "onreset", "onfocus", "onblur"
        ]

        jsAttributesWhichShoulBeRemoved.each { jsAttribute -> assert !result[0].contains(jsAttribute) }
    }
}
