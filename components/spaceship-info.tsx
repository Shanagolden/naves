"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

interface SpaceshipInfoProps {
  spaceship: any
  onClose: () => void
}

export function SpaceshipInfo({ spaceship, onClose }: SpaceshipInfoProps) {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl bg-card/95 backdrop-blur-sm border-accent/30 shadow-2xl">
        <CardHeader className="relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 rounded-full bg-secondary/20 hover:bg-secondary/40 transition-colors"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>

          <CardTitle className="text-3xl font-bold text-foreground mb-2 neon-glow">{spaceship.name}</CardTitle>

          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-accent/20 text-accent-foreground border-accent/30">
              Nave Espacial
            </Badge>
            <Badge variant="outline" className="border-primary/30 text-primary">
              Activa
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Descripción</h3>
            <p className="text-muted-foreground leading-relaxed">{spaceship.description}</p>
          </div>

          {/* Specifications */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Especificaciones Técnicas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(spaceship.specs).map(([key, value]) => (
                <div key={key} className="bg-muted/20 rounded-lg p-3 border border-border/30">
                  <div className="text-sm text-muted-foreground capitalize mb-1">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </div>
                  <div className="text-foreground font-medium">{value as string}</div>
                </div>
              ))}
            </div>
          </div>

          {/* History */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Historia</h3>
            <p className="text-muted-foreground leading-relaxed">{spaceship.history}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button className="flex-1 bg-primary hover:bg-primary/80 text-primary-foreground py-3 px-6 rounded-lg font-medium transition-colors neon-glow">
              Explorar Nave
            </button>
            <button className="flex-1 bg-secondary/20 hover:bg-secondary/30 text-secondary-foreground py-3 px-6 rounded-lg font-medium transition-colors border border-secondary/30">
              Ver Planos
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
