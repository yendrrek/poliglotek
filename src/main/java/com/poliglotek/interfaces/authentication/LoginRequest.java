package com.poliglotek.interfaces.authentication;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable
public record LoginRequest(String googleIdToken) {}
