package com.poliglotek.domain.translation.entity;

import com.poliglotek.domain.translation.model.TranslatedPage;

public record Translation(String id, TranslatedPage body, String url) {}
