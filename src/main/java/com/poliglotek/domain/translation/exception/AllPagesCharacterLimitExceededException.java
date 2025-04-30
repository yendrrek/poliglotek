package com.poliglotek.domain.translation.exception;

public class AllPagesCharacterLimitExceededException extends RuntimeException {

    public AllPagesCharacterLimitExceededException(String message) {
        super(message);
    }
}
