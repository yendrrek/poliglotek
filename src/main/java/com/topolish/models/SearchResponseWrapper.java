package com.topolish.models;

import lombok.Getter;

@Getter
public class SearchResponseWrapper {
    private String kind;
    private SearchUrl url;
    private SearchQueries queries;
    private SearchContext context;
    private SearchInformation searchInformation;
    private SearchItem[] items;
}
