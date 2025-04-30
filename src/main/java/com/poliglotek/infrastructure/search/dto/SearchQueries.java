package com.poliglotek.infrastructure.search.dto;

import io.micronaut.serde.annotation.Serdeable;

import java.util.List;

@Serdeable
public class SearchQueries {

    private List<SearchRequest> request;
    private List<SearchRequest> nextPage;

    public SearchQueries(List<SearchRequest> request, List<SearchRequest> nextPage) {
        this.request = request;
        this.nextPage = nextPage;
    }

    public List<SearchRequest> getRequest() {
        return request;
    }

    public void setRequest(List<SearchRequest> request) {
        this.request = request;
    }

    public List<SearchRequest> getNextPage() {
        return nextPage;
    }

    public void setNextPage(List<SearchRequest> nextPage) {
        this.nextPage = nextPage;
    }
}
