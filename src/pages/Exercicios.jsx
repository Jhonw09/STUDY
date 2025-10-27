import { useState } from 'react'
import './Exercicios.css'

const Exercicios = () => {
  const [selectedSubject, setSelectedSubject] = useState('matematica')
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  const [userAnswers, setUserAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)

  const exercises = {
    matematica: [
      {
        id: 1,
        question: 'Qual é o resultado de 2³ + 5² ?',
        options: ['33', '31', '29', '35'],
        correct: 0,
        explanation: '2³ = 8 e 5² = 25, portanto 8 + 25 = 33'
      },
      {
        id: 2,
        question: 'Resolva a equação: 3x + 12 = 27',
        options: ['x = 3', 'x = 5', 'x = 7', 'x = 9'],
        correct: 1,
        explanation: '3x = 27 - 12 → 3x = 15 → x = 5'
      },
      {
        id: 3,
        question: 'Qual é a raiz quadrada de 144?',
        options: ['10', '11', '12', '13'],
        correct: 2,
        explanation: '√144 = 12, pois 12 × 12 = 144'
      }
    ],
    portugues: [
      {
        id: 4,
        question: 'Qual é o plural de "cidadão"?',
        options: ['cidadões', 'cidadãos', 'cidadães', 'cidadans'],
        correct: 1,
        explanation: 'O plural correto é "cidadãos"'
      },
      {
        id: 5,
        question: 'Identifique a figura de linguagem: "Aquele rapaz é um leão"',
        options: ['Metáfora', 'Metonímia', 'Hipérbole', 'Eufemismo'],
        correct: 0,
        explanation: 'É uma metáfora, pois compara o rapaz a um leão sem usar conectivo'
      }
    ],
    fisica: [
      {
        id: 6,
        question: 'Qual é a unidade de medida da força no SI?',
        options: ['Joule', 'Newton', 'Watt', 'Pascal'],
        correct: 1,
        explanation: 'A unidade de força no Sistema Internacional é o Newton (N)'
      },
      {
        id: 7,
        question: 'A velocidade da luz no vácuo é aproximadamente:',
        options: ['300.000 km/s', '150.000 km/s', '450.000 km/s', '600.000 km/s'],
        correct: 0,
        explanation: 'A velocidade da luz no vácuo é aproximadamente 300.000 km/s'
      }
    ]
  }

  const subjects = [
    { id: 'matematica', name: 'Matemática', icon: '📐', color: '#6366f1' },
    { id: 'portugues', name: 'Português', icon: '📖', color: '#8b5cf6' },
    { id: 'fisica', name: 'Física', icon: '⚛️', color: '#ec4899' }
  ]

  const currentExercises = exercises[selectedSubject] || []

  const handleAnswer = (questionId, answerIndex) => {
    setUserAnswers({ ...userAnswers, [questionId]: answerIndex })
  }

  const checkAnswers = () => {
    setShowResults(true)
  }

  const resetQuiz = () => {
    setUserAnswers({})
    setShowResults(false)
    setSelectedQuestion(null)
  }

  const getScore = () => {
    let correct = 0
    currentExercises.forEach(ex => {
      if (userAnswers[ex.id] === ex.correct) correct++
    })
    return { correct, total: currentExercises.length }
  }

  return (
    <div className="exercicios-page">
      <div className="exercicios-hero">
        <div className="container">
          <h1 className="page-title">Exercícios Práticos</h1>
          <p className="page-subtitle">
            Teste seus conhecimentos e acompanhe seu progresso
          </p>
        </div>
      </div>

      <div className="container">
        <div className="subjects-tabs">
          {subjects.map(subject => (
            <button
              key={subject.id}
              className={`subject-tab ${selectedSubject === subject.id ? 'active' : ''}`}
              onClick={() => {
                setSelectedSubject(subject.id)
                resetQuiz()
              }}
              style={{ '--subject-color': subject.color }}
            >
              <span className="tab-icon">{subject.icon}</span>
              <span className="tab-name">{subject.name}</span>
              <span className="tab-count">{exercises[subject.id]?.length || 0} questões</span>
            </button>
          ))}
        </div>

        {!showResults ? (
          <div className="questions-container">
            {currentExercises.map((exercise, index) => (
              <div key={exercise.id} className="question-card">
                <div className="question-header">
                  <span className="question-number">Questão {index + 1}</span>
                  {userAnswers[exercise.id] !== undefined && (
                    <span className="answered-badge">✓ Respondida</span>
                  )}
                </div>
                
                <h3 className="question-text">{exercise.question}</h3>
                
                <div className="options-list">
                  {exercise.options.map((option, optIndex) => (
                    <button
                      key={optIndex}
                      className={`option-btn ${userAnswers[exercise.id] === optIndex ? 'selected' : ''}`}
                      onClick={() => handleAnswer(exercise.id, optIndex)}
                    >
                      <span className="option-letter">{String.fromCharCode(65 + optIndex)}</span>
                      <span className="option-text">{option}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <div className="submit-section">
              <button 
                className="btn-submit"
                onClick={checkAnswers}
                disabled={Object.keys(userAnswers).length !== currentExercises.length}
              >
                Verificar Respostas
              </button>
              {Object.keys(userAnswers).length !== currentExercises.length && (
                <p className="submit-hint">
                  Responda todas as questões para verificar
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="results-container">
            <div className="results-header">
              <div className="score-circle">
                <div className="score-number">
                  {Math.round((getScore().correct / getScore().total) * 100)}%
                </div>
                <div className="score-label">Acertos</div>
              </div>
              <div className="score-details">
                <h2>Resultado do Quiz</h2>
                <p>Você acertou {getScore().correct} de {getScore().total} questões</p>
              </div>
            </div>

            <div className="answers-review">
              {currentExercises.map((exercise, index) => {
                const isCorrect = userAnswers[exercise.id] === exercise.correct
                return (
                  <div key={exercise.id} className={`review-card ${isCorrect ? 'correct' : 'incorrect'}`}>
                    <div className="review-header">
                      <span className="review-number">Questão {index + 1}</span>
                      <span className={`review-badge ${isCorrect ? 'correct' : 'incorrect'}`}>
                        {isCorrect ? '✓ Correto' : '✗ Incorreto'}
                      </span>
                    </div>
                    
                    <h3 className="review-question">{exercise.question}</h3>
                    
                    <div className="review-answer">
                      <p className="your-answer">
                        <strong>Sua resposta:</strong> {exercise.options[userAnswers[exercise.id]]}
                      </p>
                      {!isCorrect && (
                        <p className="correct-answer">
                          <strong>Resposta correta:</strong> {exercise.options[exercise.correct]}
                        </p>
                      )}
                      <p className="explanation">
                        <strong>Explicação:</strong> {exercise.explanation}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            <button className="btn-retry" onClick={resetQuiz}>
              Tentar Novamente
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Exercicios
