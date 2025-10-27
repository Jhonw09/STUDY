package com.backend.Study.controller;

import com.backend.Study.model.Cliente;
import com.backend.Study.service.ClienteService;
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
        try {
            String email = loginData.get("email");
            String password = loginData.get("password");
            
            if (email == null || password == null || email.trim().isEmpty() || password.trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "Email e senha são obrigatórios"
                ));
            }
            
            Optional<Cliente> cliente = clienteService.getUserByEmail(email.trim());
            if (cliente.isPresent() && cliente.get().getPassword().equals(password)) {
                return ResponseEntity.ok(Map.of(
                    "success", true,
                    "user", Map.of(
                        "id", cliente.get().getId(),
                        "email", cliente.get().getEmail(),
                        "nome", cliente.get().getFullName() != null ? cliente.get().getFullName() : cliente.get().getUsername()
                    )
                ));
            }
            
            return ResponseEntity.status(401).body(Map.of(
                "success", false,
                "message", "Email ou senha incorretos"
            ));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                "success", false,
                "message", "Erro interno do servidor"
            ));
        }
    }
    
    @GetMapping("/debug/users")
    public ResponseEntity<Map<String, Object>> debugUsers() {
        try {
            var usuarios = clienteService.getAllClientes();
            return ResponseEntity.ok(Map.of(
                "success", true,
                "count", usuarios.size(),
                "users", usuarios.stream().map(u -> Map.of(
                    "id", u.getId(),
                    "email", u.getEmail(),
                    "username", u.getUsername()
                )).toList()
            ));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                "success", false,
                "message", "Erro ao buscar usuários: " + e.getMessage()
            ));
        }
    }
}
