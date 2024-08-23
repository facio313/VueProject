package com.mieum.Stree;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class StreeApplication {

    public static void main(String[] args) {
        SpringApplication.run(StreeApplication.class, args);
    }

    @RestController
    class HelloController {
        @GetMapping("/api/hello")
        public String hello() {
            return "Hello, Vue!";
        }
    }

}
