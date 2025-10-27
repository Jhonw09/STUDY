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
@CrossOrigin(origins = {"https://studyfrontend.vercel.app", "http://localhost:5173"})
public class AuthController {
    
    @Autowired
    private ClienteService clienteService;
    
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
        String password = loginData.get("password");
        
        Optional<Cliente> cliente = clienteService.getUserByEmail(email);
        if (cliente.isPresent() && cliente.get().getPassword().equals(password)) {
            return ResponseEntity.ok(Map.of(
                "success", true,
                "user", Map.of(
                    "id", cliente.get().getId(),
                    "email", cliente.get().getEmail(),
                    "nome", cliente.get().getFullName()
                )
            ));
        }
        
        return ResponseEntity.badRequest().body(Map.of(
            "success", false,
            "message", "Email ou senha incorretos"
        ));
    }
}
