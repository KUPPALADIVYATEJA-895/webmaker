export interface ProjectItem {
  id: string;
  title: string;
  url: string;
  displayUrl: string;
  tagline: string;
  description: string;
  category: 'AI Platform' | 'Real-time Web' | '3D Experience' | 'SaaS Architecture';
  metrics: { label: string; value: string }[];
  technologies: string[];
  features: string[];
  themeColor: string;
  accentGlow: string;
  status: 'Live & Operational' | 'Ready to Deploy' | 'Client Featured';
  previewBadge?: string;
  architectureHighlights: string[];
}

export interface Milestone {
  id: string;
  metric: string;
  label: string;
  detail: string;
  iconName: string;
}

export interface ArchitecturePillar {
  id: string;
  title: string;
  subtitle: string;
  codeSnippet: string;
  description: string;
  highlights: string[];
  badge: string;
}

export interface WebsitePackage {
  id: string;
  title: string;
  tier: string;
  priceEstimate: string;
  deliveryTime: string;
  idealFor: string;
  features: string[];
  popular?: boolean;
}
