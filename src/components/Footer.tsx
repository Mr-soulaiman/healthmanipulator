import React from 'react';
import { SITE_CONFIG } from '../config/siteConfig';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t-[3px] border-[#172033] bg-[#FFFDF8]">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-4 py-8 text-center sm:flex-row sm:px-6 lg:px-8 sm:text-left">
        <div className="flex items-center gap-3">
          <img
            src={SITE_CONFIG.branding.logoFull}
            alt="HealthManipulator"
            className="h-8 w-auto object-contain opacity-90 sm:h-9"
          />
        </div>
        <p className="text-xs font-medium text-[#2A354B]">
          © {currentYear} {SITE_CONFIG.brandName}. Personal blog based on own experience.
        </p>
      </div>
    </footer>
  );
};
