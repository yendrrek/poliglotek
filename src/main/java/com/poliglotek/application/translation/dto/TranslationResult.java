package com.poliglotek.application.translation.dto;

import com.poliglotek.domain.translation.entity.Translation;
import io.micronaut.serde.annotation.Serdeable;

import java.util.List;

@Serdeable
public record TranslationResult (List<Translation> pages, String warning) {}
