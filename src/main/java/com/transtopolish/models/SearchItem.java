package com.transtopolish.models;

import lombok.Getter;

@Getter
public class SearchItem {
    private String kind;
    private String title;
    private String htmlTitle;
    private String link;
    private String displayLink;
    private String snippet;
    private String htmlSnippet;
    private String formattedUrl;
    private String htmlFormattedUrl;
    private Pagemap pagemap;
}
