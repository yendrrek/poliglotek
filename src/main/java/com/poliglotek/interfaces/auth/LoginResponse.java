package com.poliglotek.interfaces.auth;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable
public record LoginResponse(String customToken) {}
