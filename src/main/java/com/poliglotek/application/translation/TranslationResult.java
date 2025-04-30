package com.poliglotek.application.translation;

import com.poliglotek.domain.translation.Translation;
import io.micronaut.serde.annotation.Serdeable;

import java.util.List;

@Serdeable
public record TranslationResult (List<Translation> pages, String warning) {}
