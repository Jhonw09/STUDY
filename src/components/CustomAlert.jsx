import { useState, useEffect } from 'react'

let showAlert = null

const CustomAlert = () => {
  const [alerts, setAlerts] = useState([])

  useEffect(() => {
    showAlert = (message, type = 'info') => {
      const id = Date.now()
      setAlerts(prev => [...prev, { id, message, type }])
      setTimeout(() => {
        setAlerts(prev => prev.filter(alert => alert.id !== id))
      }, 4000)
    }
  }, [])

  const getIcon = (type) => {
    switch(type) {
      case 'success': return '✅'
      case 'error': return '❌'
      case 'warning': return '⚠️'
      default: return 'ℹ️'
    }
  }

  const getColor = (type) => {
    switch(type) {
      case 'success': return '#10b981'
      case 'error': return '#ef4444'
      case 'warning': return '#f59e0b'
      default: return '#6366f1'
    }
  }

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    }}>
      {alerts.map(alert => (
        <div
          key={alert.id}
          style={{
            background: 'linear-gradient(135deg, rgba(15, 15, 25, 0.98), rgba(25, 25, 35, 0.95))',
            backdropFilter: 'blur(20px) saturate(180%)',
            border: `1px solid ${getColor(alert.type)}40`,
            borderLeft: `4px solid ${getColor(alert.type)}`,
            borderRadius: '16px',
            padding: '18px 24px',
            color: 'white',
            fontSize: '14px',
            fontWeight: '500',
            maxWidth: '380px',
            minWidth: '320px',
            boxShadow: `0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05), 0 8px 32px ${getColor(alert.type)}20`,
            transform: 'translateX(0) scale(1)',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '14px',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: `linear-gradient(90deg, transparent, ${getColor(alert.type)}60, transparent)`
          }} />
          
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${getColor(alert.type)}20, ${getColor(alert.type)}10)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
            flexShrink: 0,
            border: `1px solid ${getColor(alert.type)}30`
          }}>
            {getIcon(alert.type)}
          </div>
          
          <div style={{ flex: 1, paddingTop: '2px' }}>
            <div style={{
              fontSize: '13px',
              fontWeight: '600',
              color: getColor(alert.type),
              marginBottom: '4px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              {alert.type === 'success' ? 'Sucesso' : 
               alert.type === 'error' ? 'Erro' :
               alert.type === 'warning' ? 'Aviso' : 'Informação'}
            </div>
            <div style={{
              fontSize: '14px',
              lineHeight: '1.4',
              color: 'rgba(255,255,255,0.9)'
            }}>
              {alert.message}
            </div>
          </div>
          
          <button
            onClick={() => setAlerts(prev => prev.filter(a => a.id !== alert.id))}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              borderRadius: '6px',
              color: 'rgba(255,255,255,0.7)',
              cursor: 'pointer',
              fontSize: '14px',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              transition: 'all 0.2s ease',
              marginTop: '2px'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255,255,255,0.2)'
              e.target.style.color = 'white'
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255,255,255,0.1)'
              e.target.style.color = 'rgba(255,255,255,0.7)'
            }}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}

export { showAlert }
export default CustomAlert