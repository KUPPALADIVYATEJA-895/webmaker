import { ProjectItem, Milestone, ArchitecturePillar, WebsitePackage } from '../types';

export const FEATURED_PROJECTS: ProjectItem[] = [
  {
    id: 'studyshelf',
    title: 'StudyShelf',
    url: 'https://studyshelf.ai.studio',
    displayUrl: 'studyshelf.ai.studio',
    tagline: 'Autonomous AI Knowledge Sanctuary & Dynamic Learning Engine',
    description:
      'A groundbreaking intelligent study companion engineered to ingest massive multi-format curriculum data, synthesize neural concept maps, generate contextual spaced-repetition decks, and deliver adaptive real-time tutoring with zero cognitive latency.',
    category: 'AI Platform',
    themeColor: '#f59e0b',
    accentGlow: 'rgba(245, 158, 11, 0.4)',
    status: 'Live & Operational',
    previewBadge: 'Flagship AI Project',
    metrics: [
      { label: 'Latency', value: '< 180ms' },
      { label: 'Syntheses', value: '100k+ Cards' },
      { label: 'Lighthouse Score', value: '99/100' },
      { label: 'Architecture', value: 'Edge SSR' }
    ],
    technologies: [
      'React 19',
      'TypeScript',
      'Tailwind CSS',
      'Gemini AI Models',
      'Vector Embeddings',
      'IndexedDB Sync'
    ],
    features: [
      'Multi-document automated syllabus extraction with neural summaries',
      'Interactive visual concept graphs rendered with GPU hardware acceleration',
      'Context-aware audio flashcard synthesis and conversational recall testing',
      'Instant offline-first resilience with background cloud synchronization'
    ],
    architectureHighlights: [
      'Streaming token parser with zero-flicker UI updates',
      'Optimistic state reconciliation across multi-tab sessions',
      'Sub-millisecond local fuzzy search indexing over 50,000 notes'
    ]
  },
  {
    id: 'friendchat',
    title: 'FriendChat',
    url: 'https://friendchat.ai.studio',
    displayUrl: 'friendchat.ai.studio',
    tagline: 'Next-Generation Real-Time Social Mesh & Dynamic Chat Hub',
    description:
      'A hyper-responsive collaborative communication system featuring low-latency encrypted message dispatch, dynamic spatial avatar rooms, AI copilot moderation, interactive media canvas streaming, and silky-smooth kinetic transitions.',
    category: 'Real-time Web',
    themeColor: '#06b6d4',
    accentGlow: 'rgba(6, 182, 212, 0.4)',
    status: 'Live & Operational',
    previewBadge: 'Real-Time Mesh Network',
    metrics: [
      { label: 'Dispatch', value: '12ms Ping' },
      { label: 'FPS', value: '60fps Flat' },
      { label: 'Concurrent Users', value: '10k+ Tested' },
      { label: 'Payload', value: 'Zero Bloat' }
    ],
    technologies: [
      'React 19',
      'WebSockets',
      'WebRTC Audio',
      'TypeScript',
      'Motion Kinetic Engine',
      'Tailwind CSS'
    ],
    features: [
      'Instant peer-to-peer WebRTC voice lounges with spatial audio separation',
      'Rich multi-threaded reactive discussions with inline markdown & code rendering',
      'Real-time collaborative whiteboarding alongside active chat streams',
      'Adaptive presence indicators with micro-second state heartbeat pulses'
    ],
    architectureHighlights: [
      'Zero-allocation message ring-buffers for flawless garbage collection cycles',
      'End-to-end type safety shared across message schema contracts',
      'Dynamic viewport virtualization ensuring 60fps scrolling on 100k+ chat rows'
    ]
  }
];

export const PROFESSIONAL_MILESTONES: Milestone[] = [
  {
    id: 'm1',
    metric: '60 FPS',
    label: 'GPU Performance',
    detail: 'Raymarched WebGL & Three.js architectures tuned for mobile & 4K displays with zero frame jitter.',
    iconName: 'Zap'
  },
  {
    id: 'm2',
    metric: '99.9%',
    label: 'Clean Code Standards',
    detail: 'Strict TypeScript typing, atomic component separation, and zero extraneous dependencies.',
    iconName: 'Code2'
  },
  {
    id: 'm3',
    metric: '< 0.8s',
    label: 'Global Edge Ingestion',
    detail: 'Sub-second first contentful paint and optimized asset pipelines for maximum conversion.',
    iconName: 'Flame'
  },
  {
    id: 'm4',
    metric: '100%',
    label: 'Bespoke Craftsmanship',
    detail: 'Handcrafted cosmic animations, tailored UX logic, and turnkey deployment ready for client handoff.',
    iconName: 'Sparkles'
  }
];

