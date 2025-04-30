package com.poliglotek.domain.translation;

public class AllPagesCharacterLimitExceededException extends RuntimeException {

    public AllPagesCharacterLimitExceededException(String message) {
        super(message);
    }
}
