package com.Spring.MyPostBank.Exception;

public class InsufficientFunds {

    public static class InsufficientBalanceException extends Exception {
        public InsufficientBalanceException() {
            super("Insufficient balance to process payment.");
        }
    }

}
