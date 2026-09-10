import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { Eye, Compass, Sparkles, Orbit, Disc, Compass as CompassIcon } from 'lucide-react';

export interface BlackHoleCanvasProps {
  scrollProgress: number; // 0 to 1
  pageProgress: number; // 0 to 5 (continuous float across 6 sections)
  warpActive: boolean;
  onFpsUpdate?: (fps: number) => void;
  onJumpToSection?: (sectionId: string) => void;
}

interface CameraKeyframe {
  pos: THREE.Vector3;
  lookAt: THREE.Vector3;
  up: THREE.Vector3;
  modeLabel: string;
  shortTag: string;
  sectionId: string;
}

export const BlackHoleCanvas: React.FC<BlackHoleCanvasProps> = ({
  scrollProgress,
  pageProgress,
  warpActive,
  onFpsUpdate,
  onJumpToSection
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // References for Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationFrameRef = useRef<number>(0);

  // Visual component refs
  const blackHoleGroupRef = useRef<THREE.Group | null>(null);
  const singularityMeshRef = useRef<THREE.Mesh | null>(null);
  const singularityMatRef = useRef<THREE.MeshBasicMaterial | null>(null);
  const accretionDiskRef = useRef<THREE.Points | null>(null);
  const lensingDiskRef = useRef<THREE.Mesh | null>(null);
  const photonRingRef = useRef<THREE.Mesh | null>(null);
  const starFieldRef = useRef<THREE.Points | null>(null);
  const spiralDustRef = useRef<THREE.Points | null>(null);
  const polarJetsRef = useRef<THREE.Points | null>(null);

  // Inside Black Hole 3D Effects Refs
  const internalStarTunnelRef = useRef<THREE.Points | null>(null);
  const internalStarTunnelMatRef = useRef<THREE.PointsMaterial | null>(null);
  const internalStarDataRef = useRef<Float32Array | null>(null);
  const wormholeRingsGroupRef = useRef<THREE.Group | null>(null);
  const quantumCoreShellRef = useRef<THREE.Mesh | null>(null);
  const quantumCoreMatRef = useRef<THREE.MeshBasicMaterial | null>(null);

  // Active view mode label for HUD
  const [activeViewLabel, setActiveViewLabel] = useState<string>('FRONTAL VIEW');
  const [activeSectionIndex, setActiveSectionIndex] = useState<number>(0);

  // Mouse parallax
  const mouseRef = useRef<{ x: number; y: number; targetX: number; targetY: number }>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0
  });

  const scrollRef = useRef<number>(0);
  scrollRef.current = scrollProgress;

  const pageProgressRef = useRef<number>(0);
  pageProgressRef.current = pageProgress;

  const warpSpeedRef = useRef<number>(1);

  // Camera trajectory keyframes corresponding to each page/section
  const keyframes: CameraKeyframe[] = [
    // 0. Page 1: Hero (MR TEJ) - Normal Front View
    {
      pos: new THREE.Vector3(0, 1.2, 16.0),
      lookAt: new THREE.Vector3(0, 0, 0),
      up: new THREE.Vector3(0, 1, 0),
      modeLabel: 'Frontal Singularity View',
      shortTag: '1. Front View',
      sectionId: 'singularity'
    },
    // 1. Page 2: Milestones - Orbital Flight Vector
    {
      pos: new THREE.Vector3(8.5, 2.2, 12.5),
      lookAt: new THREE.Vector3(0, 0, 0),
      up: new THREE.Vector3(0, 1, 0),
      modeLabel: 'Orbital Vector Trajectory',
      shortTag: '2. Orbit View',
      sectionId: 'milestones'
    },
    // 2. Page 3: Clean Code & Frameworks - Other Side View (180° Rear)
    {
      pos: new THREE.Vector3(-14.2, 3.2, -12.5),
      lookAt: new THREE.Vector3(0, 0, 0),
      up: new THREE.Vector3(0, 1, 0),
      modeLabel: 'Other Side View (180° Rear)',
      shortTag: '3. Other Side',
      sectionId: 'architecture'
    },
    // 3. Page 4: Previous Projects (StudyShelf & FriendChat) - Top Down View
    {
      pos: new THREE.Vector3(0.01, 21.8, 0.01),
      lookAt: new THREE.Vector3(0, 0, 0),
      up: new THREE.Vector3(0, 0, -1), // pointing along -Z so accretion disk faces upright
      modeLabel: 'Top-Down View (Overhead Polar)',
      shortTag: '4. Top Down',
      sectionId: 'projects'
    },
    // 4. Page 5: Ready to Sell & Commission - Inside The Black Hole (3D Stars Effect)
    {
      pos: new THREE.Vector3(0, 0, 0.2), // inside event horizon
      lookAt: new THREE.Vector3(0, 0, -22.0), // looking down into the 3D star warp tunnel
      up: new THREE.Vector3(0, 1, 0),
      modeLabel: 'Inside Black Hole (3D Starfield Warp)',
      shortTag: '5. Inside Singularity',
      sectionId: 'services'
    },
    // 5. Page 6: Final Page (Footer) - Normal Black Hole View
    {
      pos: new THREE.Vector3(0, 1.2, 16.0),
      lookAt: new THREE.Vector3(0, 0, 0),
      up: new THREE.Vector3(0, 1, 0),
      modeLabel: 'Normal Black Hole View',
      shortTag: '6. Normal View',
      sectionId: 'footer-section'
    }
  ];

  // Setup Three.js scene
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x020205, 0.016);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      52,
      container.clientWidth / container.clientHeight,
      0.1,
      1200
    );
    camera.position.set(0, 1.2, 16.0);
    camera.up.set(0, 1, 0);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    rendererRef.current = renderer;

    const blackHoleGroup = new THREE.Group();
    blackHoleGroup.rotation.x = 0.28; // Subtle cinematic tilt
    blackHoleGroup.rotation.z = -0.15;
    scene.add(blackHoleGroup);
    blackHoleGroupRef.current = blackHoleGroup;

    // Common particle glow texture generator
    const createParticleTexture = () => {
      const c = document.createElement('canvas');
      c.width = 64;
      c.height = 64;
      const ctx = c.getContext('2d')!;
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.25, 'rgba(255, 225, 170, 0.9)');
      grad.addColorStop(0.65, 'rgba(245, 158, 11, 0.3)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(32, 32, 32, 0, Math.PI * 2);
      ctx.fill();
      return new THREE.CanvasTexture(c);
    };

    const particleTexture = createParticleTexture();

    // Radial gradient glow texture for rings
    const createGlowTexture = () => {
      const c = document.createElement('canvas');
      c.width = 512;
      c.height = 512;
      const ctx = c.getContext('2d')!;
      const gradient = ctx.createRadialGradient(256, 256, 110, 256, 256, 256);
      gradient.addColorStop(0.0, 'rgba(255, 255, 255, 1.0)');
      gradient.addColorStop(0.2, 'rgba(245, 158, 11, 0.9)');
      gradient.addColorStop(0.5, 'rgba(234, 88, 12, 0.5)');
      gradient.addColorStop(0.8, 'rgba(180, 50, 10, 0.15)');
      gradient.addColorStop(1.0, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 512, 512);
      return new THREE.CanvasTexture(c);
    };

    const glowTexture = createGlowTexture();

    // 1. THE SINGULARITY (Shadow Sphere)
    const singularityGeo = new THREE.SphereGeometry(2.35, 64, 64);
    const singularityMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 1.0
    });
    const singularity = new THREE.Mesh(singularityGeo, singularityMat);
    blackHoleGroup.add(singularity);
    singularityMeshRef.current = singularity;
    singularityMatRef.current = singularityMat;

    // 2. THE PHOTON SPHERE & INNER GLOW (Einstein Lensing Ring)
    const photonRingGeo = new THREE.RingGeometry(2.36, 2.78, 128);
    const photonRingMat = new THREE.MeshBasicMaterial({
      map: glowTexture,
      side: THREE.DoubleSide,
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.95
    });
    const photonRing = new THREE.Mesh(photonRingGeo, photonRingMat);
    blackHoleGroup.add(photonRing);
    photonRingRef.current = photonRing;

    // 3. GRAVITATIONAL LENSING CURVED HALO (Gargantua Vertical Arch)
    const haloGeo = new THREE.RingGeometry(2.45, 4.6, 96);
    const haloMat = new THREE.MeshBasicMaterial({
      map: glowTexture,
      side: THREE.DoubleSide,
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.75
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    haloMesh.rotation.x = Math.PI / 2; // Perpendicular to horizontal disk
    haloMesh.scale.set(1.0, 1.25, 1.0);
    blackHoleGroup.add(haloMesh);
    lensingDiskRef.current = haloMesh;

    // 4. THE ACCRETION DISK (14,000 Keplerian Particles)
    const diskParticleCount = 14000;
    const diskGeo = new THREE.BufferGeometry();
    const diskPositions = new Float32Array(diskParticleCount * 3);
    const diskColors = new Float32Array(diskParticleCount * 3);
    const diskRadii = new Float32Array(diskParticleCount);
    const diskAngles = new Float32Array(diskParticleCount);
    const diskSpeeds = new Float32Array(diskParticleCount);

    const innerRadius = 2.7;
    const outerRadius = 8.6;

    const colorHot = new THREE.Color(0xffffff);
    const colorGold = new THREE.Color(0xf59e0b);
    const colorAmber = new THREE.Color(0xea580c);
    const colorCyan = new THREE.Color(0x38bdf8);

    for (let i = 0; i < diskParticleCount; i++) {
      const u = Math.pow(Math.random(), 1.8);
      const r = innerRadius + u * (outerRadius - innerRadius);
      const theta = Math.random() * Math.PI * 2;
      const speed = (0.55 / Math.sqrt(r)) * (0.85 + Math.random() * 0.3);

      diskRadii[i] = r;
      diskAngles[i] = theta;
      diskSpeeds[i] = speed;

      const y = (Math.random() - 0.5) * (0.15 + (r - innerRadius) * 0.08);

      diskPositions[i * 3] = r * Math.cos(theta);
      diskPositions[i * 3 + 1] = y;
      diskPositions[i * 3 + 2] = r * Math.sin(theta);

      const normalizedR = (r - innerRadius) / (outerRadius - innerRadius);
      const doppler = Math.cos(theta);

      const particleColor = new THREE.Color();
      if (normalizedR < 0.25) {
        particleColor.lerpColors(colorHot, colorGold, normalizedR * 4);
      } else if (doppler > 0.2) {
        particleColor.lerpColors(colorGold, colorCyan, (doppler - 0.2) * 0.6);
      } else {
        particleColor.lerpColors(colorGold, colorAmber, Math.abs(doppler));
      }

      diskColors[i * 3] = particleColor.r;
      diskColors[i * 3 + 1] = particleColor.g;
      diskColors[i * 3 + 2] = particleColor.b;
    }

    diskGeo.setAttribute('position', new THREE.BufferAttribute(diskPositions, 3));
    diskGeo.setAttribute('color', new THREE.BufferAttribute(diskColors, 3));

    const diskMat = new THREE.PointsMaterial({
      size: 0.14,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const accretionDisk = new THREE.Points(diskGeo, diskMat);
    blackHoleGroup.add(accretionDisk);
    accretionDiskRef.current = accretionDisk;

    // 5. SPIRAL INWARD STARDUST INGESTION (3,500 particles)
    const spiralCount = 3500;
    const spiralGeo = new THREE.BufferGeometry();
    const spiralPositions = new Float32Array(spiralCount * 3);
    const spiralColors = new Float32Array(spiralCount * 3);
    const spiralData = new Float32Array(spiralCount * 3);

    for (let i = 0; i < spiralCount; i++) {
      const r = 3.5 + Math.random() * 14;
      const theta = Math.random() * Math.PI * 2;
      const speed = 0.2 + Math.random() * 0.4;
      const spiralArm = (i % 3) * ((Math.PI * 2) / 3);

      spiralData[i * 3] = r;
      spiralData[i * 3 + 1] = theta + spiralArm;
      spiralData[i * 3 + 2] = speed;

      const y = (Math.random() - 0.5) * (0.8 + r * 0.2);
      spiralPositions[i * 3] = r * Math.cos(theta + spiralArm);
      spiralPositions[i * 3 + 1] = y;
      spiralPositions[i * 3 + 2] = r * Math.sin(theta + spiralArm);

      const color = new THREE.Color().setHSL(0.08 + Math.random() * 0.08, 0.9, 0.6 + Math.random() * 0.3);
      spiralColors[i * 3] = color.r;
      spiralColors[i * 3 + 1] = color.g;
      spiralColors[i * 3 + 2] = color.b;
    }

    spiralGeo.setAttribute('position', new THREE.BufferAttribute(spiralPositions, 3));
    spiralGeo.setAttribute('color', new THREE.BufferAttribute(spiralColors, 3));

    const spiralMat = new THREE.PointsMaterial({
      size: 0.11,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.85
    });

    const spiralDust = new THREE.Points(spiralGeo, spiralMat);
    blackHoleGroup.add(spiralDust);
    spiralDustRef.current = spiralDust;

    // 6. RELATIVISTIC POLAR JETS (1,600 particles)
    const jetCount = 1600;
    const jetGeo = new THREE.BufferGeometry();
    const jetPositions = new Float32Array(jetCount * 3);
    const jetColors = new Float32Array(jetCount * 3);

    for (let i = 0; i < jetCount; i++) {
      const isNorth = i % 2 === 0;
      const height = (Math.random() * 12 + 1.5) * (isNorth ? 1 : -1);
      const spread = (Math.abs(height) / 12) * 0.75 + Math.random() * 0.2;
      const angle = Math.random() * Math.PI * 2;

      jetPositions[i * 3] = Math.cos(angle) * spread;
      jetPositions[i * 3 + 1] = height;
      jetPositions[i * 3 + 2] = Math.sin(angle) * spread;

      const jetColor = new THREE.Color().setHSL(0.55 + Math.random() * 0.1, 0.9, 0.75);
      jetColors[i * 3] = jetColor.r;
      jetColors[i * 3 + 1] = jetColor.g;
      jetColors[i * 3 + 2] = jetColor.b;
    }

    jetGeo.setAttribute('position', new THREE.BufferAttribute(jetPositions, 3));
    jetGeo.setAttribute('color', new THREE.BufferAttribute(jetColors, 3));

    const jetMat = new THREE.PointsMaterial({
      size: 0.16,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.7
    });

    const polarJets = new THREE.Points(jetGeo, jetMat);
    blackHoleGroup.add(polarJets);
    polarJetsRef.current = polarJets;

    // 7. BACKGROUND DEEP SPACE STARFIELD (5,000 stars)
    const starCount = 5000;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const distance = 40 + Math.random() * 85;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      starPositions[i * 3] = distance * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = distance * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = distance * Math.cos(phi);

      const colorSeed = Math.random();
      const starColor = new THREE.Color();
      if (colorSeed > 0.85) {
        starColor.setRGB(0.7, 0.9, 1.0);
      } else if (colorSeed > 0.6) {
        starColor.setRGB(1.0, 0.85, 0.6);
      } else {
        starColor.setRGB(0.9, 0.95, 1.0);
      }

      starColors[i * 3] = starColor.r;
      starColors[i * 3 + 1] = starColor.g;
      starColors[i * 3 + 2] = starColor.b;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.85
    });

    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);
    starFieldRef.current = starField;

    // =========================================================================
    // 8. INSIDE THE BLACK HOLE: 3D STAR WARP TUNNEL & HYPERSPACE EFFECTS
    // (Activates when scrolled to "Ready to Sell & Commission Websites")
    // =========================================================================
    const internalStarCount = 6500;
    const internalStarGeo = new THREE.BufferGeometry();
    const internalStarPositions = new Float32Array(internalStarCount * 3);
    const internalStarColors = new Float32Array(internalStarCount * 3);
    const internalStarData = new Float32Array(internalStarCount * 3); // radius, theta, speed

    const colorWarpCyan = new THREE.Color(0x38bdf8);
    const colorWarpViolet = new THREE.Color(0xc084fc);
    const colorWarpWhite = new THREE.Color(0xffffff);
    const colorWarpAmber = new THREE.Color(0xf59e0b);
    const colorWarpAqua = new THREE.Color(0x22d3ee);

    for (let i = 0; i < internalStarCount; i++) {
      // Cylindrical funnel distribution along Z tunnel
      const r = 0.6 + Math.pow(Math.random(), 1.5) * 20;
      const theta = Math.random() * Math.PI * 2;
      const z = (Math.random() - 0.5) * 80; // spanning from -40 to +40
      const speed = 24 + Math.random() * 32;

      internalStarData[i * 3] = r;
      internalStarData[i * 3 + 1] = theta;
      internalStarData[i * 3 + 2] = speed;

      internalStarPositions[i * 3] = r * Math.cos(theta);
      internalStarPositions[i * 3 + 1] = r * Math.sin(theta);
      internalStarPositions[i * 3 + 2] = z;

      const starColor = new THREE.Color();
      const seed = Math.random();
      if (seed < 0.35) {
        starColor.copy(colorWarpCyan);
      } else if (seed < 0.65) {
        starColor.copy(colorWarpWhite);
      } else if (seed < 0.85) {
        starColor.copy(colorWarpViolet);
      } else if (seed < 0.95) {
        starColor.copy(colorWarpAqua);
      } else {
        starColor.copy(colorWarpAmber);
      }

      internalStarColors[i * 3] = starColor.r;
      internalStarColors[i * 3 + 1] = starColor.g;
      internalStarColors[i * 3 + 2] = starColor.b;
    }

    internalStarGeo.setAttribute('position', new THREE.BufferAttribute(internalStarPositions, 3));
    internalStarGeo.setAttribute('color', new THREE.BufferAttribute(internalStarColors, 3));
    internalStarDataRef.current = internalStarData;

    const internalStarMat = new THREE.PointsMaterial({
      size: 0.38,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.0 // Fades in smoothly when inside the black hole
    });

    const internalStarTunnel = new THREE.Points(internalStarGeo, internalStarMat);
    scene.add(internalStarTunnel);
    internalStarTunnelRef.current = internalStarTunnel;
    internalStarTunnelMatRef.current = internalStarMat;

    // 9. HYPERSPACE WORMHOLE ENERGETIC RINGS (Concentric 3D depth conduits)
    const wormholeRingsGroup = new THREE.Group();
    const ringCount = 8;
    const ringMeshes: THREE.Mesh[] = [];

    for (let r = 0; r < ringCount; r++) {
      const ringRadius = 2.8 + r * 1.8;
      const ringGeo = new THREE.TorusGeometry(ringRadius, 0.04, 10, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: r % 2 === 0 ? 0x38bdf8 : 0xf59e0b,
        wireframe: true,
        transparent: true,
        opacity: 0.0,
        blending: THREE.AdditiveBlending
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.z = -r * 8 + 8;
      wormholeRingsGroup.add(ringMesh);
      ringMeshes.push(ringMesh);
    }
    scene.add(wormholeRingsGroup);
    wormholeRingsGroupRef.current = wormholeRingsGroup;

    // 10. QUANTUM SINGULARITY CORE SHELL (Inner luminescent veil)
    const quantumCoreGeo = new THREE.SphereGeometry(3.6, 32, 32);
    const quantumCoreMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending
    });
    const quantumCoreShell = new THREE.Mesh(quantumCoreGeo, quantumCoreMat);
    scene.add(quantumCoreShell);
    quantumCoreShellRef.current = quantumCoreShell;
    quantumCoreMatRef.current = quantumCoreMat;

    // Resize Observer
    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Mouse movement listener for tactile 3D parallax
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseRef.current.targetX = (e.clientX / innerWidth - 0.5) * 2;
      mouseRef.current.targetY = (e.clientY / innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Render loop variables
    let frameCount = 0;
    let fpsTime = performance.now();
    const clock = new THREE.Clock();

    // Camera current lerped lookAt target
    const currentLookAt = new THREE.Vector3(0, 0, 0);

    // Animation Loop
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // FPS Telemetry
      frameCount++;
      if (performance.now() - fpsTime >= 1000) {
        if (onFpsUpdate) onFpsUpdate(frameCount);
        frameCount = 0;
        fpsTime = performance.now();
      }

      // Smooth mouse damping
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Warp speed acceleration
      const targetWarp = warpActive ? 3.5 : 1.0;
      warpSpeedRef.current += (targetWarp - warpSpeedRef.current) * 0.08;
      const currentWarp = warpSpeedRef.current;

      const progress = Math.min(Math.max(pageProgressRef.current, 0), keyframes.length - 1);
      const activeIdx = Math.round(progress);
      setActiveSectionIndex(activeIdx);
      if (keyframes[activeIdx]) {
        setActiveViewLabel(keyframes[activeIdx].modeLabel);
      }

      // Calculate insideFactor (peaks when in Section 4: Ready to Sell & Commission)
      // Between progress 3.2 and 4.8, camera plunges inside the black hole
      let insideFactor = 0;
      if (progress >= 3.2 && progress <= 4.8) {
        const dist = Math.abs(progress - 4.0);
        const factor = Math.max(0, 1.0 - dist / 0.8);
        insideFactor = factor * factor * (3 - 2 * factor);
      }

      // 1. Accretion Disk Rotation & Keplerian Physics
      if (accretionDiskRef.current) {
        const positions = accretionDiskRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < diskParticleCount; i++) {
          const r = diskRadii[i];
          const speed = diskSpeeds[i] * currentWarp;
          diskAngles[i] += speed * delta;
          const theta = diskAngles[i];

          positions[i * 3] = r * Math.cos(theta);
          positions[i * 3 + 2] = r * Math.sin(theta);
        }
        accretionDiskRef.current.geometry.attributes.position.needsUpdate = true;
      }

      // 2. Spiral Inward Stardust Ingestion
      if (spiralDustRef.current) {
        const positions = spiralDustRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < spiralCount; i++) {
          let r = spiralData[i * 3];
          let theta = spiralData[i * 3 + 1];
          const speed = spiralData[i * 3 + 2] * currentWarp;

          r -= 0.6 * delta * (1.0 / Math.max(r * 0.3, 0.4));
          theta += (0.9 / (r + 0.1)) * delta * currentWarp;

          if (r < innerRadius * 0.95) {
            r = 14 + Math.random() * 3;
            theta = Math.random() * Math.PI * 2;
          }

          spiralData[i * 3] = r;
          spiralData[i * 3 + 1] = theta;

          positions[i * 3] = r * Math.cos(theta);
          positions[i * 3 + 2] = r * Math.sin(theta);
        }
        spiralDustRef.current.geometry.attributes.position.needsUpdate = true;
      }

      // 3. Polar Jets Pulsation
      if (polarJetsRef.current) {
        const positions = polarJetsRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < jetCount; i++) {
          let y = positions[i * 3 + 1];
          const isNorth = y >= 0;
          const jetSpeed = (5.5 + Math.random() * 2) * currentWarp * delta;

          if (isNorth) {
            y += jetSpeed;
            if (y > 15) y = 1.6;
          } else {
            y -= jetSpeed;
            if (y < -15) y = -1.6;
          }
          positions[i * 3 + 1] = y;
        }
        polarJetsRef.current.geometry.attributes.position.needsUpdate = true;
      }

      // 4. Black Hole Group Dynamics
      if (blackHoleGroupRef.current) {
        blackHoleGroupRef.current.rotation.y = time * 0.08 * currentWarp;

        // Subtle parallax tilt when not inside
        if (insideFactor < 0.2) {
          blackHoleGroupRef.current.rotation.x = 0.28 + mouse.y * 0.12;
          blackHoleGroupRef.current.rotation.z = -0.15 + mouse.x * 0.12;
        }
      }

      // 5. Singularity Opacity & Opening when Inside
      if (singularityMatRef.current && singularityMeshRef.current) {
        // When entering inside, the black hole's shadow sphere opens up into the starry interior
        singularityMatRef.current.opacity = Math.max(0, 1.0 - insideFactor * 1.35);
        singularityMeshRef.current.visible = insideFactor < 0.92;
        singularityMeshRef.current.scale.setScalar(Math.max(0.08, 1.0 - insideFactor * 0.8));
      }

      // 6. UPDATE INSIDE THE BLACK HOLE: 3D WARP STARS
      if (internalStarTunnelRef.current && internalStarTunnelMatRef.current && internalStarDataRef.current) {
        // Smoothly fade in star tunnel opacity with full brilliance
        internalStarTunnelMatRef.current.opacity = insideFactor * 1.0;

        if (insideFactor > 0.01) {
          const pos = internalStarTunnelRef.current.geometry.attributes.position.array as Float32Array;
          const data = internalStarDataRef.current;
          const travelRate = (20 + currentWarp * 16) * delta;

          for (let i = 0; i < internalStarCount; i++) {
            let r = data[i * 3];
            let theta = data[i * 3 + 1];
            const speed = data[i * 3 + 2];

            // Vortex rotation inside the singularity
            theta += (0.35 + currentWarp * 0.2) * delta;
            data[i * 3 + 1] = theta;

            // Z movement flying towards and past the camera
            let z = pos[i * 3 + 2];
            z += (speed / 28) * travelRate;

            // When passing behind camera, respawn far down the wormhole
            if (z > 14) {
              z = -48 - Math.random() * 26;
              r = 0.6 + Math.pow(Math.random(), 1.5) * 20;
              data[i * 3] = r;
            }

            pos[i * 3] = r * Math.cos(theta);
            pos[i * 3 + 1] = r * Math.sin(theta);
            pos[i * 3 + 2] = z;
          }
          internalStarTunnelRef.current.geometry.attributes.position.needsUpdate = true;
        }
      }

      // 7. UPDATE WORMHOLE ENERGETIC RINGS
      if (wormholeRingsGroupRef.current) {
        wormholeRingsGroupRef.current.rotation.z = time * 0.35;
        wormholeRingsGroupRef.current.children.forEach((mesh, idx) => {
          const ringMesh = mesh as THREE.Mesh;
          const ringMat = ringMesh.material as THREE.MeshBasicMaterial;
          ringMat.opacity = insideFactor * (0.65 + Math.sin(time * 3 + idx) * 0.2);
          ringMesh.rotation.x = Math.sin(time * 0.4 + idx) * 0.12;
          ringMesh.rotation.y = Math.cos(time * 0.35 + idx) * 0.12;
        });
      }

      // 8. UPDATE QUANTUM CORE SHELL
      if (quantumCoreMatRef.current && quantumCoreShellRef.current) {
        quantumCoreMatRef.current.opacity = insideFactor * 0.25;
        quantumCoreShellRef.current.rotation.y = time * 0.2;
        quantumCoreShellRef.current.rotation.x = time * 0.15;
      }

      // 9. BACKGROUND DEEP SPACE STARFIELD
      if (starFieldRef.current) {
        starFieldRef.current.rotation.y = time * 0.015;
        if (warpActive) {
          starFieldRef.current.scale.z = 2.4;
        } else {
          starFieldRef.current.scale.z += (1.0 - starFieldRef.current.scale.z) * 0.05;
        }
      }

      // 10. CAMERA CHOREOGRAPHY SYSTEM LINKED TO PAGE/SECTION SCROLL
      // Page 1 (0): Normal Front View
      // Page 2 (1): Orbital Trajectory
      // Page 3 (2): Other Side View (180° Rear View)
      // Page 4 (3): Top-Down View (Overhead Polar)
      // Page 5 (4): Inside Black Hole (3D Starfield Warp Tunnel)
      // Page 6 (5): Normal Black Hole View (Returns to normal)
      if (cameraRef.current) {
        const cam = cameraRef.current;

        const i = Math.floor(progress);
        const nextI = Math.min(i + 1, keyframes.length - 1);
        const frac = progress - i;

        // Cubic smoothstep interpolation
        const smoothT = frac * frac * (3 - 2 * frac);

        const kf1 = keyframes[i];
        const kf2 = keyframes[nextI];

        const targetPos = new THREE.Vector3().lerpVectors(kf1.pos, kf2.pos, smoothT);
        const targetLookAt = new THREE.Vector3().lerpVectors(kf1.lookAt, kf2.lookAt, smoothT);
        const targetUp = new THREE.Vector3().lerpVectors(kf1.up, kf2.up, smoothT).normalize();

        // Mouse Parallax depending on vantage mode
        if (i === 3 && nextI === 3) {
          // Top-down view: tilt overhead plane
          targetPos.x += mouse.x * 2.2;
          targetPos.z += mouse.y * 2.2;
        } else if (insideFactor > 0.3) {
          // Inside Black Hole: steer through wormhole with cursor
          targetLookAt.x += mouse.x * 3.8;
          targetLookAt.y += -mouse.y * 2.6;
          targetPos.x += mouse.x * 0.8;
          targetPos.y += -mouse.y * 0.8;
        } else {
          // Standard front/other-side orbits
          targetPos.x += mouse.x * 1.5;
          targetPos.y += -mouse.y * 1.0;
        }

        // Camera damping
        cam.position.lerp(targetPos, 0.055);
        currentLookAt.lerp(targetLookAt, 0.055);
        cam.up.lerp(targetUp, 0.055);
        cam.lookAt(currentLookAt);
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);

      singularityGeo.dispose();
      singularityMat.dispose();
      photonRingGeo.dispose();
      photonRingMat.dispose();
      haloGeo.dispose();
      haloMat.dispose();
      diskGeo.dispose();
      diskMat.dispose();
      spiralGeo.dispose();
      spiralMat.dispose();
      jetGeo.dispose();
      jetMat.dispose();
      starGeo.dispose();
      starMat.dispose();
      internalStarGeo.dispose();
      internalStarMat.dispose();
      quantumCoreGeo.dispose();
      quantumCoreMat.dispose();
      ringMeshes.forEach(m => {
        m.geometry.dispose();
        (m.material as THREE.Material).dispose();
      });
      glowTexture.dispose();
      particleTexture.dispose();

      renderer.dispose();
    };
  }, []);

  const handleJump = useCallback((sectionId: string) => {
    if (onJumpToSection) {
      onJumpToSection(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [onJumpToSection]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-black select-none"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
      
      {/* Subtle vignette & cosmic gradient film */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.65)_70%,rgba(0,0,0,0.95)_100%)] pointer-events-none" />

      {/* Floating 3D Telemetry HUD Pill (Shows current vantage point & quick view switcher) */}
      <div className="absolute bottom-6 right-6 hidden md:flex items-center gap-3 px-4 py-2 rounded-full bg-black/70 border border-white/10 backdrop-blur-md text-xs font-mono text-neutral-300 z-20 pointer-events-auto shadow-2xl">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-white/40 uppercase text-[10px]">Camera Orbit:</span>
          <span className="text-amber-300 font-bold uppercase">{activeViewLabel}</span>
        </div>

        <div className="h-3 w-px bg-white/10" />

        {/* Quick Jump Buttons */}
        <div className="flex items-center gap-1">
          {keyframes.map((kf, idx) => {
            const isActive = activeSectionIndex === idx;
            return (
              <button
                key={kf.shortTag}
                onClick={() => handleJump(kf.sectionId)}
                title={`Jump to ${kf.modeLabel}`}
                className={`px-2 py-0.5 rounded text-[10px] transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold shadow-[0_0_8px_rgba(245,158,11,0.3)]'
                    : 'text-neutral-500 hover:text-neutral-300 hover:bg-white/5 border border-transparent'
                }`}
              >
                {kf.shortTag}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
