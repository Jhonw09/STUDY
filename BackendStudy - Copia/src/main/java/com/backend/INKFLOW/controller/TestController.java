package com.backend.INKFLOW.controller;

import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class TestController {

    @GetMapping("/test")
    public Map<String, String> test() {
        return Map.of("message", "Backend conectado com sucesso!", "status", "OK");
    }

    @PostMapping("/test")
    public Map<String, Object> testPost(@RequestBody Map<String, Object> data) {
        return Map.of(
            "message", "Dados recebidos com sucesso!",
            "receivedData", data,
            "status", "OK"
        );
    }
    
    @PostMapping("/test-cliente")
    public Map<String, Object> testCliente(@RequestBody Map<String, Object> data) {
        try {
            return Map.of(
                "message", "Teste de cliente OK!",
                "receivedData", data,
                "status", "SUCCESS"
            );
        } catch (Exception e) {
            return Map.of(
                "message", "Erro: " + e.getMessage(),
                "status", "ERROR"
            );
        }
    }
}