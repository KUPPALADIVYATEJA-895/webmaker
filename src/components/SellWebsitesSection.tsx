import React, { useState } from 'react';
import { Sparkles, Check, ArrowRight, ShieldCheck, Clock, Rocket, Send } from 'lucide-react';
import { WEBSITE_PACKAGES } from '../data/projectsData';

interface SellWebsitesSectionProps {
  onOpenCommissionModal: (defaultPackage?: string) => void;
}

export const SellWebsitesSection: React.FC<SellWebsitesSectionProps> = ({
  onOpenCommissionModal
}) => {
  // Scope Calculator State
  const [projectType, setProjectType] = useState<string>('3d-landing');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    'threejs-shaders',
    'clean-code-handover'
  ]);

  const featureOptions = [
    { id: 'threejs-shaders', label: 'Custom Three.js / WebGL Shaders', timeAdd: '+2 Days' },
    { id: 'ai-integration', label: 'AI Intelligence Integration (Gemini / LLM)', timeAdd: '+3 Days' },
    { id: 'realtime-chat', label: 'Real-Time WebSockets / Social Mesh', timeAdd: '+3 Days' },
    { id: 'clean-code-handover', label: 'Clean Code Handover + Turnkey Cloud Setup', timeAdd: 'Included' },
    { id: 'speed-guarantee', label: '100/100 Lighthouse Performance Tuning', timeAdd: 'Included' }
  ];

  const toggleFeature = (id: string) => {
    setSelectedFeatures(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const calculateEstimate = () => {
    let baseTime = 5;
    if (projectType === 'saas-app') baseTime = 12;
    if (projectType === 'blueprint-transfer') baseTime = 2;
    if (projectType === 'ecommerce-3d') baseTime = 8;

    const extraDays = selectedFeatures.filter(
      f => f === 'threejs-shaders' || f === 'ai-integration' || f === 'realtime-chat'
    ).length * 2;

    return {
      days: `${baseTime + extraDays} – ${baseTime + extraDays + 3} Days`,
      confidence: '100% On-Time Delivery Guarantee'
    };
  };

  const estimate = calculateEstimate();

  return (
    <section
      id="services"
      className="relative min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-24 z-10"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-300 uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Turnkey Deployments & Bespoke Engineering</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Ready to Sell & Commission Websites
          </h2>
        </div>

        {/* 3 Core Packages Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {WEBSITE_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative p-7 rounded-3xl border flex flex-col justify-between transition-all duration-300 ${
                pkg.popular
                  ? 'bg-neutral-900/90 border-amber-500/60 shadow-[0_0_40px_rgba(245,158,11,0.25)] -translate-y-2'
                  : 'bg-black/60 border-white/10 hover:border-white/20'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-black font-extrabold text-[11px] uppercase tracking-wider shadow-lg">
                  Most Requested Blueprint
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-amber-300 uppercase tracking-wider">
                    {pkg.tier}
                  </span>
                  <span className="text-xs font-mono text-neutral-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-400" />
                    <span>{pkg.deliveryTime}</span>
                  </span>
                </div>

                <h3 className="text-2xl font-display font-extrabold text-white tracking-tight mb-2">
                  {pkg.title}
                </h3>
                <p className="text-xs text-neutral-400 mb-6 leading-relaxed">
                  {pkg.idealFor}
                </p>

                <div className="space-y-3 mb-8 pt-4 border-t border-white/10">
                  {pkg.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                      <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                id={`commission-${pkg.id}`}
                onClick={() => onOpenCommissionModal(pkg.title)}
                className={`w-full py-3.5 rounded-xl font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  pkg.popular
                    ? 'bg-amber-500 hover:bg-amber-400 text-black shadow-[0_0_20px_rgba(245,158,11,0.4)]'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
                }`}
              >
                <span>Select Package</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Interactive Custom Website Scope & Cost Estimator */}
        <div className="p-8 sm:p-10 rounded-3xl bg-transparent border border-white/10 backdrop-blur-none mb-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
            <div>
              <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">
                Interactive Calculator
              </span>
              <h3 className="text-2xl font-display font-bold text-white mt-1">
                Customize Your Next Website
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 rounded-xl bg-transparent border border-white/10 text-right">
                <span className="text-[10px] font-mono text-neutral-400 uppercase">Estimated Turnaround</span>
                <div className="text-base font-bold text-amber-300">{estimate.days}</div>
              </div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {/* Project Category Selection */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3">
                1. Select Platform Architecture
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: '3d-landing', label: '3D Cinematic Landing Page', icon: '🌌' },
                  { id: 'saas-app', label: 'Custom Full-Stack Web App', icon: '⚡' },
                  { id: 'blueprint-transfer', label: 'StudyShelf / FriendChat Clone', icon: '🚀' },
                  { id: 'ecommerce-3d', label: 'Spatial 3D Product Showcase', icon: '💎' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setProjectType(cat.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      projectType === cat.id
                        ? 'bg-amber-500/10 border-amber-500/60 text-white shadow-[0_0_15px_rgba(245,158,11,0.15)]'
                        : 'bg-transparent border-white/10 text-neutral-400 hover:text-white hover:border-white/20'
                    }`}
                  >
                    <span className="text-lg block mb-1">{cat.icon}</span>
                    <span className="text-xs font-bold block">{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Feature Selection Checklist */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3">
                2. Select Architectural Features
              </label>
              <div className="space-y-2.5">
                {featureOptions.map((f) => {
                  const isChecked = selectedFeatures.includes(f.id);
                  return (
                    <div
                      key={f.id}
                      onClick={() => toggleFeature(f.id)}
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                        isChecked
                          ? 'bg-white/[0.03] border-amber-500/30 text-white'
                          : 'bg-transparent border-white/5 text-neutral-400 hover:border-white/15'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded border flex items-center justify-center ${
                            isChecked
                              ? 'bg-amber-500 border-amber-500 text-black'
                              : 'border-white/20 bg-transparent'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 text-black stroke-[3]" />}
                        </div>
                        <span className="text-xs font-medium">{f.label}</span>
                      </div>
                      <span className="text-[11px] font-mono text-amber-400/80">{f.timeAdd}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Commission Action Trigger */}
            <div className="pt-4 flex justify-center">
              <button
                type="button"
                onClick={() => onOpenCommissionModal(projectType)}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(245,158,11,0.4)] cursor-pointer"
              >
                <Rocket className="w-4 h-4 text-black" />
                <span>Commission Custom Website ({estimate.days})</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quality & Delivery Assurance Guarantees */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="p-4 rounded-2xl bg-black/40 border border-white/5 flex flex-col items-center">
            <ShieldCheck className="w-5 h-5 text-amber-400 mb-2" />
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">100% IP & Code Ownership</h4>
            <p className="text-[11px] text-neutral-400 mt-1">Full source code, git commits, and zero vendor lock-in.</p>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-white/5 flex flex-col items-center">
            <Sparkles className="w-5 h-5 text-cyan-400 mb-2" />
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Performance Mandate</h4>
            <p className="text-[11px] text-neutral-400 mt-1">Guaranteed 60fps animations and sub-second edge loading.</p>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-white/5 flex flex-col items-center">
            <Clock className="w-5 h-5 text-purple-400 mb-2" />
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Turnkey Cloud Ingestion</h4>
            <p className="text-[11px] text-neutral-400 mt-1">Delivered ready to launch with domain and SSL configured.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
