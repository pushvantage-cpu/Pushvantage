import React from 'react';
import { useRouter } from '../context/RouterContext';
import { PvBrandMark } from './Logo';
import { COMPANY_INFO } from '../data/companyData';

const SOCIAL_LINKS = [
  {
    name: 'TikTok',
    url: COMPANY_INFO.tiktokUrl,
    hoverBg: 'hover:bg-[#000000] hover:text-white hover:border-white/40',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.3 6.3 0 0 0 1.96-4.54V8.5a8.28 8.28 0 0 0 4.81 1.53v-3.34z" />
      </svg>
    ),
  },
  {
    name: 'WhatsApp',
    url: COMPANY_INFO.whatsappUrl,
    hoverBg: 'hover:bg-[#25D366] hover:text-white hover:border-[#25D366]',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.52 3.48A11.93 11.93 0 0 0 12.06 0C5.46 0 .09 5.37.09 11.97c0 2.11.55 4.16 1.6 5.98L0 24l6.23-1.63a11.93 11.93 0 0 0 5.83 1.51h.01c6.6 0 11.97-5.37 11.97-11.97 0-3.2-1.25-6.21-3.52-8.43zM12.07 21.86c-1.8 0-3.57-.48-5.11-1.4l-.37-.22-3.79.99 1.01-3.69-.24-.38a9.92 9.92 0 0 1-1.52-5.19c0-5.5 4.47-9.97 9.98-9.97 2.66 0 5.17 1.04 7.05 2.92a9.92 9.92 0 0 1 2.92 7.05c0 5.5-4.48 9.97-9.98 9.97zm5.47-7.48c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.95 1.18-.18.2-.35.23-.65.08-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.79-1.68-2.09-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.64-.93-2.25-.24-.59-.49-.51-.68-.52h-.58c-.2 0-.53.08-.8.38-.28.3-1.05 1.03-1.05 2.51s1.08 2.91 1.23 3.11c.15.2 2.13 3.25 5.16 4.56.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.78-.73 2.03-1.43.25-.7.25-1.31.18-1.43-.07-.12-.27-.2-.57-.35z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/pushvantage',
    hoverBg: 'hover:bg-gradient-to-tr hover:from-amber-500 hover:to-fuchsia-600 hover:text-white hover:border-pink-500',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/pushvantage',
    hoverBg: 'hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: 'X (Twitter)',
    url: 'https://x.com/pushvantage',
    hoverBg: 'hover:bg-black hover:text-white hover:border-white/40',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/company/pushvantage',
    hoverBg: 'hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2]',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
      </svg>
    ),
  },
];

