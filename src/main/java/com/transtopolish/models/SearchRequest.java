package com.transtopolish.models;

import lombok.Getter;

@Getter
public class SearchRequest {
    private String title;
    private String totalResults;
    private String searchTerms;
    private int count;
    private int startIndex;
    private String language;
    private String inputEncoding;
    private String outputEncoding;
    private String safe;
    private String cx;
    private String cr;
}
