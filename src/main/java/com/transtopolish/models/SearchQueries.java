package com.transtopolish.models;

import lombok.Getter;

import java.util.List;

@Getter
public class SearchQueries {
    private List<SearchRequest> request;
    private List<SearchRequest> nextPage;
}
