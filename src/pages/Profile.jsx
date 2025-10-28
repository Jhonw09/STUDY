import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { clienteService } from '../services/studyApi'
import { showAlert } from '../components/CustomAlert'
import ImageEditor from '../components/ImageEditor'

const Profile = () => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [editing, setEditing] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [formData, setFormData] = useState({})
  const [avatarUrl, setAvatarUrl] = useState('')
  const [showImageEditor, setShowImageEditor] = useState(false)
  const [tempImageUrl, setTempImageUrl] = useState('')
  const navigate = useNavigate()
  
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  
  useEffect(() => {
    setFormData({
      fullName: user.nome || '',
      email: user.email || '',
      telefone: user.telefone || ''
    })
    setAvatarUrl(user.avatar || '')
  }, [])

  const handleUpdateProfile = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      let clienteId = user.id
      
      if (!clienteId) {
        const response = await clienteService.getAll()
        const cliente = response.data.find(c => c.email === user.email)
        if (!cliente) {
          showAlert('Usuário não encontrado', 'error')
          setLoading(false)
          return
        }
        clienteId = cliente.id
      }

      const updateData = {
        fullName: formData.fullName,
        telefone: formData.telefone
      }
      await clienteService.update(clienteId, updateData)
      
      const updatedUser = {
        ...user,
        nome: formData.fullName,
        email: formData.email,
        telefone: formData.telefone,
        avatar: avatarUrl
      }
      localStorage.setItem('user', JSON.stringify(updatedUser))
      
      showAlert('Perfil atualizado com sucesso!', 'success')
      setEditing(false)
    } catch (error) {
      showAlert(`Erro: ${error.response?.data?.message || 'Falha ao atualizar'}`, 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteAccount = async () => {
    setLoading(true)
    try {
      let clienteId = user.id
      
      if (!clienteId) {
        const response = await clienteService.getAll()
        const cliente = response.data.find(c => c.email === user.email)
        if (!cliente) {
          showAlert('Usuário não encontrado', 'error')
          setLoading(false)
          return
        }
        clienteId = cliente.id
      }

      await clienteService.delete(clienteId)
      localStorage.clear()
      showAlert('Conta deletada com sucesso!', 'success')
      window.location.href = '/'
    } catch (error) {
      showAlert(`Erro: ${error.response?.status} - ${error.response?.data?.message || error.message || 'Falha ao deletar'}`, 'error')
    } finally {
      setLoading(false)
      setShowDeleteConfirm(false)
    }
  }

  if (!user.email) {
    return (
      <div className="section">
        <div className="container">
          <h2>Acesso negado</h2>
          <p>Faça login para acessar seu perfil.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="profile">
      <section className="section">
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '6rem' }}>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '2rem', 
            marginBottom: '2rem',
            paddingBottom: '2rem',
            borderBottom: '1px solid rgba(255,255,255,0.1)'
          }}>
            <div style={{ position: 'relative' }}>
              <div style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: avatarUrl ? `url(${avatarUrl})` : 'linear-gradient(45deg, var(--accent-red), #ff6b6b)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3rem',
                color: 'white',
                fontWeight: 'bold'
              }}>
                {!avatarUrl && (user.nome?.charAt(0)?.toUpperCase() || 'U')}
              </div>
              {editing && (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0]
                      if (file) {
                        const reader = new FileReader()
                        reader.onload = (e) => {
                          setTempImageUrl(e.target.result)
                          setShowImageEditor(true)
                        }
                        reader.readAsDataURL(file)
                      }
                    }}
                    style={{ display: 'none' }}
                    id="avatar-upload"
                  />
                  <label
                    htmlFor="avatar-upload"
                    style={{
                      position: 'absolute',
                      bottom: '5px',
                      right: '5px',
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--accent-red)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      fontSize: '14px',
                      color: 'white'
                    }}
                  >
                    📷
                  </label>
                </>
              )}
            </div>
            
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <h2 style={{ margin: 0, fontSize: '1.8rem' }}>{user.nome}</h2>
                {!editing && (
                  <>
                    <button 
                      onClick={() => setEditing(true)}
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: 'transparent',
                        border: '1px solid rgba(255,255,255,0.3)',
                        borderRadius: '6px',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '0.9rem'
                      }}
                    >
                      Editar perfil
                    </button>
                    <div style={{ position: 'relative' }}>
                      <button 
                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                        style={{
                          padding: '0.5rem',
                          backgroundColor: 'transparent',
                          border: '1px solid rgba(255,255,255,0.3)',
                          borderRadius: '6px',
                          color: 'white',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        ⚙️
                      </button>
                      <div style={{
                        position: 'absolute',
                        top: '100%',
                        right: 0,
                        background: '#1a1a1a',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '8px',
                        padding: '0.5rem 0',
                        minWidth: '120px',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
                        opacity: isUserMenuOpen ? 1 : 0,
                        visibility: isUserMenuOpen ? 'visible' : 'hidden',
                        transform: isUserMenuOpen ? 'translateY(0)' : 'translateY(-10px)',
                        transition: 'all 0.3s ease',
                        zIndex: 1001
                      }}>
                        <button 
                          onClick={() => {
                            setIsUserMenuOpen(false)
                            localStorage.removeItem('user')
                            navigate('/login')
                          }}
                          style={{
                            display: 'block',
                            width: '100%',
                            padding: '0.5rem 1rem',
                            color: 'white',
                            background: 'none',
                            border: 'none',
                            textAlign: 'left',
                            cursor: 'pointer',
                            fontSize: '0.9rem'
                          }}
                        >
                          Sair
                        </button>
                        <button 
                          onClick={() => {
                            setIsUserMenuOpen(false)
                            setShowDeleteConfirm(true)
                          }}
                          style={{
                            display: 'block',
                            width: '100%',
                            padding: '0.5rem 1rem',
                            color: 'var(--accent-red)',
                            background: 'none',
                            border: 'none',
                            textAlign: 'left',
                            cursor: 'pointer',
                            fontSize: '0.9rem'
                          }}
                        >
                          Deletar conta
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', gap: '2rem', marginBottom: '0.5rem' }}>
                  <span><strong>5</strong> cursos</span>
                  <span><strong>23</strong> exercícios</span>
                  <span><strong>1</strong> ano estudando</span>
                </div>
              </div>
              
              <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' }}>
                <div>{user.email}</div>
                <div>{user.telefone || 'Telefone não informado'}</div>
              </div>
            </div>
          </div>
          
          {editing && (
            <div style={{ 
              backgroundColor: 'rgba(255,255,255,0.05)', 
              padding: '2rem', 
              borderRadius: '12px',
              marginBottom: '2rem'
            }}>
              <h3 style={{ marginBottom: '1.5rem' }}>Editar Perfil</h3>
              <form onSubmit={handleUpdateProfile}>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Nome:</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      color: 'white'
                    }}
                  />
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Telefone:</label>
                  <input
                    type="tel"
                    value={formData.telefone}
                    onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      color: 'white'
                    }}
                  />
                </div>
                
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button 
                    type="submit"
                    disabled={loading}
                    style={{
                      padding: '0.75rem 1.5rem',
                      backgroundColor: 'var(--accent-red)',
                      border: 'none',
                      borderRadius: '8px',
                      color: 'white',
                      cursor: 'pointer'
                    }}
                  >
                    {loading ? 'Salvando...' : 'Salvar'}
                  </button>
                  <button 
                    type="button"
                    onClick={() => {
                      setEditing(false)
                      setFormData({
                        fullName: user.nome || '',
                        email: user.email || '',
                        telefone: user.telefone || ''
                      })
                      setAvatarUrl(user.avatar || '')
                    }}
                    style={{
                      padding: '0.75rem 1.5rem',
                      backgroundColor: 'transparent',
                      border: '1px solid rgba(255,255,255,0.3)',
                      borderRadius: '8px',
                      color: 'white',
                      cursor: 'pointer'
                    }}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          )}
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '1.5rem',
            marginBottom: '3rem'
          }}>
            <div style={{
              backgroundColor: 'rgba(255,255,255,0.05)',
              padding: '1.5rem',
              borderRadius: '12px'
            }}>
              <h4 style={{ marginBottom: '1rem', color: 'var(--accent-red)' }}>Meus Cursos</h4>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>Visualize e gerencie seus cursos</p>
              <button style={{
                marginTop: '1rem',
                padding: '0.5rem 1rem',
                backgroundColor: 'transparent',
                border: '1px solid var(--accent-red)',
                borderRadius: '6px',
                color: 'var(--accent-red)',
                cursor: 'pointer'
              }}>
                Ver cursos
              </button>
            </div>
            
            <div style={{
              backgroundColor: 'rgba(255,255,255,0.05)',
              padding: '1.5rem',
              borderRadius: '12px'
            }}>
              <h4 style={{ marginBottom: '1rem', color: 'var(--accent-red)' }}>Meu Progresso</h4>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>Acompanhe seu desempenho nos estudos</p>
              <button style={{
                marginTop: '1rem',
                padding: '0.5rem 1rem',
                backgroundColor: 'transparent',
                border: '1px solid var(--accent-red)',
                borderRadius: '6px',
                color: 'var(--accent-red)',
                cursor: 'pointer'
              }}>
                Ver progresso
              </button>
            </div>
          </div>

          {showDeleteConfirm && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000
            }}>
              <div style={{
                backgroundColor: '#1a1a1a',
                padding: '2rem',
                borderRadius: '12px',
                maxWidth: '400px',
                width: '90%',
                border: '1px solid var(--accent-red)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
              }}>
                <h3 style={{ color: 'var(--accent-red)', marginBottom: '1rem' }}>Deletar Conta</h3>
                <p style={{ marginBottom: '1.5rem', color: 'rgba(255,255,255,0.8)' }}>
                  Esta ação é irreversível. Todos os seus dados e progresso serão perdidos.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                  <button 
                    onClick={() => setShowDeleteConfirm(false)}
                    style={{
                      padding: '0.75rem 1.5rem',
                      backgroundColor: 'transparent',
                      border: '1px solid rgba(255,255,255,0.3)',
                      borderRadius: '8px',
                      color: 'white',
                      cursor: 'pointer'
                    }}
                  >
                    Cancelar
                  </button>
                  <button 
                    onClick={handleDeleteAccount}
                    disabled={loading}
                    style={{
                      padding: '0.75rem 1.5rem',
                      backgroundColor: 'var(--accent-red)',
                      border: 'none',
                      borderRadius: '8px',
                      color: 'white',
                      cursor: 'pointer'
                    }}
                  >
                    {loading ? 'Deletando...' : 'Sim, Deletar'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {showImageEditor && (
            <ImageEditor
              imageUrl={tempImageUrl}
              onSave={(editedImage) => {
                setAvatarUrl(editedImage)
                setShowImageEditor(false)
                setTempImageUrl('')
              }}
              onCancel={() => {
                setShowImageEditor(false)
                setTempImageUrl('')
              }}
            />
          )}
        </div>
      </section>
    </div>
  )
}

export default Profile