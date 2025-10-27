import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './CursoDetalhes.css'

const CursoDetalhes = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [selectedLesson, setSelectedLesson] = useState(0)
  const [completedLessons, setCompletedLessons] = useState([])

  const courses = {
    1: {
      title: 'Matemática Básica',
      instructor: 'Prof. Carlos Silva',
      description: 'Domine os fundamentos da matemática com exercícios práticos',
      modules: [
        {
          title: 'Módulo 1: Operações Básicas',
          lessons: [
            {
              title: 'Adição e Subtração',
              duration: '15 min',
              type: 'video',
              content: `
                <h2>Adição e Subtração</h2>
                <p>A adição e subtração são operações fundamentais da matemática.</p>
                
                <h3>Adição (+)</h3>
                <p>A adição é a operação de juntar quantidades. Exemplo:</p>
                <div class="example">5 + 3 = 8</div>
                <p>Lemos: "cinco mais três é igual a oito"</p>
                
                <h3>Propriedades da Adição</h3>
                <ul>
                  <li><strong>Comutativa:</strong> a + b = b + a (Ex: 3 + 5 = 5 + 3)</li>
                  <li><strong>Associativa:</strong> (a + b) + c = a + (b + c)</li>
                  <li><strong>Elemento neutro:</strong> a + 0 = a</li>
                </ul>
                
                <h3>Subtração (-)</h3>
                <p>A subtração é a operação inversa da adição. Exemplo:</p>
                <div class="example">8 - 3 = 5</div>
                <p>Lemos: "oito menos três é igual a cinco"</p>
                
                <h3>Exercícios Práticos</h3>
                <div class="exercise">
                  <p>1) 12 + 8 = ?</p>
                  <p>2) 25 - 9 = ?</p>
                  <p>3) 7 + 15 + 3 = ?</p>
                </div>
              `
            },
            {
              title: 'Multiplicação e Divisão',
              duration: '20 min',
              type: 'video',
              content: `
                <h2>Multiplicação e Divisão</h2>
                
                <h3>Multiplicação (×)</h3>
                <p>A multiplicação é uma adição repetida. Exemplo:</p>
                <div class="example">4 × 3 = 4 + 4 + 4 = 12</div>
                
                <h3>Tabuada do 5</h3>
                <div class="table">
                  5 × 1 = 5<br>
                  5 × 2 = 10<br>
                  5 × 3 = 15<br>
                  5 × 4 = 20<br>
                  5 × 5 = 25<br>
                  5 × 6 = 30<br>
                  5 × 7 = 35<br>
                  5 × 8 = 40<br>
                  5 × 9 = 45<br>
                  5 × 10 = 50
                </div>
                
                <h3>Divisão (÷)</h3>
                <p>A divisão é a operação inversa da multiplicação:</p>
                <div class="example">12 ÷ 3 = 4</div>
                <p>Porque 4 × 3 = 12</p>
                
                <h3>Exercícios</h3>
                <div class="exercise">
                  <p>1) 6 × 7 = ?</p>
                  <p>2) 48 ÷ 6 = ?</p>
                  <p>3) 9 × 8 = ?</p>
                </div>
              `
            }
          ]
        },
        {
          title: 'Módulo 2: Frações',
          lessons: [
            {
              title: 'Introdução às Frações',
              duration: '18 min',
              type: 'video',
              content: `
                <h2>Introdução às Frações</h2>
                <p>Uma fração representa uma parte de um todo.</p>
                
                <h3>Estrutura de uma Fração</h3>
                <div class="fraction-example">
                  <div class="numerator">3</div>
                  <div class="line">―</div>
                  <div class="denominator">4</div>
                </div>
                <p><strong>Numerador (3):</strong> Quantas partes pegamos</p>
                <p><strong>Denominador (4):</strong> Em quantas partes dividimos o todo</p>
                
                <h3>Tipos de Frações</h3>
                <ul>
                  <li><strong>Própria:</strong> numerador < denominador (Ex: 2/5)</li>
                  <li><strong>Imprópria:</strong> numerador ≥ denominador (Ex: 7/4)</li>
                  <li><strong>Aparente:</strong> numerador é múltiplo do denominador (Ex: 8/4 = 2)</li>
                </ul>
                
                <h3>Simplificação</h3>
                <p>Dividir numerador e denominador pelo mesmo número:</p>
                <div class="example">
                  6/8 = 3/4 (dividimos por 2)
                </div>
              `
            },
            {
              title: 'Operações com Frações',
              duration: '25 min',
              type: 'video',
              content: `
                <h2>Operações com Frações</h2>
                
                <h3>Adição e Subtração</h3>
                <p>Com denominadores iguais:</p>
                <div class="example">
                  2/5 + 1/5 = 3/5
                </div>
                
                <p>Com denominadores diferentes (usar MMC):</p>
                <div class="example">
                  1/2 + 1/3 = 3/6 + 2/6 = 5/6
                </div>
                
                <h3>Multiplicação</h3>
                <p>Multiplica numerador com numerador e denominador com denominador:</p>
                <div class="example">
                  2/3 × 3/4 = 6/12 = 1/2
                </div>
                
                <h3>Divisão</h3>
                <p>Multiplica pela fração inversa:</p>
                <div class="example">
                  2/3 ÷ 4/5 = 2/3 × 5/4 = 10/12 = 5/6
                </div>
              `
            }
          ]
        }
      ]
    },
    7: {
      title: 'Python para Iniciantes',
      instructor: 'Prof. Ricardo Tech',
      description: 'Aprenda Python do zero com projetos práticos',
      modules: [
        {
          title: 'Módulo 1: Fundamentos',
          lessons: [
            {
              title: 'Introdução ao Python',
              duration: '12 min',
              type: 'video',
              content: `
                <h2>Bem-vindo ao Python!</h2>
                <p>Python é uma linguagem de programação poderosa e fácil de aprender.</p>
                
                <h3>Por que Python?</h3>
                <ul>
                  <li>Sintaxe simples e legível</li>
                  <li>Versatilidade (web, dados, IA, automação)</li>
                  <li>Grande comunidade</li>
                  <li>Muitas bibliotecas</li>
                </ul>
                
                <h3>Seu Primeiro Programa</h3>
                <div class="code-block">
print("Olá, Mundo!")
                </div>
                
                <h3>Variáveis</h3>
                <div class="code-block">
nome = "João"
idade = 25
altura = 1.75

print(f"Meu nome é {nome}")
print(f"Tenho {idade} anos")
                </div>
              `
            },
            {
              title: 'Tipos de Dados',
              duration: '18 min',
              type: 'video',
              content: `
                <h2>Tipos de Dados em Python</h2>
                
                <h3>Números</h3>
                <div class="code-block">
# Inteiros
x = 10
y = -5

# Decimais (float)
preco = 19.99
temperatura = -3.5
                </div>
                
                <h3>Strings (Texto)</h3>
                <div class="code-block">
nome = "Maria"
sobrenome = 'Silva'
frase = """Texto
em múltiplas
linhas"""

# Concatenação
nome_completo = nome + " " + sobrenome
                </div>
                
                <h3>Booleanos</h3>
                <div class="code-block">
verdadeiro = True
falso = False

maior_idade = idade >= 18
                </div>
                
                <h3>Listas</h3>
                <div class="code-block">
frutas = ["maçã", "banana", "laranja"]
numeros = [1, 2, 3, 4, 5]

print(frutas[0])  # maçã
frutas.append("uva")
                </div>
              `
            }
          ]
        }
      ]
    }
  }

  const course = courses[id] || courses[1]
  const allLessons = course.modules.flatMap((module, moduleIndex) =>
    module.lessons.map((lesson, lessonIndex) => ({
      ...lesson,
      moduleIndex,
      lessonIndex,
      moduleName: module.title
    }))
  )

  const currentLesson = allLessons[selectedLesson]

  const markAsComplete = () => {
    if (!completedLessons.includes(selectedLesson)) {
      setCompletedLessons([...completedLessons, selectedLesson])
    }
    if (selectedLesson < allLessons.length - 1) {
      setSelectedLesson(selectedLesson + 1)
    }
  }

  const progress = (completedLessons.length / allLessons.length) * 100

  return (
    <div className="curso-detalhes">
      <div className="curso-header">
        <div className="container">
          <button className="btn-back" onClick={() => navigate('/cursos')}>
            ← Voltar
          </button>
          <h1>{course.title}</h1>
          <p className="instructor">👨🏫 {course.instructor}</p>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="progress-text">{Math.round(progress)}% concluído</p>
        </div>
      </div>

      <div className="curso-content">
        <div className="sidebar">
          <h3>Conteúdo do Curso</h3>
          {course.modules.map((module, moduleIndex) => (
            <div key={moduleIndex} className="module-section">
              <h4 className="module-title">{module.title}</h4>
              {module.lessons.map((lesson, lessonIndex) => {
                const globalIndex = allLessons.findIndex(
                  l => l.moduleIndex === moduleIndex && l.lessonIndex === lessonIndex
                )
                const isCompleted = completedLessons.includes(globalIndex)
                const isActive = selectedLesson === globalIndex

                return (
                  <button
                    key={lessonIndex}
                    className={`lesson-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                    onClick={() => setSelectedLesson(globalIndex)}
                  >
                    <span className="lesson-status">
                      {isCompleted ? '✓' : '○'}
                    </span>
                    <div className="lesson-info">
                      <span className="lesson-name">{lesson.title}</span>
                      <span className="lesson-duration">{lesson.duration}</span>
                    </div>
                  </button>
                )
              })}
            </div>
          ))}
        </div>

        <div className="main-content">
          <div className="video-player">
            <div className="video-placeholder">
              <span className="play-icon">▶️</span>
              <p>Vídeo: {currentLesson.title}</p>
            </div>
          </div>

          <div className="lesson-content">
            <div dangerouslySetInnerHTML={{ __html: currentLesson.content }} />
          </div>

          <div className="lesson-actions">
            {selectedLesson > 0 && (
              <button className="btn-prev" onClick={() => setSelectedLesson(selectedLesson - 1)}>
                ← Aula Anterior
              </button>
            )}
            <button className="btn-complete" onClick={markAsComplete}>
              {selectedLesson < allLessons.length - 1 ? 'Concluir e Próxima →' : 'Concluir Curso ✓'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CursoDetalhes
