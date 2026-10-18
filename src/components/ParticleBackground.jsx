import { useEffect, useRef } from 'react'
import * as THREE from 'three'

function getParticleCount() {
  if (typeof window === 'undefined') return 0
  const narrow = window.matchMedia('(max-width: 768px)').matches
  const coarse = window.matchMedia('(pointer: coarse)').matches
  if (narrow || coarse) return 420
  return 900
}

/**
 * Lightweight floating particle + wireframe field (Three.js).
 * Mouse-responsive parallax; skips WebGL when reduced motion or unsupported.
 */
export default function ParticleBackground() {
  const mountRef = useRef(null)
  const rafRef = useRef(0)
  const stateRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return undefined

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduced) return undefined

    let renderer
    let geometry
    let material
    let shapes = []

    try {
      const scene = new THREE.Scene()
      scene.fog = new THREE.FogExp2(0x0a0e1a, 0.045)

      const camera = new THREE.PerspectiveCamera(
        52,
        window.innerWidth / window.innerHeight,
        0.1,
        120
      )
      camera.position.z = 14

      renderer = new THREE.WebGLRenderer({
        antialias: window.devicePixelRatio < 2,
        alpha: true,
        powerPreference: 'high-performance',
      })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setClearColor(0x0a0e1a, 0)
      mount.appendChild(renderer.domElement)

      const count = getParticleCount()
      const positions = new Float32Array(count * 3)
      for (let i = 0; i < count; i += 1) {
        positions[i * 3] = (Math.random() - 0.5) * 38
        positions[i * 3 + 1] = (Math.random() - 0.5) * 26
        positions[i * 3 + 2] = (Math.random() - 0.5) * 22
      }

      geometry = new THREE.BufferGeometry()
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

      material = new THREE.PointsMaterial({
        color: 0x3b6ea5,
        size: 0.045,
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
      })

      const particles = new THREE.Points(geometry, material)
      scene.add(particles)

      const shapeMat = new THREE.MeshBasicMaterial({
        color: 0x1e4a7a,
        wireframe: true,
        transparent: true,
        opacity: 0.12,
      })

      const shapeCount = window.innerWidth < 768 ? 3 : 5
      for (let s = 0; s < shapeCount; s += 1) {
        const geo =
          s % 2 === 0
            ? new THREE.IcosahedronGeometry(0.55 + Math.random() * 0.35, 0)
            : new THREE.OctahedronGeometry(0.45 + Math.random() * 0.3, 0)
        const mesh = new THREE.Mesh(geo, shapeMat.clone())
        mesh.position.set(
          (Math.random() - 0.5) * 16,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 8 - 4
        )
        mesh.userData.spin = (Math.random() - 0.5) * 0.004
        mesh.userData.drift = (Math.random() - 0.5) * 0.002
        scene.add(mesh)
        shapes.push(mesh)
      }

      const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 }

      const onPointerMove = (e) => {
        pointer.targetX = (e.clientX / window.innerWidth - 0.5) * 2
        pointer.targetY = (e.clientY / window.innerHeight - 0.5) * 2
      }

      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
      }

      window.addEventListener('pointermove', onPointerMove, { passive: true })
      window.addEventListener('resize', onResize, { passive: true })

      const clock = new THREE.Clock()
      let paused = document.hidden

      const onVisibility = () => {
        paused = document.hidden
      }
      document.addEventListener('visibilitychange', onVisibility)

      const tick = () => {
        rafRef.current = requestAnimationFrame(tick)
        if (paused) return
        const t = clock.getElapsedTime()

        pointer.x += (pointer.targetX - pointer.x) * 0.04
        pointer.y += (pointer.targetY - pointer.y) * 0.04

        particles.rotation.y = t * 0.018 + pointer.x * 0.08
        particles.rotation.x = pointer.y * 0.05

        camera.position.x = pointer.x * 0.35
        camera.position.y = -pointer.y * 0.25
        camera.lookAt(0, 0, 0)

        shapes.forEach((mesh, i) => {
          mesh.rotation.x += mesh.userData.spin
          mesh.rotation.y += mesh.userData.drift * 2
          mesh.position.y += Math.sin(t * 0.4 + i) * 0.0008
        })

        renderer.render(scene, camera)
      }

      tick()

      stateRef.current = {
        cleanup: () => {
          cancelAnimationFrame(rafRef.current)
          window.removeEventListener('pointermove', onPointerMove)
          window.removeEventListener('resize', onResize)
          document.removeEventListener('visibilitychange', onVisibility)
          shapes.forEach((m) => {
            m.geometry.dispose()
            m.material.dispose()
          })
          shapes = []
          geometry.dispose()
          material.dispose()
          renderer.dispose()
          if (renderer.domElement.parentNode === mount) {
            mount.removeChild(renderer.domElement)
          }
        },
      }
    } catch (err) {
      console.warn('[ParticleBackground] WebGL unavailable:', err)
    }

    return () => {
      stateRef.current?.cleanup?.()
      stateRef.current = null
    }
  }, [])

  return (
    <div ref={mountRef} className="scene-bg-canvas" aria-hidden="true">
      <div className="scene-bg-vignette" />
    </div>
  )
}