export const Footer: React.FC = () => {
  const { navigateTo, openAuthModal, openAdminModal } = useRouter();

  return (
    <footer className="bg-[#201934] text-white">
      {/* 3-Column Clean Editorial Grid matching the reference screenshot */}
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:grid-cols-3">
        {/* Column 1: Brand Logo & Profile */}
        <div className="space-y-3">
          <div
            onClick={() => navigateTo('home')}
            className="flex items-center gap-2.5 cursor-pointer select-none"
          >
            <PvBrandMark size={32} />
            <div className="font-sans font-black tracking-tight text-xl lowercase leading-none">
              <span className="text-[#FF6E14]">push</span>
              <span className="text-white">vantage</span>
              <span className="ml-1 text-[10px] font-bold text-[#1E88E5] uppercase tracking-wider">
                LTD
              </span>
            </div>
          </div>
          <p className="mt-3 max-w-xs text-sm text-white/70 leading-relaxed">
            Custom apparel, print & branding studio in Nairobi. Sew It. Brand It. Print It.
          </p>
          <p className="text-xs text-white/60 leading-normal">
            Nairobi, Kenya · Prompt delivery across Nairobi & nationwide dispatch
          </p>

          {/* Social Media Icons after Nairobi, Kenya */}
          <div className="pt-2">
            <p className="text-[11px] font-bold text-[#FF6E14] uppercase tracking-wider mb-2">
              Follow & Connect
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {SOCIAL_LINKS.map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-8 h-8 rounded-lg bg-white/10 text-white/80 flex items-center justify-center border border-white/15 transition-all shadow-xs ${item.hoverBg}`}
                  title={`${item.name} - Push Vantage Ltd`}
                  aria-label={item.name}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Column 2: GET IN TOUCH */}
        <div className="text-sm space-y-2">
          <h3 className="font-sans text-xs font-bold uppercase tracking-[0.14em] text-[#FF6E14]">
            GET IN TOUCH
          </h3>
          <p className="mt-3 text-white/85">
            <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="hover:underline tabular-nums">
              +254 725 356 926
            </a>
          </p>
          <p className="text-white/85">
            <a href={`mailto:${COMPANY_INFO.email}`} className="hover:underline">
              {COMPANY_INFO.email}
            </a>
          </p>
          <p className="text-white/70">
            Mon–Sat 8:00am–6:00pm
          </p>
          <p className="text-white/70">
            <a
              href={COMPANY_INFO.tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              TikTok @pushvantage
            </a>
          </p>
        </div>

        {/* Column 3: EXPLORE */}
        <div className="text-sm">
          <h3 className="font-sans text-xs font-bold uppercase tracking-[0.14em] text-[#FF6E14]">
            EXPLORE
          </h3>
          <ul className="mt-3 grid grid-cols-2 gap-y-2 gap-x-4 text-white/85">
            <li>
              <button
                onClick={() => navigateTo('shop')}
                className="hover:underline cursor-pointer text-left"
              >
                Shop
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateTo('studio')}
                className="hover:underline cursor-pointer text-left"
              >
                Design Studio
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateTo('gallery')}
                className="hover:underline cursor-pointer text-left"
              >
                Gallery
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateTo('about')}
                className="hover:underline cursor-pointer text-left"
              >
                About Us
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateTo('faqs')}
                className="hover:underline cursor-pointer text-left"
              >
                FAQ
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateTo('contact')}
                className="hover:underline cursor-pointer text-left"
              >
                Contact
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateTo('how-it-works')}
                className="hover:underline cursor-pointer text-left"
              >
                How It Works
              </button>
            </li>
            <li>
              <button
                onClick={openAuthModal}
                className="hover:underline cursor-pointer text-left text-[#FF6E14] font-medium"
              >
                Customer Sign In
              </button>
            </li>
            <li>
              <button
                onClick={openAdminModal}
                className="hover:underline cursor-pointer text-left text-neutral-400 hover:text-white"
              >
                Admin Portal
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Admin Tab & Workshop Bar down there */}
      <div className="border-t border-white/10 py-5 px-4 bg-black/25">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-2 text-white/60 text-center sm:text-left">
            <span>© 2026 Push Vantage Ltd · Nairobi, Kenya</span>

            {/* Social media icons directly after Nairobi, Kenya */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
              <span className="text-[10px] text-white/50 uppercase tracking-wider font-semibold mr-0.5">Socials:</span>
              {SOCIAL_LINKS.map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-5 h-5 rounded flex items-center justify-center text-white/70 hover:text-white transition-all`}
                  title={`${item.name} - Push Vantage Ltd`}
                  aria-label={item.name}
                >
                  <span className="scale-75">{item.icon}</span>
                </a>
              ))}
            </div>

            <span className="hidden sm:inline text-white/30">·</span>
            <span>
              Official Email:{' '}
              <a href={`mailto:${COMPANY_INFO.email}`} className="text-white/80 hover:text-[#FF6E14] underline font-mono">
                {COMPANY_INFO.email}
              </a>
            </span>
          </div>

          {/* Dedicated Admin Tab Down There */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={openAdminModal}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-orange-600/20 hover:bg-orange-600/30 text-orange-300 hover:text-white border border-orange-500/40 text-xs font-bold transition-all cursor-pointer shadow-xs"
              title="Official Workshop Administration for pushvantage@gmail.com"
            >
              <span className="w-2 h-2 rounded-full bg-[#FF6E14]" />
              <span>Admin Tab (pushvantage@gmail.com)</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
