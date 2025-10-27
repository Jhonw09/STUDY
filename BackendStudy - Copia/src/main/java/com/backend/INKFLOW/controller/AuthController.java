package com.backend.INKFLOW.controller;

import com.backend.INKFLOW.model.Cliente;
import com.backend.INKFLOW.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    @Autowired
    private ClienteService clienteService;
    
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
        String password = loginData.get("password");
        
        // Login admin
        if ("admin@inkflow.com".equals(email) && "admin123".equals(password)) {
            return ResponseEntity.ok(Map.of(
                "success", true,
                "user", Map.of(
                    "id", 0,
                    "email", email,
                    "nome", "Administrador",
                    "isAdmin", true
                )
            ));
        }
        
        // Login cliente
        Optional<Cliente> cliente = clienteService.getUserByEmail(email);
        if (cliente.isPresent() && cliente.get().getPassword().equals(password)) {
            return ResponseEntity.ok(Map.of(
                "success", true,
                "user", Map.of(
                    "id", cliente.get().getId(),
                    "email", cliente.get().getEmail(),
                    "nome", cliente.get().getFullName(),
                    "isAdmin", false
                )
            ));
        }
        
        return ResponseEntity.badRequest().body(Map.of(
            "success", false,
            "message", "Email ou senha incorretos"
        ));
    }
}