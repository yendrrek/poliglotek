package com.poliglotek.infrastructure.search.dto;

import io.micronaut.serde.annotation.Serdeable;

import java.util.List;

@Serdeable
public class SearchResponseWrapper {

    private String kind;
    private SearchUrl url;
    private SearchQueries queries;
    private SearchContext context;
    private SearchInformation searchInformation;
    private List<SearchItem> items;

    public SearchResponseWrapper(String kind,
                                 SearchUrl url,
                                 SearchQueries queries,
                                 SearchContext context,
                                 SearchInformation searchInformation,
                                 List<SearchItem> items) {
        this.kind = kind;
        this.url = url;
        this.queries = queries;
        this.context = context;
        this.searchInformation = searchInformation;
        this.items = items;
    }

    public String getKind() {
        return kind;
    }

    public void setKind(String kind) {
        this.kind = kind;
    }

    public SearchUrl getUrl() {
        return url;
    }

    public void setUrl(SearchUrl url) {
        this.url = url;
    }

    public SearchQueries getQueries() {
        return queries;
    }

    public void setQueries(SearchQueries queries) {
        this.queries = queries;
    }

    public SearchContext getContext() {
        return context;
    }

    public void setContext(SearchContext context) {
        this.context = context;
    }

    public SearchInformation getSearchInformation() {
        return searchInformation;
    }

    public void setSearchInformation(SearchInformation searchInformation) {
        this.searchInformation = searchInformation;
    }

    public List<SearchItem> getItems() {
        return items;
    }

    public void setItems(List<SearchItem> items) {
        this.items = items;
    }
}
