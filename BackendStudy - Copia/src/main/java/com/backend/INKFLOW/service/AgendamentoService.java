package com.backend.INKFLOW.service;

import com.backend.INKFLOW.model.Agendamento;
import com.backend.INKFLOW.model.Cliente;
import com.backend.INKFLOW.repository.AgendamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AgendamentoService {
    
    @Autowired
    private AgendamentoRepository agendamentoRepository;
    
    public List<Agendamento> getAllAgendamentos() {
        return agendamentoRepository.findAllByOrderByDataHoraAsc();
    }
    
    public Optional<Agendamento> getAgendamentoById(Long id) {
        return agendamentoRepository.findById(id);
    }
    
    public List<Agendamento> getAgendamentosByCliente(Cliente cliente) {
        return agendamentoRepository.findByCliente(cliente);
    }
    
    public List<Agendamento> getAgendamentosByStatus(String status) {
        return agendamentoRepository.findByStatus(status);
    }
    
    public List<Agendamento> getAgendamentosByPeriodo(LocalDateTime inicio, LocalDateTime fim) {
        return agendamentoRepository.findByDataHoraBetween(inicio, fim);
    }
    
    public Agendamento saveAgendamento(Agendamento agendamento) {
        return agendamentoRepository.save(agendamento);
    }
    
    public void deleteAgendamento(Long id) {
        agendamentoRepository.deleteById(id);
    }
}