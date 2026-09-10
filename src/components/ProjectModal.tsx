import React from 'react';
import { X, ExternalLink, Sparkles, CheckCircle2, Cpu, Globe, ArrowRight, Shield } from 'lucide-react';
import { ProjectItem } from '../types';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onCommissionSimilar: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onCommissionSimilar
}) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-neutral-950 border border-white/15 shadow-2xl p-6 sm:p-8 text-left"
        style={{
          boxShadow: `0 0 80px -20px ${project.themeColor}40`
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-2">
          <span
            className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider"
            style={{
              borderColor: project.themeColor,
              color: project.themeColor,
              backgroundColor: `${project.themeColor}15`
            }}
          >
            {project.category}
          </span>
          <span className="text-xs font-mono text-emerald-400">● {project.status}</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight mb-2">
          {project.title}
        </h2>
        <p className="text-sm sm:text-base text-amber-300 font-mono mb-6">
          {project.tagline}
        </p>

        {/* Browser Mockup / Live Direct Link */}
        <div className="p-4 rounded-2xl bg-black/80 border border-white/10 mb-6">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-300">
              <Globe className="w-4 h-4 text-amber-400" />
              <span>https://{project.displayUrl}</span>
            </div>
            {project.url !== '#' && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider transition-all"
              >
                <span>Open Live Platform</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
          <p className="text-sm text-neutral-300 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {project.metrics.map((m, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-center"
            >
              <span className="text-[10px] font-mono text-neutral-400 uppercase">{m.label}</span>
              <div className="text-base font-bold text-white mt-1">{m.value}</div>
            </div>
          ))}
        </div>

        {/* Features & Architecture Highlights */}
        <div className="space-y-4 mb-8">
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Core Functional Highlights</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.features.map((f, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" />
              <span>Clean Code Architecture</span>
            </h4>
            <div className="space-y-1.5">
              {project.architectureHighlights.map((a, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                  <span>{a}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
              Technologies Utilized
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((t, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono text-neutral-300"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
          <div className="text-xs text-neutral-400 font-mono">
            Want an engine like this built for your product?
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {project.url !== '#' && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none text-center px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-xs border border-white/10 transition-colors"
              >
                Visit {project.displayUrl}
              </a>
            )}
            <button
              onClick={() => {
                onClose();
                onCommissionSimilar();
              }}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(245,158,11,0.4)] cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-black" />
              <span>Commission Similar App</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
