package com.example.DemoProject.exceptions;

public class InvalidStateException extends RuntimeException{

    public InvalidStateException(String message) {
        super(message);
    }
}
