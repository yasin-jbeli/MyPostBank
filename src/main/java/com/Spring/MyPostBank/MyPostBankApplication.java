package com.Spring.MyPostBank;

import com.Spring.MyPostBank.Services.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;

import java.util.TimeZone;


@SpringBootApplication
@EnableAsync
@EnableJpaAuditing(auditorAwareRef = "auditorAware")
public class MyPostBankApplication {

	public static void main(String[] args) {
		SpringApplication.run(MyPostBankApplication.class, args);
	}

}
