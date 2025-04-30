package com.poliglotek.application.translation;

import com.poliglotek.domain.translation.UrlFound;

import java.util.List;

public interface GoogleSearchPortOut {

    List<UrlFound> fetchUrls(String query, String langCode, String countryCode);
}
