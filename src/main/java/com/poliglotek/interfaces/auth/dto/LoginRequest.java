package com.poliglotek.interfaces.auth.dto;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable
public record LoginRequest(String googleIdToken) {}
