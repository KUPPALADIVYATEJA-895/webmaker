import React, { useState } from 'react';
import { Zap, Code2, Flame, Sparkles, CheckCircle2, ShieldCheck, Cpu } from 'lucide-react';
import { PROFESSIONAL_MILESTONES } from '../data/projectsData';

export const MilestonesSection: React.FC = () => {
  const [selectedMilestone, setSelectedMilestone] = useState<string>('m1');

  const getIcon = (name: string) => {
    switch (name) {
      case 'Zap': return <Zap className="w-5 h-5 text-amber-400" />;
      case 'Code2': return <Code2 className="w-5 h-5 text-cyan-400" />;
      case 'Flame': return <Flame className="w-5 h-5 text-orange-400" />;
      default: return <Sparkles className="w-5 h-5 text-purple-400" />;
    }
  };

  const activeMilestone = PROFESSIONAL_MILESTONES.find(m => m.id === selectedMilestone) || PROFESSIONAL_MILESTONES[0];

  return (
    <section
      id="milestones"
      className="relative min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-24 z-10"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Professional Milestones
          </h2>
          <p className="max-w-2xl text-neutral-400 text-sm sm:text-base mt-3">
            Quantifiable benchmarks in rendering velocity, software hygiene, and conversion architecture.
          </p>
        </div>

        {/* Milestone Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {PROFESSIONAL_MILESTONES.map((milestone) => {
            const isSelected = selectedMilestone === milestone.id;
            return (
              <div
                key={milestone.id}
                onClick={() => setSelectedMilestone(milestone.id)}
                className={`group relative p-6 rounded-2xl cursor-pointer transition-all duration-300 border ${
                  isSelected
                    ? 'bg-neutral-900/90 border-amber-500/60 shadow-[0_0_30px_rgba(245,158,11,0.2)] -translate-y-1'
                    : 'bg-black/50 border-white/10 hover:border-white/20 hover:bg-neutral-950/60'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                    {getIcon(milestone.iconName)}
                  </div>
                  <span className="text-[10px] font-mono text-neutral-500 tracking-wider">
                    {milestone.id.toUpperCase()}
                  </span>
                </div>

                <div className="font-display text-3xl font-extrabold text-white tracking-tight mb-1">
                  {milestone.metric}
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-amber-300 mb-2">
                  {milestone.label}
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {milestone.detail}
                </p>

                {isSelected && (
                  <div className="absolute bottom-2 right-4 text-[10px] font-mono text-amber-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>ACTIVE INSPECTION</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Interactive Deep-Dive Dossier for Selected Milestone */}
        <div className="p-6 sm:p-8 rounded-2xl bg-neutral-950/80 border border-white/10 backdrop-blur-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div className="flex items-center gap-4">
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                  Benchmark Dossier
                </span>
                <h3 className="text-xl font-bold text-white">
                  {activeMilestone.label} — Engineering Standard
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-4 py-2 rounded-xl bg-black/60 border border-white/10 text-right">
                <div className="text-xs font-mono text-neutral-400">Target Standard</div>
                <div className="text-lg font-bold text-emerald-400">{activeMilestone.metric}</div>
              </div>
              <div className="px-4 py-2 rounded-xl bg-black/60 border border-white/10 text-right">
                <div className="text-xs font-mono text-neutral-400">Validation</div>
                <div className="text-sm font-semibold text-amber-300">Continuous CI/CD</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            <div className="space-y-2">
              <span className="text-xs font-mono text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Production Rigor</span>
              </span>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Every line of client code undergoes automated linting, type-contract enforcement, and frame-rate profiling on low-power hardware.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Turnkey Readiness</span>
              </span>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Websites are delivered with clean repository commits, environment configuration templates, and comprehensive architectural documentation.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                <span>Business Impact</span>
              </span>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Hyper-fast load speeds directly correlate with lower bounce rates, higher search engine rank, and elevated visitor conversion rates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
