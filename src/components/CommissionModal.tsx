import React, { useState } from 'react';
import { X, Send, Sparkles, Check, Copy, Rocket, ShieldCheck, Mail } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CommissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPackage?: string;
}

export const CommissionModal: React.FC<CommissionModalProps> = ({
  isOpen,
  onClose,
  defaultPackage
}) => {
  if (!isOpen) return null;

  const initialStyle = defaultPackage || '3D Interactive & Cinematic (Three.js / WebGL)';
  const [styleSelection, setStyleSelection] = useState<string>(initialStyle);
  const [customStyle, setCustomStyle] = useState<string>('');
  
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [timeline, setTimeline] = useState<string>('Standard (1-2 Weeks)');
  const [budgetSelection, setBudgetSelection] = useState<string>('$1,000 – $3,000 (Recommended)');
  const [customBudget, setCustomBudget] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [sent, setSent] = useState<boolean>(false);

  // Compute final effective style and budget
  const effectiveStyle = customStyle.trim()
    ? customStyle.trim()
    : styleSelection === 'custom'
      ? 'Custom Tailored Style'
      : styleSelection;

  const effectiveBudget = customBudget.trim()
    ? customBudget.trim()
    : budgetSelection === 'custom'
      ? 'Negotiable / Custom'
      : budgetSelection;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 }
    });

    const subject = encodeURIComponent(`MR TEJ Website Commission: ${effectiveStyle} (${name || 'Client'})`);
    const body = encodeURIComponent(
      `Hello MR TEJ,\n\nI want to commission or purchase a website.\n\nWebsite Style: ${effectiveStyle}\nBudget Scope: ${effectiveBudget}\nTimeline: ${timeline}\nClient Name: ${name}\nClient Email: ${email}\n\nProject Scope & Notes:\n${notes}\n\nLooking forward to hearing from you!`
    );
    window.location.href = `mailto:tejakuppala9@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleCopy = () => {
    const text = `MR TEJ Website Commission
Style / Look: ${effectiveStyle}
Budget: ${effectiveBudget}
Timeline: ${timeline}
Client: ${name || 'Anonymous'} (${email || 'No email'})
Scope & Notes: ${notes || 'Ready to discuss'}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-neutral-950 border border-amber-500/40 shadow-[0_0_60px_rgba(245,158,11,0.25)] p-6 sm:p-8 text-left">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 mb-2">
          <Sparkles className="w-4 h-4" />
          <span>Commission Singularities</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight mb-2">
          Hire MR TEJ to Build Your Website
        </h3>
        <p className="text-xs sm:text-sm text-neutral-400 mb-6">
          Ready to launch high-converting 3D experiences, SaaS architectures, or buy verified blueprints.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                Website Style & Look
              </label>
              <span className="text-[10px] font-mono text-amber-400">Select preset or type manually</span>
            </div>
            <select
              value={styleSelection}
              onChange={(e) => setStyleSelection(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-500"
            >
              <option value="3D Interactive & Cinematic (Three.js / WebGL)">3D (Three.js, Shaders & Kinetic)</option>
              <option value="Plain & Minimalist">Plain (Minimalist & Clean)</option>
              <option value="Dark Mode / Luxury Cosmic">Dark (Deep Cosmic & Glow Accents)</option>
              <option value="Professional & Corporate SaaS">Professional (Clean SaaS & Corporate)</option>
              <option value="Aesthetic Look & Editorial">Aesthetic Look (Editorial & Creative)</option>
              <option value="Normal & Clean Standard Web">Normal (Balanced & Standard Web)</option>
              <option value="Futuristic Cyberpunk / Neo-Tech">Futuristic Cyberpunk (High-Tech Neon)</option>
              <option value="Creative Visual Portfolio">Creative Portfolio (Showcase & Motion)</option>
              <option value="custom">Custom Style (Type manually below)...</option>
            </select>

            {/* Client can type manually what style they want */}
            <div className="mt-2">
              <input
                type="text"
                placeholder={styleSelection === 'custom' ? "Type your desired website style (e.g. brutalist, retro, pastel)..." : "Or type custom style manually (e.g. sleek dark aesthetic)..."}
                value={customStyle}
                onChange={(e) => {
                  setCustomStyle(e.target.value);
                  if (styleSelection !== 'custom' && e.target.value.trim().length > 0) {
                    setStyleSelection('custom');
                  }
                }}
                className="w-full px-3.5 py-2 rounded-xl bg-neutral-900/90 border border-white/10 text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                Your Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Maya Lin"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs placeholder:text-neutral-600 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                Your Email
              </label>
              <input
                type="email"
                required
                placeholder="maya@startup.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs placeholder:text-neutral-600 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                Target Timeline
              </label>
              <select
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-500"
              >
                <option value="Urgent (2-4 Days)">Urgent (2 – 4 Days)</option>
                <option value="Standard (1-2 Weeks)">Standard (1 – 2 Weeks)</option>
                <option value="Flexible (3-4 Weeks)">Flexible (3 – 4 Weeks)</option>
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                  Budget Scope
                </label>
                <span className="text-[10px] font-mono text-amber-400">Recommended or Manual</span>
              </div>
              <select
                value={budgetSelection}
                onChange={(e) => setBudgetSelection(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-500"
              >
                <option value="Starter (< $1,000)">Starter (&lt; $1,000)</option>
                <option value="$1,000 – $3,000 (Recommended)">$1,000 – $3,000 (Recommended)</option>
                <option value="$3,000 – $5,000 (Growth)">$3,000 – $5,000 (Growth)</option>
                <option value="$5,000 – $10,000 (Scale)">$5,000 – $10,000 (Scale)</option>
                <option value="$10,000+ (Enterprise)">$10,000+ (Enterprise)</option>
                <option value="custom">Custom Budget (Type manually below)...</option>
              </select>

              {/* Client can type manually what budget they want */}
              <div className="mt-2">
                <input
                  type="text"
                  placeholder={budgetSelection === 'custom' ? "Enter your budget (e.g. $2,500, ₹1.5L, negotiable)..." : "Or type custom budget manually..."}
                  value={customBudget}
                  onChange={(e) => {
                    setCustomBudget(e.target.value);
                    if (budgetSelection !== 'custom' && e.target.value.trim().length > 0) {
                      setBudgetSelection('custom');
                    }
                  }}
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-900/90 border border-white/10 text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
              Project Description / Requirements
            </label>
            <textarea
              rows={3}
              placeholder="Tell MR TEJ about your idea, inspirations, branding requirements..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs placeholder:text-neutral-600 focus:outline-none focus:border-amber-500 resize-none"
            />
          </div>

          <div className="pt-3 flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              className="flex-1 py-3 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_25px_rgba(245,158,11,0.5)] cursor-pointer"
            >
              <Rocket className="w-4 h-4 text-black" />
              <span>Submit Inquiry to MR TEJ</span>
            </button>

            <button
              type="button"
              onClick={handleCopy}
              className="py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-xs flex items-center justify-center gap-2 border border-white/10 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied' : 'Copy Brief'}</span>
            </button>
          </div>
        </form>

        <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-neutral-400">
          <div className="flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-amber-400" />
            <span>tejakuppala9@gmail.com</span>
          </div>
          <span className="text-emerald-400">● AVAILABLE NOW</span>
        </div>
      </div>
    </div>
  );
};
