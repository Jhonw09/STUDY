import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Header.css'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState(null)
  const location = useLocation()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) setUser(JSON.parse(userData))
  }, [location])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (path) => location.pathname === path

  return (
    <header className={`modern-header ${isScrolled ? 'scrolled' : ''}`}>
      <nav className="nav-container">
        <Link to="/" className="brand">
          <span className="brand-icon">📚</span>
          <span className="brand-text">StudyConnect</span>
        </Link>

        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <li><Link to="/" className={isActive('/') ? 'active' : ''}>Início</Link></li>
          <li><Link to="/cursos" className={isActive('/cursos') ? 'active' : ''}>Cursos</Link></li>
          <li><Link to="/biblioteca" className={isActive('/biblioteca') ? 'active' : ''}>Biblioteca</Link></li>
          <li><Link to="/exercicios" className={isActive('/exercicios') ? 'active' : ''}>Exercícios</Link></li>
          <li><Link to="/sobre" className={isActive('/sobre') ? 'active' : ''}>Sobre</Link></li>
        </ul>

        <div className="nav-actions">
          {user ? (
            <Link to="/perfil" className="user-profile">
              <div className="avatar">
                {user.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt="Avatar" 
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                      borderRadius: '50%'
                    }}
                  />
                ) : (
                  user.nome?.[0] || 'U'
                )}
              </div>
            </Link>
          ) : (
            <Link to="/login" className="btn-login">Entrar</Link>
          )}
          <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Header
