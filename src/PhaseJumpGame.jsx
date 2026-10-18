import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

export default function PhaseJumpGame({ onClose }) {
  const mountRef = useRef(null)
  const [score, setScore] = useState(0)
  const [cubesCollected, setCubesCollected] = useState(0)
  const [distance, setDistance] = useState(0)
  const [gameState, setGameState] = useState('playing') // 'playing' | 'gameover' | 'paused'
  const [highScore, setHighScore] = useState(() => {
    try {
      return parseInt(localStorage.getItem('phasejump_highscore') || '0', 10)
    } catch {
      return 0
    }
  })

  // Keep refs for game loop to avoid stale closures
  const stateRef = useRef({
    gameState: 'playing',
    score: 0,
    cubes: 0,
    distance: 0,
    playerX: 0,
    targetPlayerX: 0,
    speed: 0.8,
  })

  // Restart function
  const restartGameRef = useRef(null)

  useEffect(() => {
    stateRef.current.gameState = gameState
  }, [gameState])

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    const width = container.clientWidth || 800
    const height = container.clientHeight || 500

    // Scene, Camera, Renderer
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x05070e, 0.018)

    const camera = new THREE.PerspectiveCamera(65, width / height, 0.1, 1000)
    camera.position.set(0, 3.2, 7)
    camera.lookAt(0, 1.2, -10)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x05070e, 1)
    container.appendChild(renderer.domElement)

    // Lights
    const ambientLight = new THREE.AmbientLight(0x223355, 1.2)
    scene.add(ambientLight)

    const dirLight = new THREE.DirectionalLight(0x38bdf8, 1.5)
    dirLight.position.set(0, 10, 5)
    scene.add(dirLight)

    const neonPointLight = new THREE.PointLight(0xa855f7, 2, 25)
    neonPointLight.position.set(0, 3, 0)
    scene.add(neonPointLight)

    // Cyberpunk Highway Track (Grid Planes)
    const trackWidth = 14
    const trackLength = 200

    // Ground plane
    const groundGeo = new THREE.PlaneGeometry(trackWidth, trackLength, 28, 100)
    const groundMat = new THREE.MeshBasicMaterial({
      color: 0x090d1a,
      wireframe: true,
    })
    const groundMesh1 = new THREE.Mesh(groundGeo, groundMat)
    groundMesh1.rotation.x = -Math.PI / 2
    groundMesh1.position.z = -trackLength / 2
    scene.add(groundMesh1)

    const groundMesh2 = new THREE.Mesh(groundGeo, groundMat)
    groundMesh2.rotation.x = -Math.PI / 2
    groundMesh2.position.z = -trackLength * 1.5
    scene.add(groundMesh2)

    // Highway Guardrails
    const railGeo = new THREE.BoxGeometry(0.3, 0.6, trackLength * 2)
    const railMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
    const leftRail = new THREE.Mesh(railGeo, railMat)
    leftRail.position.set(-trackWidth / 2, 0.3, -trackLength / 2)
    scene.add(leftRail)

    const rightRail = new THREE.Mesh(railGeo, railMat)
    rightRail.position.set(trackWidth / 2, 0.3, -trackLength / 2)
    scene.add(rightRail)

    // Player Ship
    const playerGroup = new THREE.Group()
    const shipBodyGeo = new THREE.ConeGeometry(0.65, 1.6, 4)
    const shipBodyMat = new THREE.MeshStandardMaterial({
      color: 0x0ea5e9,
      emissive: 0x0284c7,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.8,
    })
    const shipBody = new THREE.Mesh(shipBodyGeo, shipBodyMat)
    shipBody.rotation.x = Math.PI / 2
    shipBody.rotation.y = Math.PI / 4
    playerGroup.add(shipBody)

    // Ship Neon Wings
    const wingGeo = new THREE.BoxGeometry(1.6, 0.08, 0.6)
    const wingMat = new THREE.MeshBasicMaterial({ color: 0xa855f7 })
    const wings = new THREE.Mesh(wingGeo, wingMat)
    wings.position.set(0, 0, 0.3)
    playerGroup.add(wings)

    // Thruster engine glow
    const thrusterGeo = new THREE.SphereGeometry(0.2, 8, 8)
    const thrusterMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
    const thruster = new THREE.Mesh(thrusterGeo, thrusterMat)
    thruster.position.set(0, 0, 0.85)
    playerGroup.add(thruster)

    playerGroup.position.set(0, 0.5, 2)
    scene.add(playerGroup)

    // Obstacles and Yellow Data-Cubes Pools
    const obstacles = []
    const dataCubes = []

    // Obstacle geometry: Cyber neon barriers
    const obstacleGeo = new THREE.BoxGeometry(1.6, 1.4, 1.2)
    const obstacleMat = new THREE.MeshStandardMaterial({
      color: 0xf43f5e,
      emissive: 0xe11d48,
      emissiveIntensity: 0.7,
      roughness: 0.3,
    })

    // Data-Cube geometry: Glowing yellow cube
    const cubeGeo = new THREE.BoxGeometry(0.75, 0.75, 0.75)
    const cubeMat = new THREE.MeshStandardMaterial({
      color: 0xfbbf24,
      emissive: 0xf59e0b,
      emissiveIntensity: 0.9,
      roughness: 0.1,
      metalness: 0.5,
    })

    const lanes = [-4, -2, 0, 2, 4]

    function spawnEntity(zPos) {
      const isCube = Math.random() < 0.45
      const lane = lanes[Math.floor(Math.random() * lanes.length)]

      if (isCube) {
        const mesh = new THREE.Mesh(cubeGeo, cubeMat)
        mesh.position.set(lane, 0.65, zPos)
        scene.add(mesh)
        dataCubes.push(mesh)
      } else {
        const mesh = new THREE.Mesh(obstacleGeo, obstacleMat)
        mesh.position.set(lane, 0.7, zPos)
        scene.add(mesh)
        obstacles.push(mesh)
      }
    }

    // Prepopulate track
    for (let z = -20; z > -160; z -= 14) {
      spawnEntity(z)
    }

    // Key handlers
    const keys = { left: false, right: false }
    const onKeyDown = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        keys.left = true
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        keys.right = true
      }
      if (e.key === ' ' && stateRef.current.gameState === 'gameover') {
        restartGame()
      }
    }

    const onKeyUp = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        keys.left = false
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        keys.right = false
      }
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)

    // Touch controls
    const moveLeft = () => {
      stateRef.current.targetPlayerX = Math.max(-4.8, stateRef.current.targetPlayerX - 2)
    }
    const moveRight = () => {
      stateRef.current.targetPlayerX = Math.min(4.8, stateRef.current.targetPlayerX + 2)
    }

    // Attach to DOM for touch / buttons
    container.__moveLeft = moveLeft
    container.__moveRight = moveRight

    function restartGame() {
      // Clear entities
      obstacles.forEach((m) => scene.remove(m))
      dataCubes.forEach((m) => scene.remove(m))
      obstacles.length = 0
      dataCubes.length = 0

      // Reset state
      stateRef.current.gameState = 'playing'
      stateRef.current.score = 0
      stateRef.current.cubes = 0
      stateRef.current.distance = 0
      stateRef.current.playerX = 0
      stateRef.current.targetPlayerX = 0
      stateRef.current.speed = 0.8
      playerGroup.position.set(0, 0.5, 2)
      playerGroup.rotation.z = 0

      // Repopulate
      for (let z = -20; z > -160; z -= 14) {
        spawnEntity(z)
      }

      setGameState('playing')
      setScore(0)
      setCubesCollected(0)
      setDistance(0)
    }

    restartGameRef.current = restartGame

    // Animation Loop
    let animationFrameId
    let clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      if (stateRef.current.gameState !== 'playing') {
        renderer.render(scene, camera)
        return
      }

      const delta = Math.min(clock.getDelta(), 0.1)

      // Steering with keys
      if (keys.left) {
        stateRef.current.targetPlayerX = Math.max(-4.8, stateRef.current.targetPlayerX - 7 * delta)
      }
      if (keys.right) {
        stateRef.current.targetPlayerX = Math.min(4.8, stateRef.current.targetPlayerX + 7 * delta)
      }

      // Smooth ship lerp
      stateRef.current.playerX += (stateRef.current.targetPlayerX - stateRef.current.playerX) * 0.18
      playerGroup.position.x = stateRef.current.playerX

      // Ship banking tilt on turning
      const tilt = (stateRef.current.playerX - stateRef.current.targetPlayerX) * 0.4
      playerGroup.rotation.z = THREE.MathUtils.clamp(tilt, -0.4, 0.4)

      // Dynamic speed scale over time
      stateRef.current.speed = Math.min(1.7, 0.85 + stateRef.current.distance * 0.0008)
      const currentSpeed = stateRef.current.speed

      // Update distance & score
      stateRef.current.distance += Math.round(currentSpeed * 10 * delta * 6)
      stateRef.current.score = stateRef.current.distance + stateRef.current.cubes * 150

      setDistance(stateRef.current.distance)
      setScore(stateRef.current.score)

      // Move ground mesh for infinite scrolling
      groundMesh1.position.z += currentSpeed
      groundMesh2.position.z += currentSpeed
      if (groundMesh1.position.z > trackLength / 2) {
        groundMesh1.position.z = groundMesh2.position.z - trackLength
      }
      if (groundMesh2.position.z > trackLength / 2) {
        groundMesh2.position.z = groundMesh1.position.z - trackLength
      }

      // Move obstacles and check collisions
      for (let i = obstacles.length - 1; i >= 0; i--) {
        const obs = obstacles[i]
        obs.position.z += currentSpeed

        // Collision check
        const dx = Math.abs(obs.position.x - playerGroup.position.x)
        const dz = Math.abs(obs.position.z - playerGroup.position.z)
        if (dx < 1.15 && dz < 1.0) {
          // Collision! Game Over!
          stateRef.current.gameState = 'gameover'
          setGameState('gameover')
          setHighScore((prev) => {
            const next = Math.max(prev, stateRef.current.score)
            try {
              localStorage.setItem('phasejump_highscore', next.toString())
            } catch {}
            return next
          })
          break
        }

        // Recycle passed obstacles
        if (obs.position.z > 8) {
          scene.remove(obs)
          obstacles.splice(i, 1)
          spawnEntity(-150)
        }
      }

      // Move & rotate yellow data-cubes
      for (let j = dataCubes.length - 1; j >= 0; j--) {
        const cube = dataCubes[j]
        cube.position.z += currentSpeed
        cube.rotation.x += 0.04
        cube.rotation.y += 0.06

        // Collection check
        const cdx = Math.abs(cube.position.x - playerGroup.position.x)
        const cdz = Math.abs(cube.position.z - playerGroup.position.z)
        if (cdx < 1.25 && cdz < 1.1) {
          // Collected!
          stateRef.current.cubes += 1
          setCubesCollected(stateRef.current.cubes)
          scene.remove(cube)
          dataCubes.splice(j, 1)
          spawnEntity(-150)
          continue
        }

        // Recycle passed cubes
        if (cube.position.z > 8) {
          scene.remove(cube)
          dataCubes.splice(j, 1)
          spawnEntity(-150)
        }
      }

      renderer.render(scene, camera)
    }

    animate()

    // Handle Resize
    const handleResize = () => {
      if (!container) return
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
      window.removeEventListener('resize', handleResize)
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return (
    <div className="phasejump-modal-overlay" role="dialog" aria-modal="true" aria-label="PhaseJump 3D Game">
      <div className="phasejump-game-container">
        {/* Header Bar */}
        <div className="game-header">
          <div className="game-header__brand">
            <span className="game-glow-dot" />
            <span className="game-title">PHASEJUMP // 3D CYBERPUNK RUNNER</span>
          </div>
          <div className="game-header__badges">
            <span className="game-chip">Three.js WebGL</span>
            <span className="game-chip game-chip--gold">High: {highScore}</span>
            <button
              type="button"
              className="game-close-btn"
              onClick={onClose}
              aria-label="Close game modal"
              title="Close game"
            >
              ✕
            </button>
          </div>
        </div>

        {/* HUD Overlay */}
        <div className="game-hud">
          <div className="hud-metric">
            <span className="hud-label">SCORE</span>
            <span className="hud-value hud-value--accent">{score}</span>
          </div>
          <div className="hud-metric">
            <span className="hud-label">DATA-CUBES</span>
            <span className="hud-value hud-value--gold">◆ {cubesCollected}</span>
          </div>
          <div className="hud-metric">
            <span className="hud-label">DISTANCE</span>
            <span className="hud-value">{distance}m</span>
          </div>
        </div>

        {/* 3D WebGL Canvas Viewport */}
        <div ref={mountRef} className="game-canvas-wrap" />

        {/* Mobile / Screen Touch Navigation Controls */}
        <div className="game-controls-bar">
          <button
            type="button"
            className="ctrl-btn ctrl-btn--left"
            onClick={() => {
              if (mountRef.current && mountRef.current.__moveLeft) {
                mountRef.current.__moveLeft()
              }
            }}
          >
            ◀ STEER LEFT
          </button>
          <span className="ctrl-hint">Use Keyboard [A/D] or [←/→] to Dodge Obstacles & Collect Yellow Cubes</span>
          <button
            type="button"
            className="ctrl-btn ctrl-btn--right"
            onClick={() => {
              if (mountRef.current && mountRef.current.__moveRight) {
                mountRef.current.__moveRight()
              }
            }}
          >
            STEER RIGHT ▶
          </button>
        </div>

        {/* Game Over Screen */}
        {gameState === 'gameover' && (
          <div className="game-overlay-screen">
            <div className="game-over-box">
              <span className="game-over-sub">TRANSMISSION LOST</span>
              <h2 className="game-over-title">COLLISION DETECTED</h2>
              <div className="game-over-stats">
                <div>
                  <span className="stat-label">Final Score</span>
                  <span className="stat-num">{score}</span>
                </div>
                <div>
                  <span className="stat-label">Yellow Cubes</span>
                  <span className="stat-num stat-num--gold">◆ {cubesCollected}</span>
                </div>
                <div>
                  <span className="stat-label">Distance Run</span>
                  <span className="stat-num">{distance}m</span>
                </div>
              </div>
              <div className="game-over-actions">
                <button
                  type="button"
                  className="btn btn--gradient btn--lg"
                  onClick={() => restartGameRef.current && restartGameRef.current()}
                >
                  <span>Re-enter Grid (Restart)</span>
                </button>
                <button type="button" className="btn btn--outline" onClick={onClose}>
                  <span>Exit to Portfolio</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
