package com.example.demoproject.exceptions;

public class InvalidStateException extends RuntimeException{

    public InvalidStateException(String message) {
        super(message);
    }
}
