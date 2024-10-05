package com.topolish.models;

import lombok.Getter;

import java.util.List;

@Getter
public class SearchResponseWrapper {
    private String kind;
    private SearchUrl url;
    private SearchQueries queries;
    private SearchContext context;
    private SearchInformation searchInformation;
    private List<SearchItem> items;
}
