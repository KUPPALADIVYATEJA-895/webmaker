import React from 'react';
import { Terminal, Layers, ShieldCheck, Cpu, Zap, Code2 } from 'lucide-react';
import { ARCHITECTURE_PILLARS } from '../data/projectsData';

export const ArchitectureSection: React.FC = () => {
  const frameworks = [
    { name: 'React 19', role: 'Concurrent UI Engine', color: 'border-cyan-500/40 text-cyan-300' },
    { name: 'TypeScript 5.8', role: 'Type Safety & Contracts', color: 'border-blue-500/40 text-blue-300' },
    { name: 'Three.js & GLSL', role: 'GPU Spatial Shaders', color: 'border-amber-500/40 text-amber-300' },
    { name: 'Tailwind CSS v4', role: 'Fluid Layout Styling', color: 'border-teal-500/40 text-teal-300' },
    { name: 'Motion', role: 'Inertial Spring Physics', color: 'border-purple-500/40 text-purple-300' },
    { name: 'Edge Ingestion', role: 'Sub-second Global Latency', color: 'border-emerald-500/40 text-emerald-300' }
  ];

  return (
    <section
      id="architecture"
      className="relative min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-24 z-10"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-cyan-300 uppercase tracking-widest mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>Clean Code & Frameworks</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            How Projects Are Built
          </h2>
          <p className="max-w-2xl text-neutral-400 text-sm sm:text-base mt-3 text-balance">
            Every website and client platform is engineered with architectural rigor, modular isolation, and cutting-edge web frameworks that withstand enterprise scale.
          </p>
        </div>

        {/* Cutting-Edge Frameworks Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-12">
          {frameworks.map((fw) => (
            <div
              key={fw.name}
              className={`p-3.5 rounded-xl bg-black/60 border ${fw.color} backdrop-blur-md flex flex-col items-center text-center hover:scale-105 transition-transform`}
            >
              <span className="text-xs font-bold text-white">{fw.name}</span>
              <span className="text-[10px] text-neutral-400 font-mono mt-0.5">{fw.role}</span>
            </div>
          ))}
        </div>

        {/* Core Architectural Pillars in 3-Column Grid */}
        <div className="space-y-4">
          <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2 flex items-center justify-center gap-2">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>Core Architectural Pillars</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {ARCHITECTURE_PILLARS.map((pillar, idx) => (
              <div
                key={pillar.id}
                className="p-6 rounded-2xl border border-white/10 bg-black/70 hover:border-amber-500/50 hover:bg-neutral-950/80 transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-[0_0_25px_rgba(245,158,11,0.15)] group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-amber-300 group-hover:border-amber-500/40">
                      {pillar.badge}
                    </span>
                    <span className="text-xs font-mono text-neutral-500">
                      PILLAR 0{idx + 1}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                    {pillar.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-4">
                    {pillar.description}
                  </p>
                </div>

                <div className="space-y-2 pt-3 border-t border-white/5">
                  {pillar.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-neutral-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
