import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="modern-footer">
      <div className="footer-content">
        <div className="footer-grid">
          <div className="footer-section">
            <div className="footer-brand">
              <span className="brand-icon">📚</span>
              <span className="brand-text">StudyConnect</span>
            </div>
            <p className="footer-description">
              Democratizando o acesso à educação de qualidade. Aprenda no seu ritmo, conquiste seus objetivos.
            </p>
            <div className="social-links">
              <a href="#" className="social-link">📘</a>
              <a href="#" className="social-link">📸</a>
              <a href="#" className="social-link">🐦</a>
              <a href="#" className="social-link">💼</a>
            </div>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Plataforma</h3>
            <ul className="footer-links">
              <li><Link to="/cursos">Cursos</Link></li>
              <li><Link to="/biblioteca">Biblioteca</Link></li>
              <li><Link to="/exercicios">Exercícios</Link></li>
              <li><Link to="/sobre">Sobre Nós</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Recursos</h3>
            <ul className="footer-links">
              <li><a href="#">Blog</a></li>
              <li><a href="#">Comunidade</a></li>
              <li><a href="#">Ajuda</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Legal</h3>
            <ul className="footer-links">
              <li><a href="#">Termos de Uso</a></li>
              <li><a href="#">Privacidade</a></li>
              <li><a href="#">Cookies</a></li>
              <li><Link to="/contato">Contato</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 StudyConnect. Todos os direitos reservados.</p>
          <p className="footer-tagline">Feito com 💜 para estudantes brasileiros</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
