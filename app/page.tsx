"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stars, Environment } from "@react-three/drei"
import { Suspense, useState } from "react"
import { SpaceshipScene } from "@/components/spaceship-scene"
import { SpaceshipInfo } from "@/components/spaceship-info"
import { LoadingScreen } from "@/components/loading-screen"

export default function SpaceExplorer() {
  const [selectedSpaceship, setSelectedSpaceship] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="w-full h-screen relative bg-background overflow-hidden">
      {/* Loading Screen */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* 3D Canvas */}
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }} className="w-full h-full">
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={0.5} color="#10b981" />
          <pointLight position={[-10, -10, -10]} intensity={0.3} color="#059669" />

          {/* Environment */}
          <Stars radius={300} depth={60} count={2000} factor={7} saturation={0} fade speed={1} />
          <Environment preset="night" />

          {/* Spaceship Scene */}
          <SpaceshipScene onSpaceshipSelect={setSelectedSpaceship} />

          {/* Controls */}
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={5}
            maxDistance={50}
            autoRotate={true}
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>

      {/* UI Overlay */}
      <div className="absolute top-4 left-4 z-10">
        <div className="bg-popover/80 backdrop-blur-sm rounded-lg p-4 border border-accent/30">
          <h1 className="text-2xl font-bold text-foreground mb-2 neon-glow">Explorador Espacial</h1>
          <p className="text-muted-foreground text-sm">Haz clic en las naves para explorar sus detalles</p>
        </div>
      </div>

      {/* Spaceship Information Panel */}
      {selectedSpaceship && <SpaceshipInfo spaceship={selectedSpaceship} onClose={() => setSelectedSpaceship(null)} />}

      {/* Animated Background Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-accent rounded-full star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
