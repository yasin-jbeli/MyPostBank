package com.Spring.MyPostBank.Config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.servers.Server;

@OpenAPIDefinition(
        info = @Info(
                contact = @Contact(
                        name = "Yasin",
                        email = "yasinjb002@gmail.com"
                ),
                description = "OpenAPI Documentation for MyPostBank",
                title = "OpenAPI specification - Yasin",
                version = "1.0",
                license = @License(
                        name = "License"
                ),

                termsOfService = "Terms of Service"
        ),

        servers = {
                @Server(
                        description = "Local ENV",
                        url = "http://localhost:8080/mypostbank"
                ),

                @Server(
                        description = "PROV ENV",
                        url = "https://yasin"
                )
        },

        security = {
                @SecurityRequirement(
                        name = "bearerAuth"
                )
        }

)
@SecurityScheme(
        name = "bearerAuth",
        description = "JWT auth",
        scheme = "bearer",
        type = SecuritySchemeType.HTTP,
        bearerFormat = "JWT",
        in = SecuritySchemeIn.HEADER
)
public class OpenApiConfig {
}