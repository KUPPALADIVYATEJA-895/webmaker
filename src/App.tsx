import React, { useState, useEffect, useCallback } from 'react';
import { BlackHoleCanvas } from './components/BlackHoleCanvas';
import { HeaderNav } from './components/HeaderNav';
import { HeroSection } from './components/HeroSection';
import { MilestonesSection } from './components/MilestonesSection';
import { ArchitectureSection } from './components/ArchitectureSection';
import { ProjectsGallerySection } from './components/ProjectsGallerySection';
import { SellWebsitesSection } from './components/SellWebsitesSection';
import { FooterSection } from './components/FooterSection';
import { ProjectModal } from './components/ProjectModal';
import { CommissionModal } from './components/CommissionModal';
import { ProjectItem } from './types';
import { cosmicAudio } from './utils/audioSynth';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [pageProgress, setPageProgress] = useState<number>(0);
  const [warpActive, setWarpActive] = useState<boolean>(false);
  const [fps, setFps] = useState<number>(60);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [commissionModalOpen, setCommissionModalOpen] = useState<boolean>(false);
  const [selectedPackageForModal, setSelectedPackageForModal] = useState<string | undefined>(undefined);

  const SECTION_IDS = [
    'singularity',     // Page 1: Hero (MR TEJ) - Normal front view
    'milestones',      // Page 2: Milestones - Orbital vector
    'architecture',    // Page 3: Clean Code & Frameworks - Other side view (180° rear)
    'projects',        // Page 4: Previous Projects - Top-down view
    'services',        // Page 5: Ready to Sell & Commission - Inside black hole & 3D stars
    'footer-section'   // Page 6: Final Page - Normal black hole view
  ];

  // Track scroll position smoothly and calculate exact continuous page progress
  useEffect(() => {
    let ticking = false;

    const calculateProgress = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const totalHeight = document.documentElement.scrollHeight - vh;

      if (totalHeight > 0) {
        const progress = Math.min(Math.max(scrollY / totalHeight, 0), 1);
        setScrollProgress(progress);
      }

      // Calculate continuous page progress (0 to 5) based on section centers
      const viewportMid = scrollY + vh * 0.45;
      const centers: number[] = [];

      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const center = scrollY + rect.top + rect.height * 0.5;
          centers.push(center);
        } else {
          centers.push(-1);
        }
      }

      let computedPage = 0;
      if (centers[0] >= 0 && centers[centers.length - 1] >= 0) {
        if (viewportMid <= centers[0]) {
          computedPage = 0;
        } else if (viewportMid >= centers[centers.length - 1]) {
          computedPage = centers.length - 1;
        } else {
          for (let i = 0; i < centers.length - 1; i++) {
            const c1 = centers[i];
            const c2 = centers[i + 1];
            if (c1 >= 0 && c2 >= 0 && viewportMid >= c1 && viewportMid <= c2) {
              const span = Math.max(c2 - c1, 1);
              computedPage = i + (viewportMid - c1) / span;
              break;
            }
          }
        }
      } else if (totalHeight > 0) {
        computedPage = Math.min(Math.max((scrollY / totalHeight) * (SECTION_IDS.length - 1), 0), SECTION_IDS.length - 1);
      }

      setPageProgress(computedPage);
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          calculateProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    calculateProgress();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const handleWarpToggle = useCallback(() => {
    setWarpActive((prev) => {
      const next = !prev;
      if (next) {
        cosmicAudio.triggerWarpPulse();
      }
      return next;
    });
  }, []);

  const handleOpenCommission = useCallback((defaultPkg?: string) => {
    setSelectedPackageForModal(defaultPkg);
    setCommissionModalOpen(true);
  }, []);

  const handleJumpToSection = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-amber-500/30 selection:text-amber-200 overflow-x-hidden">
      {/* 3D Black Hole WebGL Experience (Fixed Background) */}
      <BlackHoleCanvas
        scrollProgress={scrollProgress}
        pageProgress={pageProgress}
        warpActive={warpActive}
        onFpsUpdate={setFps}
        onJumpToSection={handleJumpToSection}
      />

      {/* Global Navigation HUD */}
      <HeaderNav
        onWarpToggle={handleWarpToggle}
        warpActive={warpActive}
        onOpenCommission={() => handleOpenCommission()}
        fps={fps}
        activeSectionIndex={Math.round(pageProgress)}
      />

      {/* Scrollable Storytelling Layer */}
      <main className="relative z-10">
        {/* 1. Hero Cinematic Introduction: MR TEJ */}
        <HeroSection
          onOpenCommission={() => handleOpenCommission()}
          onWarpToggle={handleWarpToggle}
          warpActive={warpActive}
        />

        {/* 2. Professional Milestones with Parallax Effects */}
        <MilestonesSection />

        {/* 3. Clean Code & Cutting-Edge Web Frameworks Architecture */}
        <ArchitectureSection />

        {/* 4. Previous Projects: studyshelf.ai.studio & friendchat.ai.studio */}
        <ProjectsGallerySection
          onSelectProject={(project) => setSelectedProject(project)}
          onOpenCommission={() => handleOpenCommission()}
        />

        {/* 5. Sell Websites & Custom Commission Calculator */}
        <SellWebsitesSection
          onOpenCommissionModal={(pkg) => handleOpenCommission(pkg)}
        />
      </main>

      {/* Footer & Direct Ingestion Links */}
      <FooterSection onOpenCommission={() => handleOpenCommission()} />

      {/* Interactive Project Dossier Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onCommissionSimilar={() => handleOpenCommission(`Custom Platform like ${selectedProject?.title}`)}
      />

      {/* Interactive Commission & Purchase Modal */}
      <CommissionModal
        isOpen={commissionModalOpen}
        onClose={() => setCommissionModalOpen(false)}
        defaultPackage={selectedPackageForModal}
      />
    </div>
  );
}
