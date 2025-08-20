"use client"

import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Text, Sphere, Cylinder, Cone } from "@react-three/drei"
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
      // Flotación suave
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.2

      // Rotación cuando está en hover
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
    >
      {/* Cuerpo del cohete */}
      <Cylinder args={[0.6, 0.6, 4, 16]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color={hovered ? "#10b981" : color}
          emissive={hovered ? "#059669" : "#000"}
          emissiveIntensity={hovered ? 0.3 : 0}
          metalness={0.7}
          roughness={0.3}
        />
      </Cylinder>

      {/* Punta */}
      <Cone args={[0.6, 1, 16]} position={[0, 2.5, 0]}>
        <meshStandardMaterial color={hovered ? "#34d399" : "#ffffff"} metalness={0.6} roughness={0.3} />
      </Cone>

      {/* Cabina (esfera de cristal) */}
      <Sphere args={[0.5, 16, 16]} position={[0, 1.2, 0.7]}>
        <meshStandardMaterial
          color="#87ceeb"
          transparent
          opacity={0.7}
          emissive={hovered ? "#10b981" : "#000"}
          emissiveIntensity={hovered ? 0.1 : 0}
        />
      </Sphere>

      {/* Aletas laterales */}
      <Cone args={[0.3, 1, 3]} position={[-0.9, -1.5, 0]} rotation={[0, 0, Math.PI / 2]}>
        <meshStandardMaterial color={hovered ? "#10b981" : "#444"} />
      </Cone>
      <Cone args={[0.3, 1, 3]} position={[0.9, -1.5, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <meshStandardMaterial color={hovered ? "#10b981" : "#444"} />
      </Cone>

      {/* Motores */}
      <Cylinder args={[0.25, 0.25, 1]} position={[-0.5, -2.5, 0]}>
        <meshStandardMaterial
          color={hovered ? "#ff4444" : "#666"}
          emissive={hovered ? "#ff0000" : "#000"}
          emissiveIntensity={hovered ? 0.6 : 0}
        />
      </Cylinder>
      <Cylinder args={[0.25, 0.25, 1]} position={[0.5, -2.5, 0]}>
        <meshStandardMaterial
          color={hovered ? "#ff4444" : "#666"}
          emissive={hovered ? "#ff0000" : "#000"}
          emissiveIntensity={hovered ? 0.6 : 0}
        />
      </Cylinder>

      {/* Texto flotante */}
      {hovered && (
        <Text position={[0, 3.5, 0]} fontSize={0.5} color="#10b981" anchorX="center" anchorY="middle">
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
