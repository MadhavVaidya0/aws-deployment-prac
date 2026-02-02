package com.cabbuddy.cabbuddybackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@EnableCaching
@SpringBootApplication
public class CabbuddyBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(CabbuddyBackendApplication.class, args);
	}

}