export const ARCHITECTURE_PILLARS: ArchitecturePillar[] = [
  {
    id: 'p1',
    title: 'Precision WebGL & Spatial Raymarching',
    subtitle: 'High-Impact Visual Engines',
    badge: 'Hardware Accelerated',
    description:
      'Websites built with custom fragment shaders, relativistic camera matrices, and particle simulations that captivate visitors instantly without bogging down device memory.',
    highlights: [
      'Custom GLSL vertex & fragment shaders',
      'Adaptive GPU tiering (auto scales from smartphones to RTX 4090s)',
      'Sub-pixel anti-aliasing & relativistic lensing distortion'
    ],
    codeSnippet: `// Accretion Disk Keplerian Velocity Shader
vec3 computeRelativisticDisk(vec2 uv, float time) {
  float r = length(uv);
  float theta = atan(uv.y, uv.x) - (0.8 / (r + 0.15)) * time;
  float doppler = 1.0 + 0.45 * cos(theta);
  vec3 baseGlow = mix(vec3(0.96, 0.62, 0.12), vec3(0.1, 0.8, 0.95), doppler);
  return baseGlow * (1.0 / (pow(r - 0.5, 2.0) + 0.08));
}`
  },
  {
    id: 'p2',
    title: 'Clean Modular Architecture & Type Safety',
    subtitle: 'Zero Technical Debt',
    badge: 'Enterprise Grade',
    description:
      'Every web application is engineered with pure semantic components, strict TypeScript contracts, isolated state containers, and decoupled UI layers that make expansion effortless.',
    highlights: [
      'Strict TypeScript 5.8+ type validation',
      'Component modularity with zero bloated global state',
      'Automated linting and rock-solid testability'
    ],
    codeSnippet: `// Immutable Architecture Contract
export interface CosmicAppArchitecture<TConfig> {
  readonly runtime: 'edge' | 'spa' | 'hybrid';
  readonly stateEngine: StateEngine<TConfig>;
  readonly telemetry: TelemetryCollector;
  deploy(): Promise<DeploymentReceipt>;
}`
  },
  {
    id: 'p3',
    title: 'Kinetic Micro-Interactions & Fluid UX',
    subtitle: 'Every Pixel Sings',
    badge: 'Delight Engine',
    description:
      'Interfaces should never feel static. Using spring physics, magnetic button bounds, and scroll-linked coordinate transforms, every action feels tactile, responsive, and alive.',
    highlights: [
      'Inertial scroll dampening and parallax depth vectors',
      'Hover-activated interactive preview portals',
      'Accessible focus outlines and screen-reader friendliness'
    ],
    codeSnippet: `// Kinetic Magnetic Cursor & Inertial Physics
const springConfig = { stiffness: 450, damping: 28, mass: 0.6 };
const cursorX = useSpring(mouseX, springConfig);
const cursorY = useSpring(mouseY, springConfig);
const gravitationalTension = useTransform(cursorX, [-100, 100], [-12, 12]);`
  }
];

export const WEBSITE_PACKAGES: WebsitePackage[] = [
  {
    id: 'showcase-3d',
    title: '3D Cinematic Landing Page',
    tier: 'Signature Experience',
    priceEstimate: 'Custom / Project Based',
    deliveryTime: '5 – 10 Days',
    popular: true,
    idealFor: 'High-growth startups, personal brands, Web3/AI platforms, luxury launches',
    features: [
      'Custom 3D WebGL / Three.js interactive canvas scene',
      'Kinetic scroll-driven storytelling & parallax physics',
      'Responsive design across mobile, tablet, desktop, and 4K',
      '100/100 Lighthouse performance optimization',
      'Full source code handover + 1-click cloud deployment',
      'Interactive inquiry & booking integration'
    ]
  },
  {
    id: 'ready-deploy',
    title: 'Ready-to-Deploy Blueprint',
    tier: 'Instant Acceleration',
    priceEstimate: 'Turnkey Transfer',
    deliveryTime: '24 – 48 Hours',
    popular: false,
    idealFor: 'Founders who need a verified, battle-tested platform live tomorrow',
    features: [
      'Full ownership of StudyShelf or FriendChat codebase architecture',
      'Custom branding, domain attachment, and color re-theming',
      'AI integration hooks (Gemini, WebSockets, or Cloud Storage)',
      'Complete documentation & environment configuration guide',
      '30 days post-launch technical assistance'
    ]
  },
  {
    id: 'fullstack-platform',
    title: 'Custom Full-Stack Web App',
    tier: 'Enterprise Scale',
    priceEstimate: 'Bespoke Milestone',
    deliveryTime: '2 – 4 Weeks',
    popular: false,
    idealFor: 'SaaS platforms, complex client portals, collaborative real-time apps',
    features: [
      'End-to-end full stack architecture (React 19 + Node/Serverless)',
      'Database modeling, security rules & API endpoints',
      'User authentication, role-based dashboards, and analytics',
      'Real-time data synchronization & payment processing',
      'Continuous deployment pipeline setup'
    ]
  }
];
