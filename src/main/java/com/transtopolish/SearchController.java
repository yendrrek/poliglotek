package com.transtopolish;

import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.QueryValue;
import io.micronaut.scheduling.TaskExecutors;
import io.micronaut.scheduling.annotation.ExecuteOn;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Controller("/search")
@ExecuteOn(TaskExecutors.BLOCKING)
public class SearchController {

    private final SearchService searchService;

    public SearchController(SearchService searchService) {
        this.searchService = searchService;
    }

    @Get("/query")
    public String searchInGoogle(@QueryValue String value) {
        Path filePath = Paths.get("/home/andrzej/dev/html-test-file.html");
        try {
            String html = Files.readString(filePath);
            Document document = Jsoup.parse(html);
            document.select("noscript, script, iframe").remove();
            String cleanHtml = document.body().html();
            return cleanHtml;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
//        return searchService.fetchPageBody(value);
    }
}
