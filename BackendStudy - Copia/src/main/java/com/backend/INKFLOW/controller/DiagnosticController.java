package com.backend.INKFLOW.controller;

import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@CrossOrigin(origins = {"https://inkflowfrontend.vercel.app", "http://localhost:5173"})
public class DiagnosticController {

    @GetMapping("/status")
    public Map<String, String> getStatus() {
        return Map.of(
            "status", "ONLINE",
            "message", "InkFlow Backend está funcionando",
            "timestamp", java.time.LocalDateTime.now().toString()
        );
    }

    @GetMapping("/api/status")
    public Map<String, String> getApiStatus() {
        return Map.of(
            "status", "ONLINE",
            "message", "API InkFlow está funcionando",
            "timestamp", java.time.LocalDateTime.now().toString()
        );
    }
}