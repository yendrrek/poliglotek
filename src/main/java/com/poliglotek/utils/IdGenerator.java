package com.poliglotek.utils;

import jakarta.inject.Singleton;

import java.security.SecureRandom;

@Singleton
public class IdGenerator {

    private static final String BASE_CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    private static final int DEFAULT_ID_LENGTH = 10;
    private final SecureRandom secureRandom;

    public IdGenerator() {
        this.secureRandom = new SecureRandom();
    }

    public String generate() {
        return generate(DEFAULT_ID_LENGTH);
    }

    public String generate(int length) {
        StringBuilder id = new StringBuilder(DEFAULT_ID_LENGTH);
        for (int i = 0; i < length; i++) {
            int index = secureRandom.nextInt(BASE_CHARACTERS.length());
            id.append(BASE_CHARACTERS.charAt(index));
        }
        return id.toString();
    }
}
