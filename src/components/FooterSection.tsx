import React from 'react';
import { ArrowUp, Mail, Globe, Sparkles, Terminal, Code2 } from 'lucide-react';

interface FooterSectionProps {
  onOpenCommission: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ onOpenCommission }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer-section" className="relative border-t border-white/10 bg-transparent px-4 sm:px-8 py-16 z-10 text-left">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-white/10">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-black border border-amber-500/60 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.4)]">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              </div>
              <span className="font-display font-black text-xl text-white tracking-wider">
                MR TEJ
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-sm leading-relaxed">
              Interstellar 3D Web Architect. Crafting high-converting 3D experiences, spatial physics, and resilient full-stack applications with clean code.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-xs font-mono text-emerald-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for Client Website Sales & Commissions</span>
            </div>
          </div>

          {/* Previous Projects */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block mb-2">
              Featured Flagships
            </span>
            <div className="space-y-2 text-xs">
              <a
                href="https://studyshelf.ai.studio"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition-colors"
              >
                <div>
                  <div className="font-bold text-white group-hover:text-amber-300">StudyShelf</div>
                  <div className="text-[10px] text-neutral-400 font-mono">studyshelf.ai.studio</div>
                </div>
                <Globe className="w-4 h-4 text-neutral-500 group-hover:text-amber-400" />
              </a>

              <a
                href="https://friendchat.ai.studio"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition-colors"
              >
                <div>
                  <div className="font-bold text-white group-hover:text-cyan-300">FriendChat</div>
                  <div className="text-[10px] text-neutral-400 font-mono">friendchat.ai.studio</div>
                </div>
                <Globe className="w-4 h-4 text-neutral-500 group-hover:text-cyan-400" />
              </a>
            </div>
          </div>

          {/* Quick Contact & Action */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block mb-2">
              Direct Contact
            </span>
            <div className="space-y-2 text-xs font-mono">
              <a
                href="mailto:tejakuppala9@gmail.com"
                className="flex items-center gap-2 text-neutral-300 hover:text-amber-300 transition-colors"
              >
                <Mail className="w-4 h-4 text-amber-400" />
                <span>tejakuppala9@gmail.com</span>
              </a>
              <div className="text-[11px] text-neutral-500 pt-1">
                Response Time: &lt; 24 Hours
              </div>
              <button
                onClick={onOpenCommission}
                className="w-full mt-3 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)] cursor-pointer"
              >
                Hire MR TEJ
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <div className="flex items-center gap-3">
            <span>© {new Date().getFullYear()} MR TEJ. All rights reserved.</span>
            <span>•</span>
            <span className="text-neutral-400">Strict Clean Code Architecture</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to Singularity</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
