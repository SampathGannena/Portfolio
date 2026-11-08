"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Text } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import * as THREE from "three";

interface Project {
  title: string;
  tech: string;
  description: string;
  category: string;
  signal: string;
  deployedUrl?: string;
}

interface ProjectCardProps {
  position: [number, number, number];
  rotation: [number, number, number];
  project: Project;
  index: number;
  selected: boolean;
  onClick: () => void;
}

function ProjectCard({ position, rotation, project, selected, onClick }: ProjectCardProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const isActive = hovered || selected;

  return (
    <group position={position} rotation={rotation}>
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={isActive ? 1.14 : 1}
      >
        <boxGeometry args={[2.35, 2.85, 0.14]} />
        <meshStandardMaterial
          color={isActive ? "#78b8c8" : "#1d3440"}
          emissive={isActive ? "#397f97" : "#10232d"}
          emissiveIntensity={isActive ? 0.5 : 0.12}
        />
      </mesh>
      <Text
        position={[0, 0, 0.06]}
        fontSize={0.17}
        color={isActive ? "#10232d" : "#e9f4f3"}
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
      >
        {project.title}
      </Text>
      <Text
        position={[0, -0.4, 0.06]}
        fontSize={0.075}
        color={isActive ? "#10232d" : "#a9c5c7"}
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
      >
        {project.tech}
      </Text>
      <Text
        position={[0, 0.78, 0.06]}
        fontSize={0.07}
        color={isActive ? "#10232d" : "#8cc9bd"}
        anchorX="center"
        anchorY="middle"
      >
        {project.category.toUpperCase()}
      </Text>
    </group>
  );
}

interface ProjectShowcase3DProps {
  selectedProject: number;
  onSelectProject: (index: number) => void;
}

export default function ProjectShowcase3D({ selectedProject, onSelectProject }: ProjectShowcase3DProps) {
  const [focusedProject, setFocusedProject] = useState<number | null>(selectedProject);

  useEffect(() => {
    setFocusedProject(selectedProject);
  }, [selectedProject]);

  const projects: Project[] = [
    {
      title: "GitGuard AI",
      tech: "Node • React • MongoDB",
      category: "Security / tooling",
      signal: "Fix-first reviews",
      description: "Automated pull-request security review with fix-first feedback"
    },
    {
      title: "StudyFinder",
      tech: "Node • MongoDB • WebSockets",
      category: "EdTech / community",
      signal: "Learning in motion",
      deployedUrl: "https://fsd-ml-4knj.onrender.com/",
      description: "Connected learning, mentorship, and real-time collaboration"
    },
    {
      title: "NetSage AI",
      tech: "Python • RAG • Streamlit",
      category: "AI / networking",
      signal: "Evidence over guesses",
      description: "Evidence-based troubleshooting for networking labs"
    },
    {
      title: "CareerForge Pro",
      tech: "React • Express • Groq",
      category: "AI / career tools",
      signal: "Grounded generation",
      deployedUrl: "https://careerforge-ehna.onrender.com/",
      description: "Role-aligned resumes and cover letters grounded in candidate facts"
    },
    {
      title: "SQLTown",
      tech: "React • SQL.js • Express",
      category: "Learning / game design",
      signal: "Query to progress",
      description: "A playful SQL learning world with quests and hidden tests"
    },
    {
      title: "BlogSpace",
      tech: "React • Express • MongoDB",
      category: "Publishing / community",
      signal: "Ideas in motion",
      description: "A focused publishing lifecycle for writing, discussion, and discovery"
    }
  ];

  const handleSelect = (index: number) => {
    setFocusedProject(index);
    onSelectProject(index);
  };

  const activeProject = focusedProject === null ? projects[0] : projects[focusedProject];

  return (
    <div className="project-orbit-shell">
      <div className="project-orbit-header">
        <span><i /> LIVE ORBIT / {String((focusedProject ?? 0) + 1).padStart(2, "0")}</span>
        <span>DRAG TO ROTATE · CLICK TO FOCUS</span>
      </div>
      <div className="project-orbit-canvas">
        <div className="project-orbit-stars" aria-hidden="true">
          {Array.from({ length: 34 }, (_, index) => (
            <i
              key={index}
              style={{
                left: `${(index * 47) % 97}%`,
                top: `${(index * 29) % 91}%`,
                animationDelay: `${(index % 9) * -0.45}s`,
                animationDuration: `${2.8 + (index % 5) * 0.7}s`,
              }}
            />
          ))}
        </div>
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 9]} />
          <OrbitControls enableZoom={true} enablePan={false} autoRotate autoRotateSpeed={0.35} />
          
          <ambientLight intensity={0.75} />
          <pointLight position={[7, 7, 8]} intensity={1.7} color="#a9e3f0" />
          <pointLight position={[-8, -4, -5]} intensity={1.2} color="#6e9f80" />

          {projects.map((project, index) => {
            const angle = (index / projects.length) * Math.PI * 2;
            const radius = 3.8;
            return (
              <ProjectCard
                key={index}
                position={[
                  Math.cos(angle) * radius,
                  Math.sin(angle) * radius * 0.5,
                  Math.sin(angle) * 0.5
                ]}
                rotation={[0, 0, angle]}
                project={project}
                index={index}
                selected={focusedProject === index}
                onClick={() => handleSelect(index)}
              />
            );
          })}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.35, 0]}>
            <circleGeometry args={[4.7, 64]} />
            <meshBasicMaterial color="#83c8d6" transparent opacity={0.2} />
          </mesh>
        </Canvas>
        {activeProject.deployedUrl ? (
          <a
            className="project-orbit-center project-orbit-center-clickable"
            href={activeProject.deployedUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open deployed ${activeProject.title} project`}
          >
            <span>SELECTED SYSTEM</span>
            <strong>{activeProject.title}</strong>
            <small>{activeProject.signal}</small>
            <em>OPEN LIVE PROJECT <ArrowRight size={11} /></em>
          </a>
        ) : (
          <div className="project-orbit-center project-orbit-center-unavailable">
            <span>SELECTED SYSTEM</span>
            <strong>{activeProject.title}</strong>
            <small>{activeProject.signal}</small>
            <em>LIVE LINK SOON</em>
          </div>
        )}
      </div>

      <div className="project-orbit-detail">
        <div>
          <span className="project-orbit-kicker">{activeProject.category}</span>
          <h3>{activeProject.title}</h3>
          <p>{activeProject.description}</p>
        </div>
        <div className="project-orbit-actions">
          <span className="project-orbit-signal">{activeProject.signal}</span>
          <button onClick={() => handleSelect(((focusedProject ?? 0) + 1) % projects.length)}>Next system <ArrowRight /></button>
        </div>
      </div>
    </div>
  );
}
