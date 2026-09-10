import React from 'react';
import { Sparkles, ArrowDown, ChevronRight, Terminal, Globe, Code } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroSectionProps {
  onOpenCommission: () => void;
  onWarpToggle: () => void;
  warpActive: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenCommission,
  onWarpToggle,
  warpActive
}) => {
  const scrollToMilestones = () => {
    const el = document.getElementById('milestones');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="singularity"
      className="relative min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 pt-24 pb-16 z-10 select-none"
    >
      <div className="max-w-5xl mx-auto w-full flex flex-col items-center text-center">
        {/* Status Indicator Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/60 border border-amber-500/30 backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(245,158,11,0.15)]"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-xs font-mono tracking-wider text-amber-200/90 uppercase">
            Ready to Build & Sell Custom Websites
          </span>
          <span className="text-white/20">|</span>
          <span className="text-xs font-mono text-cyan-300">Singularity Core Online</span>
        </motion.div>

        {/* Cinematic Name: MR TEJ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-6"
        >
          {/* Optical ambient glow behind the name */}
          <div className="absolute -inset-x-12 -inset-y-6 bg-gradient-to-r from-amber-500/20 via-cyan-500/20 to-amber-500/20 blur-3xl opacity-60 pointer-events-none" />
          
          <h1 className="relative font-display text-6xl sm:text-8xl md:text-9xl font-black tracking-tight text-white leading-none">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-neutral-100 to-amber-200/80 drop-shadow-[0_0_35px_rgba(245,158,11,0.4)]">
              MR TEJ
            </span>
          </h1>
          
          <div className="mt-2 text-xs sm:text-sm font-mono tracking-[0.35em] text-amber-400 uppercase font-semibold">
            Interstellar 3D Web Architect
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
        >
          <button
            id="hero-buy-website-btn"
            onClick={onOpenCommission}
            className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm tracking-wider uppercase transition-all duration-300 shadow-[0_0_30px_rgba(245,158,11,0.4)] hover:shadow-[0_0_50px_rgba(245,158,11,0.7)] hover:-translate-y-0.5 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-black" />
            <span>Order a Custom Website</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            id="hero-explore-projects-btn"
            onClick={scrollToMilestones}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium text-sm border border-white/15 hover:border-amber-400/50 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5"
          >
            <span>Explore Work & Projects</span>
            <ArrowDown className="w-4 h-4 text-neutral-400" />
          </button>

          <button
            id="hero-warp-toggle-btn"
            onClick={onWarpToggle}
            className={`inline-flex items-center gap-2 px-4 py-3.5 rounded-xl border text-sm font-mono transition-all backdrop-blur-md ${
              warpActive
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_25px_rgba(6,182,212,0.4)]'
                : 'bg-black/50 border-white/10 text-neutral-400 hover:text-cyan-300 hover:border-cyan-500/30'
            }`}
          >
            <span className="text-xs">WARP ENGINE:</span>
            <span className={warpActive ? 'text-cyan-300 font-bold' : 'text-neutral-500'}>
              {warpActive ? 'ACTIVE (3.5X)' : 'STANDBY'}
            </span>
          </button>
        </motion.div>

        {/* Spacecraft / Telemetry HUD Dock */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="w-full max-w-3xl grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-xl"
        >
          <div className="flex flex-col items-center p-3 rounded-xl bg-white/[0.03] border border-white/5">
            <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Singularity</span>
            <span className="text-sm font-bold text-white mt-1">4.3M M☉</span>
            <span className="text-[11px] text-amber-400/80 font-mono">Gargantua Scale</span>
          </div>

          <div className="flex flex-col items-center p-3 rounded-xl bg-white/[0.03] border border-white/5">
            <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Rendering</span>
            <span className="text-sm font-bold text-white mt-1">WebGL 2.0</span>
            <span className="text-[11px] text-emerald-400 font-mono">60 FPS Hardware</span>
          </div>

          <div className="flex flex-col items-center p-3 rounded-xl bg-white/[0.03] border border-white/5">
            <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Availability</span>
            <span className="text-sm font-bold text-white mt-1">Immediate</span>
            <span className="text-[11px] text-amber-300 font-mono">Custom Delivery</span>
          </div>

          <div className="flex flex-col items-center p-3 rounded-xl bg-white/[0.03] border border-white/5">
            <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Code Standard</span>
            <span className="text-sm font-bold text-white mt-1">Zero Bloat</span>
            <span className="text-[11px] text-cyan-300 font-mono">Clean Architecture</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
