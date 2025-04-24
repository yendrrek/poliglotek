package com.poliglotek.application.auth.dto;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable
public record LoginResponse(String customToken) {}
