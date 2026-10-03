import React from 'react';

/**
 * Crisp, bold geometric icons that harmonize with the neo-brutalist aesthetic.
 */
export const PainterlyArrowRight: React.FC<{ className?: string }> = ({
  className = 'h-4 w-4',
}) => (
  <svg
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M3.5 10H16"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="square"
    />
    <path
      d="M11.5 5.2L16.5 10L11.5 14.8"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="square"
      strokeLinejoin="miter"
    />
  </svg>
);

export const PainterlyArrowLeft: React.FC<{ className?: string }> = ({
  className = 'h-4 w-4',
}) => (
  <svg
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M16.5 10H4"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="square"
    />
    <path
      d="M8.5 5.2L3.5 10L8.5 14.8"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="square"
      strokeLinejoin="miter"
    />
  </svg>
);

export const PainterlyMenuIcon: React.FC<{ className?: string }> = ({
  className = 'h-5 w-5',
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M4 7H20"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="square"
    />
    <path
      d="M4 12H20"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="square"
    />
    <path
      d="M4 17H20"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="square"
    />
  </svg>
);

export const PainterlyCloseIcon: React.FC<{ className?: string }> = ({
  className = 'h-5 w-5',
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M6 6L18 18"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="square"
    />
    <path
      d="M18 6L6 18"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="square"
    />
  </svg>
);

export const PainterlyBrushDivider: React.FC<{ className?: string }> = ({
  className = 'h-3 w-28',
}) => (
  <svg
    viewBox="0 0 120 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <rect x="2" y="5" width="76" height="2.5" fill="#172033" />
    <rect x="84" y="3" width="6.5" height="6.5" fill="#F06449" stroke="#172033" strokeWidth="1.5" />
    <rect x="96" y="3" width="6.5" height="6.5" fill="#9ED8C5" stroke="#172033" strokeWidth="1.5" />
    <rect x="108" y="3" width="6.5" height="6.5" fill="#B9A7E8" stroke="#172033" strokeWidth="1.5" />
  </svg>
);
