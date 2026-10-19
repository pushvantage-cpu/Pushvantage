import React from 'react';

interface LogoProps {
  variant?: 'light' | 'dark' | 'color' | 'full' | 'mark-only';
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

// Standalone exact "PV" interlocking brand mark (Orange P with forward arrow + Blue V checkmark)
export const PvBrandMark: React.FC<{ size?: number; className?: string }> = ({
  size = 36,
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-transform duration-200 hover:scale-105 ${className}`}
      aria-label="Push Vantage PV Monogram Mark"
    >
      {/* 1. Electric Blue "V" Checkmark (passes under/through the P loop) */}
      <path
        d="M26 50 L45 74 C46.5 76 49.5 76 51 74 L75 28"
        stroke="#1E88E5"
        strokeWidth="11"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 2. Vibrant Orange "P" with Forward Arrow Crossbar */}
      {/* P Stem & Outer Curve */}
      <path
        d="M19 72 V24 C19 17.4 24.4 12 31 12 H47 C57.5 12 66 20.5 66 31 C66 41.5 57.5 50 47 50 H36"
        stroke="#FF6E14"
        strokeWidth="11"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Internal Forward Arrow inside the P */}
      <path
        d="M19 37 H50"
        stroke="#FF6E14"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path
        d="M44 28 L56 37 L44 46 Z"
        fill="#FF6E14"
      />
    </svg>
  );
};

export const Logo: React.FC<LogoProps> = ({
  variant = 'color',
  showTagline = true,
  size = 'md',
  className = '',
}) => {
  const isDark = variant === 'dark';

  const dimensions = {
    sm: { markSize: 32, fontSize: 'text-lg', ltdSize: 'text-[10px]', tagSize: 'text-[9px]' },
    md: { markSize: 40, fontSize: 'text-2xl', ltdSize: 'text-xs', tagSize: 'text-[11px]' },
    lg: { markSize: 52, fontSize: 'text-3xl', ltdSize: 'text-sm', tagSize: 'text-xs' },
    xl: { markSize: 72, fontSize: 'text-5xl', ltdSize: 'text-base', tagSize: 'text-sm' },
  }[size];

  if (variant === 'mark-only') {
    return <PvBrandMark size={dimensions.markSize} className={className} />;
  }

  // Full official lockup (as uploaded: PV Icon + pushvantage + — LTD — + Sew It. Brand It. Print It.)
  if (variant === 'full') {
    return (
      <div className={`flex flex-col select-none ${className}`}>
        <div className="flex items-center gap-3">
          {/* Official PV Icon */}
          <PvBrandMark size={dimensions.markSize * 1.3} />

          {/* Typography Lockup */}
          <div className="flex flex-col justify-center">
            {/* "pushvantage" */}
            <div className={`font-sans font-black tracking-tight leading-none ${dimensions.fontSize} flex items-baseline lowercase`}>
              <span className="text-[#FF6E14]">push</span>
              <span className="text-[#1E88E5]">vantage</span>
            </div>

            {/* "— LTD —" */}
            <div className="flex items-center gap-2 mt-1">
              <span className="h-[2px] w-8 bg-[#1E88E5] rounded-full" />
              <span className={`font-sans font-extrabold text-[#1E88E5] tracking-[0.25em] uppercase ${dimensions.ltdSize}`}>
                LTD
              </span>
              <span className="h-[2px] w-8 bg-[#1E88E5] rounded-full" />
            </div>

            {/* Tagline */}
            {showTagline && (
              <span className={`font-sans font-semibold tracking-wider text-neutral-400 mt-1 ${dimensions.tagSize}`}>
                Sew It. Brand It. Print It.
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Standard Header / Inline Bar Lockup
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Official PV Logo Mark (Orange P with arrow + Blue V checkmark) */}
      <PvBrandMark size={dimensions.markSize} />

      {/* Brand Text */}
      <div className="flex flex-col justify-center leading-tight">
        <div className={`font-sans font-black tracking-tight ${dimensions.fontSize} flex items-baseline lowercase`}>
          <span className="text-[#FF6E14]">push</span>
          <span className="text-[#1E88E5]">vantage</span>
          <span className={`ml-1 font-bold text-[#1E88E5] uppercase tracking-wider ${dimensions.ltdSize}`}>
            LTD
          </span>
        </div>
        {showTagline && (
          <span
            className={`font-sans font-medium tracking-wide ${dimensions.tagSize} ${
              isDark ? 'text-neutral-400' : 'text-neutral-500'
            }`}
          >
            Sew It. Brand It. Print It.
          </span>
        )}
      </div>
    </div>
  );
};
