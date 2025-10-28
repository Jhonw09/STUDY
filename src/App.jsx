import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'
import CustomAlert from './components/CustomAlert'
import Home from './pages/Home'
import About from './pages/About'
import Cursos from './pages/Cursos'
import CursoDetalhes from './pages/CursoDetalhes'
import Biblioteca from './pages/Biblioteca'
import Exercicios from './pages/Exercicios'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Profile from './pages/Profile'
import TestConnection from './components/TestConnection'
import './styles/premium-effects.css'
import './styles/responsive-improvements.css'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function AppContent() {
  const location = useLocation()
  const isLoginPage = location.pathname === '/login'

  return (
    <div className="App">
      <ScrollToTop />
      {!isLoginPage && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/cursos" element={<Cursos />} />
          <Route path="/curso/:id" element={<CursoDetalhes />} />
          <Route path="/biblioteca" element={<Biblioteca />} />
          <Route path="/exercicios" element={<Exercicios />} />
          <Route path="/contato" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/perfil" element={<Profile />} />
        </Routes>
      </main>
      {!isLoginPage && <Footer />}
      {!isLoginPage && <Chatbot />}
      <CustomAlert />
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App