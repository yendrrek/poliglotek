package com.poliglotek.model.translationresponse;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable
public class TranslationResponse<T> {

    private final boolean success;
    private final String error;
    private final String warning;
    private final T data;

    public TranslationResponse(boolean success, String error, String warning, T data) {
        this.success = success;
        this.error = error;
        this.warning = warning;
        this.data = data;
    }

    public static <T> TranslationResponse<T> success(T data) {
        return success(data, null);
    }

    public static <T> TranslationResponse<T> success(T data, String warning) {
        return new TranslationResponse<>(true, null, warning, data);
    }

    public static <T> TranslationResponse<T> error(String error) {
        return new TranslationResponse<>(false, error, null, null);
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

    public T getData() {
        return data;
    }
}
