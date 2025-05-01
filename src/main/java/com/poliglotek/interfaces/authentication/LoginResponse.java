package com.poliglotek.interfaces.authentication;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable
public record LoginResponse(String customToken) {}
