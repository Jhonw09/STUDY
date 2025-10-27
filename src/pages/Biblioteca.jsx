import { useState } from 'react'
import './Biblioteca.css'

const Biblioteca = () => {
  const [selectedSubject, setSelectedSubject] = useState('todos')
  const [selectedType, setSelectedType] = useState('todos')

  const materials = [
    {
      id: 1,
      title: 'Cálculo Diferencial e Integral',
      subject: 'matematica',
      type: 'pdf',
      pages: 450,
      size: '12.5 MB',
      downloads: 3421,
      rating: 4.9,
      author: 'Prof. James Stewart',
      description: 'Livro completo sobre cálculo com exercícios resolvidos'
    },
    {
      id: 2,
      title: 'Física para Cientistas',
      subject: 'fisica',
      type: 'pdf',
      pages: 680,
      size: '25.3 MB',
      downloads: 2156,
      rating: 4.8,
      author: 'Prof. Paul Tipler',
      description: 'Física clássica e moderna com aplicações práticas'
    },
    {
      id: 3,
      title: 'Química Orgânica Avançada',
      subject: 'quimica',
      type: 'pdf',
      pages: 520,
      size: '18.7 MB',
      downloads: 1834,
      rating: 4.7,
      author: 'Prof. John McMurry',
      description: 'Mecanismos de reação e síntese orgânica'
    },
    {
      id: 4,
      title: 'Videoaulas de Álgebra Linear',
      subject: 'matematica',
      type: 'video',
      duration: '24 horas',
      size: '8.2 GB',
      downloads: 5678,
      rating: 4.9,
      author: 'Prof. Gilbert Strang',
      description: 'Curso completo do MIT sobre álgebra linear'
    },
    {
      id: 5,
      title: 'Gramática Normativa',
      subject: 'portugues',
      type: 'pdf',
      pages: 380,
      size: '9.8 MB',
      downloads: 4521,
      rating: 4.6,
      author: 'Prof. Evanildo Bechara',
      description: 'Referência completa da língua portuguesa'
    },
    {
      id: 6,
      title: 'Exercícios de Termodinâmica',
      subject: 'fisica',
      type: 'exercicios',
      questions: 250,
      size: '3.2 MB',
      downloads: 2890,
      rating: 4.8,
      author: 'Prof. Halliday & Resnick',
      description: 'Lista completa com gabarito comentado'
    },
    {
      id: 7,
      title: 'Biologia Molecular',
      subject: 'biologia',
      type: 'pdf',
      pages: 590,
      size: '22.1 MB',
      downloads: 3156,
      rating: 4.9,
      author: 'Prof. Bruce Alberts',
      description: 'Fundamentos de biologia celular e molecular'
    },
    {
      id: 8,
      title: 'História do Brasil',
      subject: 'historia',
      type: 'video',
      duration: '18 horas',
      size: '6.5 GB',
      downloads: 4234,
      rating: 4.7,
      author: 'Prof. Boris Fausto',
      description: 'Do descobrimento aos dias atuais'
    }
  ]

  const subjects = [
    { id: 'todos', name: 'Todos', icon: '📚' },
    { id: 'matematica', name: 'Matemática', icon: '📐' },
    { id: 'fisica', name: 'Física', icon: '⚛️' },
    { id: 'quimica', name: 'Química', icon: '🧪' },
    { id: 'biologia', name: 'Biologia', icon: '🧬' },
    { id: 'portugues', name: 'Português', icon: '📖' },
    { id: 'historia', name: 'História', icon: '🏛️' }
  ]

  const types = [
    { id: 'todos', name: 'Todos', icon: '📑' },
    { id: 'pdf', name: 'PDFs', icon: '📄' },
    { id: 'video', name: 'Vídeos', icon: '🎥' },
    { id: 'exercicios', name: 'Exercícios', icon: '✍️' }
  ]

  const filteredMaterials = materials.filter(material => {
    const matchesSubject = selectedSubject === 'todos' || material.subject === selectedSubject
    const matchesType = selectedType === 'todos' || material.type === selectedType
    return matchesSubject && matchesType
  })

  const getTypeIcon = (type) => {
    switch(type) {
      case 'pdf': return '📄'
      case 'video': return '🎥'
      case 'exercicios': return '✍️'
      default: return '📑'
    }
  }

  const getTypeColor = (type) => {
    switch(type) {
      case 'pdf': return '#ef4444'
      case 'video': return '#8b5cf6'
      case 'exercicios': return '#10b981'
      default: return '#6366f1'
    }
  }

  return (
    <div className="biblioteca-page">
      <div className="biblioteca-hero">
        <div className="container">
          <h1 className="page-title">Biblioteca Digital</h1>
          <p className="page-subtitle">
            Acesse milhares de materiais de estudo gratuitos
          </p>
          
          <div className="stats-row">
            <div className="stat-box">
              <span className="stat-icon">📚</span>
              <div>
                <div className="stat-number">2.500+</div>
                <div className="stat-label">Materiais</div>
              </div>
            </div>
            <div className="stat-box">
              <span className="stat-icon">⬇️</span>
              <div>
                <div className="stat-number">50k+</div>
                <div className="stat-label">Downloads</div>
              </div>
            </div>
            <div className="stat-box">
              <span className="stat-icon">⭐</span>
              <div>
                <div className="stat-number">4.8</div>
                <div className="stat-label">Avaliação</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="filters-section">
          <div className="filter-group">
            <h3 className="filter-title">Matéria</h3>
            <div className="filter-buttons">
              {subjects.map(subject => (
                <button
                  key={subject.id}
                  className={`filter-btn ${selectedSubject === subject.id ? 'active' : ''}`}
                  onClick={() => setSelectedSubject(subject.id)}
                >
                  <span>{subject.icon}</span>
                  <span>{subject.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h3 className="filter-title">Tipo de Material</h3>
            <div className="filter-buttons">
              {types.map(type => (
                <button
                  key={type.id}
                  className={`filter-btn ${selectedType === type.id ? 'active' : ''}`}
                  onClick={() => setSelectedType(type.id)}
                >
                  <span>{type.icon}</span>
                  <span>{type.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="materials-grid">
          {filteredMaterials.map(material => (
            <div key={material.id} className="material-card">
              <div className="material-header">
                <span 
                  className="material-type-badge"
                  style={{ background: getTypeColor(material.type) }}
                >
                  {getTypeIcon(material.type)} {material.type.toUpperCase()}
                </span>
                <div className="material-rating">
                  <span>⭐</span>
                  <span>{material.rating}</span>
                </div>
              </div>

              <h3 className="material-title">{material.title}</h3>
              <p className="material-author">Por {material.author}</p>
              <p className="material-description">{material.description}</p>

              <div className="material-info">
                {material.pages && (
                  <div className="info-item">
                    <span className="info-icon">📄</span>
                    <span>{material.pages} páginas</span>
                  </div>
                )}
                {material.duration && (
                  <div className="info-item">
                    <span className="info-icon">⏱️</span>
                    <span>{material.duration}</span>
                  </div>
                )}
                {material.questions && (
                  <div className="info-item">
                    <span className="info-icon">❓</span>
                    <span>{material.questions} questões</span>
                  </div>
                )}
                <div className="info-item">
                  <span className="info-icon">💾</span>
                  <span>{material.size}</span>
                </div>
              </div>

              <div className="material-footer">
                <span className="downloads-count">
                  ⬇️ {material.downloads.toLocaleString()} downloads
                </span>
                <button className="btn-download">
                  Baixar
                  <span className="download-icon">⬇️</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Biblioteca
