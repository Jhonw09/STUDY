package com.backend.Study.service;

import com.backend.Study.model.Cliente;
import com.backend.Study.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {
    
    @Autowired
    private ClienteRepository clienteRepository;
    
    public List<Cliente> getAllClientes() {
        return clienteRepository.findAll();
    }
    
    public Optional<Cliente> getClienteById(Long id) {
        return clienteRepository.findById(id);
    }
    
    public Cliente saveCliente(Cliente cliente) {
        return clienteRepository.save(cliente);
    }
    
    public boolean existsByUsername(String username) {
        return clienteRepository.existsByUsername(username);
    }
    
    public boolean existsByEmail(String email) {
        return clienteRepository.existsByEmail(email);
    }
    
    public void deleteCliente(Long id) {
        clienteRepository.deleteById(id);
    }
    
    public Optional<Cliente> getUserByEmail(String email) {
        return clienteRepository.findByEmail(email);
    }
}
