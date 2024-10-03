package com.topolish.models;

import lombok.Getter;

@Getter
public class SearchQueries {
    private SearchRequest[] request;
    private SearchRequest[] nextPage;
}
