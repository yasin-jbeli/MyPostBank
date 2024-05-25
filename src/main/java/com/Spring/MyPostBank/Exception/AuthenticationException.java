package com.Spring.MyPostBank.Exception;

import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class AuthenticationException {

    public static class InvalidTokenException extends IllegalArgumentException {
        public InvalidTokenException(String message) {
            super(message);
        }
    }

    public static class TokenExpiredException extends RuntimeException {
        public TokenExpiredException(String message) {
            super(message);
        }
    }

    public static class UserNotFoundException extends UsernameNotFoundException {
        public UserNotFoundException(String message) {
            super(message);
        }

    }

}
