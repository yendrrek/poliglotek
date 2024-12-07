package com.poliglotek.model.error;

import io.micronaut.core.annotation.Introspected;
import io.micronaut.serde.annotation.Serdeable;
import lombok.Data;

@Introspected
@Serdeable.Serializable
@Data
public class Response<T> {

    private boolean success;
    private String error;
    private String warning;
    private T data;

    public static <T> Response<T> success(T data) {
        return success(data, null);
    }

    public static <T> Response<T> success(T data, String warning) {
        Response<T> response = new Response<>();
        response.success = true;
        response.warning = warning;
        response.data = data;
        return response;
    }

    public static <T> Response<T> error(String error) {
        Response<T> response = new Response<>();
        response.success = false;
        response.error = error;
        return response;
    }
}
