import React, { useState } from 'react';
import { ExternalLink, Sparkles, Layers, ArrowUpRight, Cpu, Eye, CheckCircle, Shield, Globe } from 'lucide-react';
import { FEATURED_PROJECTS } from '../data/projectsData';
import { ProjectItem } from '../types';

interface ProjectsGallerySectionProps {
  onSelectProject: (project: ProjectItem) => void;
  onOpenCommission: () => void;
}

export const ProjectsGallerySection: React.FC<ProjectsGallerySectionProps> = ({
  onSelectProject,
  onOpenCommission
}) => {
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  return (
    <section
      id="projects"
      className="relative min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-24 z-10"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-amber-300 uppercase tracking-widest mb-3">
            <Globe className="w-3.5 h-3.5" />
            <span>Deployed Singularities</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Featured Projects & Platforms
          </h2>
          <p className="max-w-2xl text-neutral-400 text-sm sm:text-base mt-3">
            Real-world flagship platforms engineered by MR TEJ. Explore active deployments or commission a custom version tailored to your brand.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="space-y-12">
          {FEATURED_PROJECTS.map((project, idx) => {
            const isHovered = hoveredProjectId === project.id;
            const isStudyShelf = project.id === 'studyshelf';
            const isFriendChat = project.id === 'friendchat';

            return (
              <div
                key={project.id}
                onMouseEnter={() => setHoveredProjectId(project.id)}
                onMouseLeave={() => setHoveredProjectId(null)}
                className={`group relative rounded-3xl border transition-all duration-500 overflow-hidden ${
                  isHovered
                    ? 'border-amber-500/50 bg-neutral-900/90 shadow-[0_0_50px_rgba(245,158,11,0.2)]'
                    : 'border-white/10 bg-black/60 hover:border-white/25'
                }`}
              >
                {/* Ambient glow accent inside card */}
                <div
                  className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none transition-opacity duration-500"
                  style={{ background: project.themeColor }}
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 items-center">
                  {/* Left Column: Visual Mockup / Landing Preview */}
                  <div className="lg:col-span-6 flex flex-col">
                    {/* Simulated Browser Frame */}
                    <div className="rounded-2xl border border-white/15 bg-black/80 overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
                      {/* Browser Title Bar */}
                      <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-950 border-b border-white/10">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                          <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 rounded bg-white/5 border border-white/10 text-[11px] font-mono text-neutral-300 max-w-[200px] truncate">
                          <span className="text-amber-400">https://</span>
                          <span>{project.displayUrl}</span>
                        </div>
                        <div className="w-8" />
                      </div>

                      {/* Mockup Canvas Screen */}
                      <div className="relative h-64 sm:h-72 p-6 flex flex-col justify-between overflow-hidden bg-gradient-to-br from-neutral-950 via-[#0a0a12] to-neutral-900">
                        {/* Interactive Visual Graphic inside Mockup */}
                        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

                        <div className="relative z-10 flex items-center justify-between">
                          <span
                            className="text-xs font-mono font-bold px-2.5 py-1 rounded-full border backdrop-blur-md uppercase tracking-wider"
                            style={{
                              borderColor: project.themeColor,
                              color: project.themeColor,
                              backgroundColor: `${project.themeColor}15`
                            }}
                          >
                            {project.previewBadge || project.category}
                          </span>
                          <span className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span>{project.status}</span>
                          </span>
                        </div>

                        {/* Middle Visual Representation */}
                        <div className="relative z-10 my-auto py-4">
                          <h4 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
                            {project.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-neutral-300 line-clamp-2 mt-1">
                            {project.tagline}
                          </p>

                          {/* Mini Feature Ticker */}
                          <div className="flex flex-wrap gap-2 mt-3">
                            {project.technologies.slice(0, 4).map((t, idx) => (
                              <span
                                key={idx}
                                className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-neutral-200 border border-white/10"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Bottom Bar: Live Link Preview Action */}
                        <div className="relative z-10 flex items-center justify-between pt-3 border-t border-white/10">
                          <span className="text-[11px] font-mono text-neutral-400">
                            Engineered by MR TEJ
                          </span>
                          {project.url !== '#' && (
                            <a
                              href={project.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-amber-300 transition-colors"
                            >
                              <span>Open Live Platform</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Project Dossier & Hover-Activated Details */}
                  <div className="lg:col-span-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">
                          PROJECT 0{idx + 1}
                        </span>
                        <span className="text-neutral-600">•</span>
                        <span className="text-xs font-mono text-cyan-300 uppercase tracking-wider">
                          {project.category}
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight mb-3">
                        {project.title}
                      </h3>

                      <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                        {project.description}
                      </p>

                      {/* Performance Metrics Strip */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
                        {project.metrics.map((m, mIdx) => (
                          <div
                            key={mIdx}
                            className="p-2.5 rounded-xl bg-white/[0.04] border border-white/5 flex flex-col items-center text-center"
                          >
                            <span className="text-[10px] font-mono text-neutral-400 uppercase">
                              {m.label}
                            </span>
                            <span className="text-sm font-bold text-white mt-0.5">
                              {m.value}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Hover-Activated Architecture Highlights */}
                      <div className="space-y-2 mb-6 p-4 rounded-xl bg-black/40 border border-white/5">
                        <div className="text-[11px] font-mono uppercase text-amber-400/90 tracking-wider flex items-center gap-1.5 mb-1">
                          <Cpu className="w-3.5 h-3.5" />
                          <span>Hover-Activated Architecture Blueprint</span>
                        </div>
                        {project.architectureHighlights.map((hl, hlIdx) => (
                          <div key={hlIdx} className="flex items-start gap-2 text-xs text-neutral-300">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{hl}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Links */}
                    <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
                      {project.url !== '#' ? (
                        <a
                          id={`link-${project.id}`}
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black hover:bg-neutral-200 font-bold text-xs tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
                        >
                          <ExternalLink className="w-3.5 h-3.5 text-black" />
                          <span>Launch {project.displayUrl}</span>
                        </a>
                      ) : (
                        <button
                          onClick={() => onSelectProject(project)}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Inspect 3D Blueprint</span>
                        </button>
                      )}

                      <button
                        onClick={() => onSelectProject(project)}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 text-xs font-medium transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5 text-neutral-400" />
                        <span>View Architecture Dossier</span>
                      </button>

                      <button
                        onClick={onOpenCommission}
                        className="inline-flex items-center gap-1.5 px-3 py-2.5 text-xs text-amber-300 hover:text-amber-200 font-mono transition-colors ml-auto cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Order Similar App</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
