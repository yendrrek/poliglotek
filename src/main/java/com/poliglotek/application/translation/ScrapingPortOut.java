package com.poliglotek.application.translation;

import com.poliglotek.domain.translation.UrlFound;
import com.poliglotek.infrastructure.scraping.ScrapedPage;

import java.util.List;

public interface ScrapingPortOut {

    List<ScrapedPage> scrapePages(List<UrlFound> url);
}
