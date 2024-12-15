package com.poliglotek.model.translationresponse;

import io.micronaut.core.annotation.Introspected;
import io.micronaut.serde.annotation.Serdeable;
import lombok.Data;

@Introspected
@Serdeable.Serializable
@Data
public class TranslationResponse<T> {

    private boolean success;
    private String error;
    private String warning;
    private T data;

    public static <T> TranslationResponse<T> success(T data) {
        return success(data, null);
    }

    public static <T> TranslationResponse<T> success(T data, String warning) {
        TranslationResponse<T> response = new TranslationResponse<>();
        response.success = true;
        response.warning = warning;
        response.data = data;
        return response;
    }

    public static <T> TranslationResponse<T> error(String error) {
        TranslationResponse<T> response = new TranslationResponse<>();
        response.success = false;
        response.error = error;
        return response;
    }
}
