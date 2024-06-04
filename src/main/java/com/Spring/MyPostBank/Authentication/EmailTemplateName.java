package com.Spring.MyPostBank.Authentication;

import lombok.Getter;

@Getter
public enum EmailTemplateName {

    ACTIVATE_ACCOUNT("ACTIVATE_ACCOUNT"),
    PASSWORD_RESET("PASSWORD_RESET");

    private final String name;

    EmailTemplateName(String name) {
        this.name = name;
    }

}
