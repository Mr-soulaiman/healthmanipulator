import React, { useState } from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import { PainterlyCloseIcon, PainterlyMenuIcon } from './ArtisticIcons';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

/**
 * Painterly Editorial Header with only:
 * - Blog name/logo
 * - Home | Blog | About
 */
export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isHome = currentPath === '/';
  const isBlog = currentPath === '/blog' || currentPath.startsWith('/blog/');
  const isCalculator = currentPath === '/calorie-calculator' || currentPath === '/calorie-calculator/';
  const isAbout = currentPath === '/about';

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(path);
  };

  return (
    <header className="sticky top-0 z-40 border-b-[3px] border-[#172033] bg-[#FFFDF8]">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-2.5 sm:px-6 sm:py-3 lg:px-8">
        <a
          href="/"
          onClick={(e) => handleNavClick(e, '/')}
          className="group flex items-center py-1 transition-opacity hover:opacity-90"
          aria-label="HealthManipulator Home"
        >
          <img
            src={SITE_CONFIG.branding.logoFull}
            alt="HealthManipulator"
            className="h-10 w-auto object-contain sm:h-12 md:h-13"
          />
        </a>

        <nav
          aria-label="Primary Navigation"
          className="hidden items-center gap-7 text-[15px] font-semibold text-[#172033] sm:flex"
        >
          <a
            href="/"
            onClick={(e) => handleNavClick(e, '/')}
            className={`relative py-1 transition-colors hover:text-[#F06449] ${
              isHome
                ? 'font-bold text-[#172033] after:absolute after:-bottom-0.5 after:left-0 after:h-[3px] after:w-full after:bg-[#F06449]'
                : ''
            }`}
          >
            Home
          </a>
          <a
            href="/blog"
            onClick={(e) => handleNavClick(e, '/blog')}
            className={`relative py-1 transition-colors hover:text-[#F06449] ${
              isBlog
                ? 'font-bold text-[#172033] after:absolute after:-bottom-0.5 after:left-0 after:h-[3px] after:w-full after:bg-[#F06449]'
                : ''
            }`}
          >
            Blog
          </a>
          <a
            href="/calorie-calculator"
            onClick={(e) => handleNavClick(e, '/calorie-calculator')}
            className={`relative py-1 transition-colors hover:text-[#F06449] ${
              isCalculator
                ? 'font-bold text-[#172033] after:absolute after:-bottom-0.5 after:left-0 after:h-[3px] after:w-full after:bg-[#F06449]'
                : ''
            }`}
          >
            Calorie Calculator
          </a>
          <a
            href="/about"
            onClick={(e) => handleNavClick(e, '/about')}
            className={`relative py-1 transition-colors hover:text-[#F06449] ${
              isAbout
                ? 'font-bold text-[#172033] after:absolute after:-bottom-0.5 after:left-0 after:h-[3px] after:w-full after:bg-[#F06449]'
                : ''
            }`}
          >
            About
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="btn-painterly-secondary inline-flex h-10 w-10 items-center justify-center rounded-[6px] text-[#172033] sm:hidden"
        >
          {mobileMenuOpen ? <PainterlyCloseIcon /> : <PainterlyMenuIcon />}
        </button>
      </div>

      {mobileMenuOpen && (
        <nav
          aria-label="Mobile Navigation"
          className="border-t-[2.5px] border-[#172033] bg-[#F7F3EA] px-4 py-3.5 sm:hidden"
        >
          <div className="flex flex-col space-y-2">
            <a
              href="/"
              onClick={(e) => handleNavClick(e, '/')}
              className={`rounded-[6px] border-2 px-3.5 py-2.5 text-base font-semibold transition-colors ${
                isHome
                  ? 'border-[#172033] bg-[#9ED8C5] text-[#172033] shadow-[2.5px_2.5px_0_#172033]'
                  : 'border-transparent text-[#172033] hover:border-[#172033] hover:bg-[#FFFDF8]'
              }`}
            >
              Home
            </a>
            <a
              href="/blog"
              onClick={(e) => handleNavClick(e, '/blog')}
              className={`rounded-[6px] border-2 px-3.5 py-2.5 text-base font-semibold transition-colors ${
                isBlog
                  ? 'border-[#172033] bg-[#9ED8C5] text-[#172033] shadow-[2.5px_2.5px_0_#172033]'
                  : 'border-transparent text-[#172033] hover:border-[#172033] hover:bg-[#FFFDF8]'
              }`}
            >
              Blog
            </a>
            <a
              href="/calorie-calculator"
              onClick={(e) => handleNavClick(e, '/calorie-calculator')}
              className={`rounded-[6px] border-2 px-3.5 py-2.5 text-base font-semibold transition-colors ${
                isCalculator
                  ? 'border-[#172033] bg-[#9ED8C5] text-[#172033] shadow-[2.5px_2.5px_0_#172033]'
                  : 'border-transparent text-[#172033] hover:border-[#172033] hover:bg-[#FFFDF8]'
              }`}
            >
              Calorie Calculator
            </a>
            <a
              href="/about"
              onClick={(e) => handleNavClick(e, '/about')}
              className={`rounded-[6px] border-2 px-3.5 py-2.5 text-base font-semibold transition-colors ${
                isAbout
                  ? 'border-[#172033] bg-[#9ED8C5] text-[#172033] shadow-[2.5px_2.5px_0_#172033]'
                  : 'border-transparent text-[#172033] hover:border-[#172033] hover:bg-[#FFFDF8]'
              }`}
            >
              About
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};
