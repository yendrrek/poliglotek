package com.poliglotek.model.googlesearch;

import io.micronaut.core.annotation.Introspected;
import io.micronaut.serde.annotation.Serdeable;

@Introspected
@Serdeable.Deserializable
public class SearchInformation {

    private double searchTime;
    private String formattedSearchTime;
    private String totalResults;
    private String formattedTotalResults;

    public SearchInformation(double searchTime,
                             String formattedSearchTime,
                             String totalResults,
                             String formattedTotalResults) {
        this.searchTime = searchTime;
        this.formattedSearchTime = formattedSearchTime;
        this.totalResults = totalResults;
        this.formattedTotalResults = formattedTotalResults;
    }

    public double getSearchTime() {
        return searchTime;
    }

    public void setSearchTime(double searchTime) {
        this.searchTime = searchTime;
    }

    public String getFormattedSearchTime() {
        return formattedSearchTime;
    }

    public void setFormattedSearchTime(String formattedSearchTime) {
        this.formattedSearchTime = formattedSearchTime;
    }

    public String getTotalResults() {
        return totalResults;
    }

    public void setTotalResults(String totalResults) {
        this.totalResults = totalResults;
    }

    public String getFormattedTotalResults() {
        return formattedTotalResults;
    }

    public void setFormattedTotalResults(String formattedTotalResults) {
        this.formattedTotalResults = formattedTotalResults;
    }
}
