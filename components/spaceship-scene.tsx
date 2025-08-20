"use client"

import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Text, Box, Sphere, Cylinder } from "@react-three/drei"
import type * as THREE from "three"

interface SpaceshipProps {
  position: [number, number, number]
  rotation: [number, number, number]
  scale: number
  color: string
  data: any
  onSelect: (data: any) => void
}

function Spaceship({ position, rotation, scale, color, data, onSelect }: SpaceshipProps) {
  const meshRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.2

      // Slow rotation when hovered
      if (hovered) {
        meshRef.current.rotation.y += 0.01
      }
    }
  })

  return (
    <group
      ref={meshRef}
      position={position}
      rotation={rotation}
      scale={hovered ? scale * 1.2 : scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => onSelect(data)}
      style={{ cursor: "pointer" }}
    >
      {/* Main body */}
      <Box args={[2, 0.5, 4]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color={hovered ? "#10b981" : color}
          emissive={hovered ? "#059669" : "#000000"}
          emissiveIntensity={hovered ? 0.3 : 0}
          metalness={0.8}
          roughness={0.2}
        />
      </Box>

      {/* Wings */}
      <Box args={[4, 0.2, 1]} position={[0, 0, -1]}>
        <meshStandardMaterial
          color={hovered ? "#10b981" : color}
          emissive={hovered ? "#059669" : "#000000"}
          emissiveIntensity={hovered ? 0.2 : 0}
          metalness={0.7}
          roughness={0.3}
        />
      </Box>

      {/* Cockpit */}
      <Sphere args={[0.4]} position={[0, 0.3, 1]}>
        <meshStandardMaterial
          color="#87ceeb"
          transparent
          opacity={0.7}
          emissive={hovered ? "#10b981" : "#000000"}
          emissiveIntensity={hovered ? 0.1 : 0}
        />
      </Sphere>

      {/* Engines */}
      <Cylinder args={[0.2, 0.3, 1]} position={[-1, -0.2, -2]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial
          color={hovered ? "#ff4444" : "#666666"}
          emissive={hovered ? "#ff0000" : "#000000"}
          emissiveIntensity={hovered ? 0.5 : 0}
        />
      </Cylinder>
      <Cylinder args={[0.2, 0.3, 1]} position={[1, -0.2, -2]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial
          color={hovered ? "#ff4444" : "#666666"}
          emissive={hovered ? "#ff0000" : "#000000"}
          emissiveIntensity={hovered ? 0.5 : 0}
        />
      </Cylinder>

      {/* Hover label */}
      {hovered && (
        <Text position={[0, 2, 0]} fontSize={0.5} color="#10b981" anchorX="center" anchorY="middle">
          {data.name}
        </Text>
      )}
    </group>
  )
}

interface SpaceshipSceneProps {
  onSpaceshipSelect: (spaceship: any) => void
}

export function SpaceshipScene({ onSpaceshipSelect }: SpaceshipSceneProps) {
  const spaceships = [
    {
      id: 1,
      name: "Interceptor Estelar",
      position: [-8, 2, -5] as [number, number, number],
      rotation: [0, 0.5, 0] as [number, number, number],
      scale: 1,
      color: "#4a90e2",
      specs: {
        velocidad: "Mach 15",
        armamento: "Cañones láser duales",
        tripulación: "1 piloto",
        alcance: "500 años luz",
      },
      description:
        "Nave de combate ligera diseñada para misiones de reconocimiento y combate rápido. Su diseño aerodinámico permite maniobras extremas en el espacio.",
      history:
        "Desarrollada por la Federación Galáctica en el año 2387, esta nave ha sido el pilar de las flotas de exploración durante décadas.",
    },
    {
      id: 2,
      name: "Crucero de Batalla",
      position: [0, -2, 0] as [number, number, number],
      rotation: [0, -0.3, 0] as [number, number, number],
      scale: 1.5,
      color: "#e74c3c",
      specs: {
        velocidad: "Mach 8",
        armamento: "Torpedos cuánticos, Escudos deflectores",
        tripulación: "150 personas",
        alcance: "2000 años luz",
      },
      description:
        "Nave capital diseñada para operaciones de largo alcance y combate pesado. Equipada con la tecnología más avanzada disponible.",
      history:
        "Construida en los astilleros de Titan, representa el pináculo de la ingeniería espacial humana del siglo XXIV.",
    },
    {
      id: 3,
      name: "Explorador Científico",
      position: [8, 1, -3] as [number, number, number],
      rotation: [0, -0.8, 0] as [number, number, number],
      scale: 0.8,
      color: "#2ecc71",
      specs: {
        velocidad: "Mach 12",
        armamento: "Sistemas defensivos básicos",
        tripulación: "25 científicos",
        alcance: "5000 años luz",
      },
      description:
        "Nave especializada en exploración y investigación científica. Equipada con laboratorios avanzados y sensores de largo alcance.",
      history:
        "Diseñada por la Academia de Ciencias Interplanetarias para misiones de exploración del espacio profundo y contacto con nuevas civilizaciones.",
    },
    {
      id: 4,
      name: "Transporte Pesado",
      position: [-5, -3, 8] as [number, number, number],
      rotation: [0, 1.2, 0] as [number, number, number],
      scale: 2,
      color: "#f39c12",
      specs: {
        velocidad: "Mach 5",
        armamento: "Torretas defensivas automatizadas",
        tripulación: "50 personas",
        alcance: "1000 años luz",
      },
      description:
        "Nave de carga masiva diseñada para transportar recursos y suministros entre colonias. Su gran capacidad de carga la hace indispensable para el comercio intergaláctico.",
      history:
        "Utilizada extensivamente durante la Gran Expansión Colonial, estas naves fueron fundamentales para establecer las rutas comerciales actuales.",
    },
    {
      id: 5,
      name: "Caza Stealth",
      position: [6, 4, 5] as [number, number, number],
      rotation: [0, -1.5, 0] as [number, number, number],
      scale: 0.6,
      color: "#9b59b6",
      specs: {
        velocidad: "Mach 20",
        armamento: "Misiles de plasma, Camuflaje óptico",
        tripulación: "1 piloto",
        alcance: "300 años luz",
      },
      description:
        "Nave furtiva de última generación con capacidades de camuflaje avanzadas. Diseñada para operaciones encubiertas y misiones especiales.",
      history:
        "Proyecto clasificado desarrollado por la División de Operaciones Especiales. Solo unos pocos pilotos élite están autorizados a pilotarla.",
    },
  ]

  return (
    <>
      {spaceships.map((spaceship) => (
        <Spaceship
          key={spaceship.id}
          position={spaceship.position}
          rotation={spaceship.rotation}
          scale={spaceship.scale}
          color={spaceship.color}
          data={spaceship}
          onSelect={onSpaceshipSelect}
        />
      ))}
    </>
  )
}
