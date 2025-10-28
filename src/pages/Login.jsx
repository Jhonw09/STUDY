import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { clienteService } from '../services/studyApi'
import { showAlert } from '../components/CustomAlert'
import './Login.css'

const Login = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    email: '',
    senha: '',
    nome: '',
    telefone: ''
  })
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (isLogin && formData.email === 'admin@inkflow.com' && formData.senha === 'admin123') {
      localStorage.setItem('user', JSON.stringify({ 
        email: formData.email, 
        nome: 'Administrador',
        isAdmin: true 
      }))
      showAlert('Login de administrador realizado!', 'success')
      navigate('/')
      return
    }
    
    if (isLogin && formData.email === 'teste@teste.com' && formData.senha === '123') {
      localStorage.setItem('user', JSON.stringify({ 
        id: 999,
        email: formData.email, 
        nome: 'Usuário Teste',
        isAdmin: false 
      }))
      showAlert('Login de teste realizado!', 'success')
      navigate('/')
      return
    }
    
    try {
      if (isLogin) {
        const response = await clienteService.getAll()
        const cliente = response.data.find(c => 
          c.email === formData.email && c.password === formData.senha
        )
        
        if (cliente) {
          localStorage.setItem('user', JSON.stringify({
            id: cliente.id,
            email: cliente.email,
            nome: cliente.fullName || cliente.username,
            isAdmin: false
          }))
          showAlert('Login realizado com sucesso!', 'success')
          navigate('/')
        } else {
          showAlert('Email ou senha incorretos!', 'error')
        }
      } else {
        if (!formData.nome || !formData.email || !formData.senha) {
          showAlert('Por favor, preencha todos os campos obrigatórios.', 'warning')
          return
        }
        
        const novoCliente = {
          username: formData.email.split('@')[0],
          email: formData.email,
          password: formData.senha,
          fullName: formData.nome,
          telefone: formData.telefone
        }
        
        await clienteService.create(novoCliente)
        showAlert('Cadastro realizado com sucesso! Faça login para continuar.', 'success')
        setIsLogin(true)
        setFormData({ email: '', senha: '', nome: '', telefone: '' })
      }
    } catch (error) {
      if (isLogin) {
        showAlert('Erro ao fazer login. Verifique suas credenciais.', 'error')
      } else {
        showAlert(error.response?.status === 400 || error.response?.status === 409 
          ? 'Email já cadastrado!' 
          : 'Erro ao processar solicitação. Tente novamente.', 'error')
      }
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="login-page">
      <div className="login-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      <Link to="/" className="back-link">
        <span>←</span> Voltar para home
      </Link>

      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1 className="login-title">
              <span className="gradient-text">StudyConnect</span>
            </h1>
            <p className="login-subtitle">
              {isLogin ? 'Bem-vindo de volta!' : 'Crie sua conta gratuitamente'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {!isLogin && (
              <div className="form-group">
                <label>Nome completo</label>
                <input
                  type="text"
                  name="nome"
                  placeholder="Digite seu nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required={!isLogin}
                />
              </div>
            )}

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Senha</label>
              <input
                type="password"
                name="senha"
                placeholder="••••••••"
                value={formData.senha}
                onChange={handleChange}
                required
              />
            </div>

            {!isLogin && (
              <div className="form-group">
                <label>Telefone (opcional)</label>
                <input
                  type="tel"
                  name="telefone"
                  placeholder="(00) 00000-0000"
                  value={formData.telefone}
                  onChange={handleChange}
                />
              </div>
            )}

            <button type="submit" className="btn-submit">
              {isLogin ? 'Entrar' : 'Criar conta'}
              <span className="btn-arrow">→</span>
            </button>
          </form>

          <div className="login-footer">
            <p>
              {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}
              {' '}
              <button 
                type="button"
                onClick={() => setIsLogin(!isLogin)} 
                className="toggle-btn"
              >
                {isLogin ? 'Cadastre-se' : 'Faça login'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
