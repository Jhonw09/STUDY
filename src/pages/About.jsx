import './About.css'

const About = () => {
  const team = [
    {
      name: 'Dr. Carlos Silva',
      role: 'Diretor Acadêmico',
      image: '👨‍🏫',
      bio: '15 anos de experiência em educação'
    },
    {
      name: 'Dra. Ana Santos',
      role: 'Coordenadora de Conteúdo',
      image: '👩‍💼',
      bio: 'Especialista em metodologias ativas'
    },
    {
      name: 'Prof. João Costa',
      role: 'Desenvolvedor de Cursos',
      image: '👨‍💻',
      bio: 'Criador de +100 cursos online'
    },
    {
      name: 'Profa. Maria Oliveira',
      role: 'Designer Instrucional',
      image: '👩‍🎨',
      bio: 'Especialista em experiência do aluno'
    }
  ]

  const values = [
    {
      icon: '🎯',
      title: 'Missão',
      description: 'Democratizar o acesso à educação de qualidade, oferecendo conteúdo gratuito e acessível para todos os estudantes brasileiros.'
    },
    {
      icon: '👁️',
      title: 'Visão',
      description: 'Ser a principal plataforma de educação gratuita do Brasil, transformando vidas através do conhecimento.'
    },
    {
      icon: '💎',
      title: 'Valores',
      description: 'Excelência, acessibilidade, inovação e compromisso com o desenvolvimento educacional de cada estudante.'
    }
  ]

  const achievements = [
    { number: '50k+', label: 'Estudantes Ativos' },
    { number: '500+', label: 'Cursos Disponíveis' },
    { number: '2.5k+', label: 'Materiais de Estudo' },
    { number: '95%', label: 'Taxa de Satisfação' }
  ]

  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="container">
          <h1 className="page-title">Sobre o StudyConnect</h1>
          <p className="page-subtitle">
            Transformando vidas através da educação gratuita e de qualidade
          </p>
        </div>
      </div>

      <div className="container">
        <section className="story-section">
          <div className="story-content">
            <h2 className="section-title">Nossa História</h2>
            <div className="story-text">
              <p>
                O StudyConnect nasceu em 2020 com uma missão clara: democratizar o acesso à educação de qualidade no Brasil. Fundada por educadores apaixonados, nossa plataforma surgiu da necessidade de oferecer conteúdo educacional gratuito e de alto nível para todos os estudantes.
              </p>
              <p>
                Começamos com apenas 10 cursos e hoje oferecemos mais de 500 cursos completos, 2.500+ materiais de estudo e uma comunidade vibrante de mais de 50 mil estudantes ativos. Nossa jornada é guiada pela crença de que a educação é um direito fundamental e deve estar acessível a todos.
              </p>
              <p>
                Trabalhamos com professores qualificados, especialistas em suas áreas e designers instrucionais para criar experiências de aprendizado envolventes e eficazes. Cada curso é cuidadosamente desenvolvido para garantir que você tenha a melhor experiência educacional possível.
              </p>
            </div>
          </div>
        </section>

        <section className="values-section">
          <h2 className="section-title">Nossos Pilares</h2>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">{value.icon}</div>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-description">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="achievements-section">
          <h2 className="section-title">Nossos Números</h2>
          <div className="achievements-grid">
            {achievements.map((achievement, index) => (
              <div key={index} className="achievement-card">
                <div className="achievement-number">{achievement.number}</div>
                <div className="achievement-label">{achievement.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="team-section">
          <h2 className="section-title">Nossa Equipe</h2>
          <p className="section-subtitle">
            Conheça os profissionais dedicados que tornam tudo isso possível
          </p>
          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-card">
                <div className="member-avatar">{member.image}</div>
                <h3 className="member-name">{member.name}</h3>
                <p className="member-role">{member.role}</p>
                <p className="member-bio">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="cta-about">
          <div className="cta-content">
            <h2>Faça Parte da Nossa Comunidade</h2>
            <p>Junte-se a milhares de estudantes que já estão transformando suas vidas</p>
            <button className="btn-join">Começar Agora →</button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default About
