import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './Home.css'

const Home = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const features = [
    {
      icon: '🎓',
      title: 'Cursos Completos',
      description: 'Aprenda com conteúdo estruturado e de alta qualidade'
    },
    {
      icon: '📚',
      title: 'Biblioteca Digital',
      description: 'Acesso ilimitado a materiais de estudo e referências'
    },
    {
      icon: '✍️',
      title: 'Exercícios Práticos',
      description: 'Teste seus conhecimentos com exercícios interativos'
    },
    {
      icon: '🏆',
      title: 'Certificados',
      description: 'Conquiste certificados ao completar os cursos'
    }
  ]

  const subjects = [
    { name: 'Matemática', icon: '📐', color: '#6366f1' },
    { name: 'Português', icon: '📖', color: '#8b5cf6' },
    { name: 'Física', icon: '⚛️', color: '#ec4899' },
    { name: 'Química', icon: '🧪', color: '#f59e0b' },
    { name: 'Biologia', icon: '🧬', color: '#10b981' },
    { name: 'História', icon: '🏛️', color: '#3b82f6' }
  ]

  return (
    <div className="home-modern">
      {/* Hero Section */}
      <section className={`hero-section ${isVisible ? 'visible' : ''}`}>
        <div className="hero-background">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
        </div>
        
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-icon">✨</span>
            <span>Plataforma 100% Gratuita</span>
          </div>
          
          <h1 className="hero-title">
            Transforme seu futuro através da
            <span className="gradient-text"> educação</span>
          </h1>
          
          <p className="hero-subtitle">
            Acesse cursos de qualidade, materiais exclusivos e exercícios práticos.
            Tudo que você precisa para alcançar seus objetivos acadêmicos.
          </p>
          
          <div className="hero-actions">
            <Link to="/cursos" className="btn-primary">
              Começar Agora
              <span className="btn-arrow">→</span>
            </Link>
            <Link to="/sobre" className="btn-secondary">
              Saiba Mais
            </Link>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Cursos</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">10k+</div>
              <div className="stat-label">Estudantes</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">95%</div>
              <div className="stat-label">Satisfação</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Por que escolher o StudyConnect?</h2>
            <p className="section-subtitle">
              Uma plataforma completa para sua jornada de aprendizado
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <section className="subjects-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Explore nossas matérias</h2>
            <p className="section-subtitle">
              Conteúdo completo e atualizado para todas as disciplinas
            </p>
          </div>

          <div className="subjects-grid">
            {subjects.map((subject, index) => (
              <Link 
                key={index} 
                to="/cursos" 
                className="subject-card"
                style={{ '--card-color': subject.color }}
              >
                <div className="subject-icon">{subject.icon}</div>
                <h3 className="subject-name">{subject.name}</h3>
                <div className="subject-arrow">→</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Pronto para começar sua jornada?</h2>
          <p className="cta-subtitle">
            Junte-se a milhares de estudantes que já estão transformando suas vidas
          </p>
          <Link to="/cursos" className="btn-cta">
            Explorar Cursos Gratuitos
            <span className="btn-arrow">→</span>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
