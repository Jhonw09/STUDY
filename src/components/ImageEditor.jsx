import { useState, useRef } from 'react'

const ImageEditor = ({ imageUrl, onSave, onCancel }) => {
  const [rotation, setRotation] = useState(0)
  const [scale, setScale] = useState(1)
  const [offsetX, setOffsetX] = useState(0)
  const [offsetY, setOffsetY] = useState(0)
  const canvasRef = useRef(null)

  const handleSave = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const img = new Image()
    
    img.onload = () => {
      canvas.width = 200
      canvas.height = 200
      
      ctx.clearRect(0, 0, 200, 200)
      ctx.save()
      ctx.translate(100, 100)
      ctx.rotate((rotation * Math.PI) / 180)
      
      const size = Math.min(img.width, img.height)
      const finalSize = size * scale
      
      ctx.drawImage(
        img,
        (img.width - size) / 2 + offsetX,
        (img.height - size) / 2 + offsetY,
        size, size,
        -100, -100,
        200, 200
      )
      ctx.restore()
      
      onSave(canvas.toDataURL())
    }
    img.src = imageUrl
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.9)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000
    }}>
      <div style={{
        backgroundColor: '#1a1a1a',
        padding: '2rem',
        borderRadius: '12px',
        maxWidth: '500px',
        width: '90%'
      }}>
        <h3 style={{ marginBottom: '1rem', color: 'white' }}>Editar Foto</h3>
        
        <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
          <div style={{
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '2px solid rgba(255,255,255,0.3)',
            position: 'relative',
            margin: '0 auto'
          }}>
            <img
              src={imageUrl}
              alt="Preview"
              style={{
                width: `${scale * 200}px`,
                height: `${scale * 200}px`,
                objectFit: 'cover',
                transform: `rotate(${rotation}deg) translate(${offsetX}px, ${offsetY}px)`,
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: `${-scale * 100}px`,
                marginLeft: `${-scale * 100}px`
              }}
            />
          </div>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'white', fontSize: '0.9rem' }}>
            Rotação: {rotation}°
          </label>
          <input
            type="range"
            min="-180"
            max="180"
            value={rotation}
            onChange={(e) => setRotation(Number(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'white', fontSize: '0.9rem' }}>
            Tamanho: {scale.toFixed(1)}x
          </label>
          <input
            type="range"
            min="0.8"
            max="2"
            step="0.1"
            value={scale}
            onChange={(e) => setScale(Number(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'white', fontSize: '0.9rem' }}>
            Mover Horizontal
          </label>
          <input
            type="range"
            min="-50"
            max="50"
            value={offsetX}
            onChange={(e) => setOffsetX(Number(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'white', fontSize: '0.9rem' }}>
            Mover Vertical
          </label>
          <input
            type="range"
            min="-50"
            max="50"
            value={offsetY}
            onChange={(e) => setOffsetY(Number(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>

        <canvas ref={canvasRef} style={{ display: 'none' }} />

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
          <button
            onClick={onCancel}
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
            onClick={handleSave}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: 'var(--accent-red)',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  )
}

export default ImageEditor