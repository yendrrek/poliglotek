package com.poliglotek.interfaces.auth;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable
public record LoginRequest(String googleIdToken) {}
