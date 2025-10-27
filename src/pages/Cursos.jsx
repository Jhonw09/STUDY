import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Cursos.css'

const Cursos = () => {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState('todos')
  const [searchTerm, setSearchTerm] = useState('')

  const categories = [
    { id: 'todos', name: 'Todos', icon: '📚' },
    { id: 'matematica', name: 'Matemática', icon: '📐' },
    { id: 'portugues', name: 'Português', icon: '📖' },
    { id: 'ciencias', name: 'Ciências', icon: '🔬' },
    { id: 'programacao', name: 'Programação', icon: '💻' }
  ]

  const courses = [
    {
      id: 1,
      title: 'Matemática Básica',
      category: 'matematica',
      level: 'Iniciante',
      duration: '8 semanas',
      students: 1234,
      rating: 4.8,
      image: '📐',
      description: 'Fundamentos de matemática: operações, frações, equações',
      lessons: 45,
      instructor: 'Prof. Carlos Silva'
    },
    {
      id: 2,
      title: 'Álgebra Linear',
      category: 'matematica',
      level: 'Intermediário',
      duration: '10 semanas',
      students: 856,
      rating: 4.9,
      image: '🔢',
      description: 'Matrizes, vetores, sistemas lineares e transformações',
      lessons: 52,
      instructor: 'Prof. Ana Santos'
    },
    {
      id: 3,
      title: 'Gramática Completa',
      category: 'portugues',
      level: 'Todos os níveis',
      duration: '12 semanas',
      students: 2341,
      rating: 4.7,
      image: '📖',
      description: 'Domine a gramática portuguesa do básico ao avançado',
      lessons: 60,
      instructor: 'Prof. Maria Oliveira'
    },
    {
      id: 4,
      title: 'Redação e Interpretação',
      category: 'portugues',
      level: 'Intermediário',
      duration: '6 semanas',
      students: 1567,
      rating: 4.6,
      image: '✍️',
      description: 'Técnicas de redação e interpretação de textos',
      lessons: 38,
      instructor: 'Prof. João Costa'
    },
    {
      id: 5,
      title: 'Física Mecânica',
      category: 'ciencias',
      level: 'Intermediário',
      duration: '10 semanas',
      students: 945,
      rating: 4.8,
      image: '⚛️',
      description: 'Cinemática, dinâmica e leis de Newton',
      lessons: 48,
      instructor: 'Prof. Pedro Alves'
    },
    {
      id: 6,
      title: 'Química Orgânica',
      category: 'ciencias',
      level: 'Avançado',
      duration: '14 semanas',
      students: 723,
      rating: 4.9,
      image: '🧪',
      description: 'Compostos orgânicos, reações e mecanismos',
      lessons: 65,
      instructor: 'Prof. Laura Mendes'
    },
    {
      id: 7,
      title: 'Python para Iniciantes',
      category: 'programacao',
      level: 'Iniciante',
      duration: '8 semanas',
      students: 3456,
      rating: 4.9,
      image: '🐍',
      description: 'Aprenda Python do zero com projetos práticos',
      lessons: 42,
      instructor: 'Prof. Ricardo Tech'
    },
    {
      id: 8,
      title: 'JavaScript Moderno',
      category: 'programacao',
      level: 'Intermediário',
      duration: '10 semanas',
      students: 2789,
      rating: 4.8,
      image: '💻',
      description: 'ES6+, async/await, APIs e projetos reais',
      lessons: 55,
      instructor: 'Prof. Fernanda Dev'
    }
  ]

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'todos' || course.category === selectedCategory
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="cursos-page">
      <div className="cursos-hero">
        <div className="container">
          <h1 className="page-title">Explore Nossos Cursos</h1>
          <p className="page-subtitle">
            Aprenda no seu ritmo com cursos de alta qualidade e 100% gratuitos
          </p>
          
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Buscar cursos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="container">
        <div className="categories-filter">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <span className="cat-icon">{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        <div className="courses-grid">
          {filteredCourses.map(course => (
            <div key={course.id} className="course-card">
              <div className="course-image">
                <span className="course-emoji">{course.image}</span>
                <span className="course-level">{course.level}</span>
              </div>
              
              <div className="course-content">
                <h3 className="course-title">{course.title}</h3>
                <p className="course-description">{course.description}</p>
                
                <div className="course-instructor">
                  <span className="instructor-icon">👨🏫</span>
                  <span>{course.instructor}</span>
                </div>

                <div className="course-meta">
                  <div className="meta-item">
                    <span className="meta-icon">⭐</span>
                    <span>{course.rating}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-icon">👥</span>
                    <span>{course.students.toLocaleString()}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-icon">📚</span>
                    <span>{course.lessons} aulas</span>
                  </div>
                </div>

                <div className="course-footer">
                  <span className="course-duration">⏱️ {course.duration}</span>
                  <button 
                    className="btn-enroll"
                    onClick={() => navigate(`/curso/${course.id}`)}
                  >
                    Começar Curso
                    <span className="arrow">→</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="no-results">
            <span className="no-results-icon">🔍</span>
            <h3>Nenhum curso encontrado</h3>
            <p>Tente ajustar seus filtros ou busca</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cursos
