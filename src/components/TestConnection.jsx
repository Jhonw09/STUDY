import { useState } from 'react';
import { connectionService } from '../services/connectionService';
import { clienteService } from '../services/studyApi';

function TestConnection() {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTestComplete = async () => {
    setLoading(true);
    try {
      const status = await connectionService.checkStatus();
      setResult(`${status.backend && status.database ? '✅' : '❌'} ${status.message}`);
    } catch (error) {
      setResult(`❌ Erro: ${error.message}`);
    }
    setLoading(false);
  };

  const handleTestBackend = async () => {
    setLoading(true);
    try {
      const response = await connectionService.testHealth();
      setResult(`✅ Backend: ${response.data.message}`);
    } catch (error) {
      setResult(`❌ Backend offline: ${error.message}`);
    }
    setLoading(false);
  };

  const handleTestDatabase = async () => {
    setLoading(true);
    try {
      const response = await clienteService.getAll();
      setResult(`✅ Banco de dados: ${response.data.length} clientes encontrados`);
    } catch (error) {
      setResult(`❌ Erro no banco: ${error.message}`);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '20px' }}>
      <h3>Teste de Conexão Backend</h3>
      
      <div style={{ marginBottom: '10px' }}>
        <button onClick={handleTestComplete} disabled={loading}>
          Teste Completo
        </button>
        <button onClick={handleTestBackend} disabled={loading} style={{ marginLeft: '10px' }}>
          Testar Backend
        </button>
        <button onClick={handleTestDatabase} disabled={loading} style={{ marginLeft: '10px' }}>
          Testar Banco
        </button>
      </div>

      {loading && <p>Carregando...</p>}
      {result && <p>{result}</p>}
    </div>
  );
}

export default TestConnection;