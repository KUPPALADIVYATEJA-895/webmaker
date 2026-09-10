import React, { useState } from 'react';
import { Volume2, VolumeX, Rocket, Sparkles, Send, Menu, X, ArrowUpRight } from 'lucide-react';
import { cosmicAudio } from '../utils/audioSynth';

interface HeaderNavProps {
  onWarpToggle: () => void;
  warpActive: boolean;
  onOpenCommission: () => void;
  fps: number;
  activeSectionIndex?: number;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  onWarpToggle,
  warpActive,
  onOpenCommission,
  fps,
  activeSectionIndex = 0
}) => {
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleAudioToggle = () => {
    const isPlaying = cosmicAudio.toggle();
    setAudioEnabled(isPlaying);
  };

  const navLinks = [
    { label: 'Singularity', href: '#singularity', index: 0 },
    { label: 'Milestones', href: '#milestones', index: 1 },
    { label: 'Clean Code', href: '#architecture', index: 2 },
    { label: 'Projects', href: '#projects', index: 3 },
    { label: 'Buy / Commission', href: '#services', index: 4 }
  ];

  return (
    <header
      id="header-nav"
      className="fixed top-0 left-0 w-full z-50 px-4 sm:px-8 py-3.5 transition-all duration-300 backdrop-blur-md bg-black/40 border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#singularity"
          className="group flex items-center gap-3 focus:outline-none"
        >
          <div className="relative w-9 h-9 rounded-full bg-black border border-amber-500/50 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:border-amber-400 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.5)]">
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-600/30 via-transparent to-cyan-500/30" />
            <div className="w-3.5 h-3.5 rounded-full bg-black border border-amber-300/80 shadow-[0_0_8px_#f59e0b]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-lg tracking-wider text-white group-hover:text-amber-300 transition-colors">
                MR TEJ
              </span>
              <span className="text-[10px] tracking-widest uppercase px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 hidden sm:inline-block">
                Architect
              </span>
            </div>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive = activeSectionIndex === link.index;
            return (
              <a
                key={link.label}
                href={link.href}
                className={`text-sm font-medium transition-all relative py-1 ${
                  isActive
                    ? 'text-amber-300 font-semibold after:w-full after:h-[2px] after:bg-amber-400 after:absolute after:bottom-0 after:left-0'
                    : 'text-white/70 hover:text-white hover:after:w-full after:w-0 after:h-[2px] after:bg-amber-400 after:absolute after:bottom-0 after:left-0 after:transition-all'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Action Controls & CTA */}
        <div className="flex items-center gap-3">
          {/* Audio Drone Toggle */}
          <button
            id="audio-toggle-btn"
            onClick={handleAudioToggle}
            aria-label="Toggle Cosmic Ambient Hum"
            className={`p-2 rounded-lg border transition-all ${
              audioEnabled
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                : 'bg-white/5 border-white/10 text-white/50 hover:text-white hover:bg-white/10'
            }`}
            title={audioEnabled ? 'Mute Cosmic Ambient Hum' : 'Play Cosmic Ambient Drone'}
          >
            {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Warp Speed Trigger */}
          <button
            id="warp-speed-btn"
            onClick={onWarpToggle}
            aria-label="Engage Warp Speed"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold tracking-wide transition-all ${
              warpActive
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.5)] animate-pulse'
                : 'bg-white/5 border-white/10 text-white/70 hover:text-cyan-300 hover:border-cyan-500/30'
            }`}
          >
            <Rocket className={`w-3.5 h-3.5 ${warpActive ? 'animate-bounce text-cyan-300' : ''}`} />
            <span className="hidden sm:inline">WARP</span>
          </button>

          {/* FPS Counter Pill */}
          <div className="hidden xl:flex items-center gap-1 px-2.5 py-1 rounded bg-black/60 border border-white/10 text-[11px] font-mono text-white/60">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>{fps || 60} FPS</span>
          </div>

          {/* Commission / Buy Website CTA */}
          <button
            id="nav-commission-btn"
            onClick={onOpenCommission}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold text-xs tracking-wide uppercase transition-all shadow-[0_0_20px_rgba(245,158,11,0.35)] hover:shadow-[0_0_30px_rgba(245,158,11,0.6)] cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-black" />
            <span>Hire / Buy</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 pt-3 border-t border-white/10 bg-black/95 rounded-xl p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs text-white/50 font-mono">
            <span>STATUS: READY FOR CLIENT PROJECTS</span>
            <span className="text-emerald-400">● AVAILABLE</span>
          </div>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-base text-white/80 hover:text-amber-300 py-1 flex items-center justify-between"
            >
              <span>{link.label}</span>
              <ArrowUpRight className="w-4 h-4 text-white/30" />
            </a>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenCommission();
            }}
            className="w-full mt-2 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs tracking-wider uppercase text-center"
          >
            Order Custom Website / Blueprint
          </button>
        </div>
      )}
    </header>
  );
};
