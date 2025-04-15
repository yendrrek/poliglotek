package com.poliglotek.model.loginresponse;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable
public record LoginResponse(String customToken) {}
