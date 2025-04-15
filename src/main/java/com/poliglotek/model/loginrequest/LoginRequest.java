package com.poliglotek.model.loginrequest;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable
public record LoginRequest(String googleIdToken) {}
