"use client"

import { useEffect, useState } from "react"

interface LoadingScreenProps {
  onComplete: () => void
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState("Inicializando sistemas...")

  useEffect(() => {
    const texts = [
      "Inicializando sistemas...",
      "Cargando naves espaciales...",
      "Configurando motores de propulsión...",
      "Estableciendo comunicaciones...",
      "Preparando exploración...",
    ]

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 2
        const textIndex = Math.floor(newProgress / 20)
        if (textIndex < texts.length) {
          setLoadingText(texts[textIndex])
        }

        if (newProgress >= 100) {
          clearInterval(interval)
          setTimeout(onComplete, 500)
          return 100
        }
        return newProgress
      })
    }, 50)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
      <div className="text-center space-y-8">
        {/* Logo/Title */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-foreground neon-glow">Explorador Espacial</h1>
          <p className="text-muted-foreground">Preparando tu viaje por las estrellas</p>
        </div>

        {/* Loading Bar */}
        <div className="w-80 mx-auto space-y-4">
          <div className="w-full bg-muted/20 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300 ease-out neon-glow"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{loadingText}</span>
            <span>{progress}%</span>
          </div>
        </div>

        {/* Animated Stars */}
        <div className="relative w-32 h-32 mx-auto">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-accent rounded-full star"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + Math.sin(i) * 20}%`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
