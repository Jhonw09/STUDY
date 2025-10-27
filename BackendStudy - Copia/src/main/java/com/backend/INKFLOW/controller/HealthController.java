package com.backend.INKFLOW.controller;

import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@CrossOrigin(origins = {"https://inkflowfrontend.vercel.app", "http://localhost:5173"})
public class HealthController {
    
    @GetMapping("/")
    public Map<String, String> home() {
        return Map.of(
            "message", "INK FLOW Backend is running!",
            "status", "OK",
            "timestamp", java.time.LocalDateTime.now().toString()
        );
    }
    
    @GetMapping("/health")
    public Map<String, String> health() {
        return Map.of(
            "status", "OK",
            "service", "InkFlow Backend",
            "timestamp", java.time.LocalDateTime.now().toString()
        );
    }
}