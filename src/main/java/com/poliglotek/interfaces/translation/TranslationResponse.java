package com.poliglotek.interfaces.translation;

import com.poliglotek.domain.translation.Translation;
import io.micronaut.serde.annotation.Serdeable;

import java.util.List;

@Serdeable
public class TranslationResponse {

    private final boolean success;
    private final String error;
    private final String warning;
    private final List<Translation> data;

    public TranslationResponse(boolean success, String error, String warning, List<Translation> data) {
        this.success = success;
        this.error = error;
        this.warning = warning;
        this.data = data;
    }

    public boolean isSuccess() {
        return success;
    }

    public String getError() {
        return error;
    }

    public String getWarning() {
        return warning;
    }

    public List<Translation> getData() {
        return data;
    }
}
