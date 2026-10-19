import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { Logo } from './Logo';
import { COMPANY_INFO } from '../data/companyData';
import { PageRoute } from '../types';
import { Menu, X, Phone, MessageSquare, ArrowRight, ShoppingBag, User, LogOut, Mail, ShieldCheck } from 'lucide-react';

interface NavLinkItem {
  id: PageRoute;
  label: string;
}

const NAV_LINKS: NavLinkItem[] = [
  { id: 'shop', label: 'Shop' },
  { id: 'studio', label: 'Design Studio' },
  { id: 'contact', label: 'Contact' },
];

export const Navbar: React.FC = () => {
  const {
    currentPage,
    navigateTo,
    openQuoteModal,
    cartCount,
    currentUser,
    openAuthModal,
    logout,
  } = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleNavClick = (page: PageRoute) => {
    navigateTo(page);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#E8E2D8] bg-[#FAF8F5]/90 backdrop-blur-md">
      {/* Main Top Bar Contract: Zone 1 (Brand) - Zone 2 (Nav links) - Zone 3 (Primary action + Cart + Sign In) */}
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between gap-6 px-4 sm:px-6">
        {/* Zone 1: Brand Wordmark & Icon */}
        <button
          onClick={() => handleNavClick('home')}
          className="cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F95700] rounded-md p-1 shrink-0"
          aria-label="Push Vantage Ltd Home"
        >
          <Logo size="md" variant="color" showTagline={true} />
        </button>

        {/* Zone 2: Navigation Links (Shop, Design Studio, Track Order, Contact) */}
        <nav
          className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-700"
          aria-label="Main Navigation"
        >
          {NAV_LINKS.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 relative cursor-pointer font-medium ${
                  isActive
                    ? 'text-neutral-900 font-bold'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F95700] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Sign In + Cart Badge + Primary Quote CTA */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Sign In / User Account Tab */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-neutral-100 hover:bg-neutral-200 text-neutral-900 rounded-xl transition-colors cursor-pointer border border-neutral-200"
              >
                {currentUser.isAdmin ? (
                  <ShieldCheck className="w-3.5 h-3.5 text-[#F95700]" />
                ) : (
                  <User className="w-3.5 h-3.5 text-neutral-600" />
                )}
                <span className="hidden sm:inline max-w-[90px] truncate">{currentUser.name}</span>
                {currentUser.isAdmin && (
                  <span className="text-[10px] font-bold text-[#F95700] bg-orange-100 px-1.5 py-0.2 rounded font-mono">
                    Admin
                  </span>
                )}
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-52 bg-white rounded-2xl shadow-xl border border-neutral-200 p-2 z-50 space-y-1">
                  <div className="px-3 py-2 border-b border-neutral-100">
                    <p className="text-xs font-bold text-neutral-900 truncate">{currentUser.name}</p>
                    <p className="text-[11px] text-neutral-500 font-mono truncate">{currentUser.email}</p>
                  </div>
                  <button
                    onClick={() => handleNavClick('track')}
                    className="w-full text-left px-3 py-2 text-xs text-neutral-700 hover:bg-neutral-100 rounded-xl flex items-center justify-between font-medium cursor-pointer"
                  >
                    <span>{currentUser.isAdmin ? 'Admin Orders Queue' : 'My Orders & Tracking'}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-red-600 hover:bg-red-50 rounded-xl flex items-center justify-between font-medium cursor-pointer"
                  >
                    <span>Sign Out</span>
                    <LogOut className="w-3.5 h-3.5 text-red-500" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={openAuthModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 rounded-xl transition-colors cursor-pointer border border-neutral-200"
            >
              <User className="w-3.5 h-3.5 text-[#F95700]" />
              <span>Sign In</span>
            </button>
          )}

          {/* Cart Button */}
          <button
            onClick={() => handleNavClick('cart')}
            className="relative p-2 rounded-xl text-neutral-800 hover:bg-neutral-100 transition-colors cursor-pointer flex items-center justify-center border border-transparent hover:border-neutral-200"
            aria-label={`Cart (${cartCount} items)`}
          >
            <ShoppingBag className="w-5 h-5 text-neutral-800" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[20px] h-5 bg-[#F95700] text-white text-[11px] font-bold rounded-full flex items-center justify-center px-1 tabular-nums animate-in fade-in zoom-in duration-150">
                {cartCount}
              </span>
            )}
          </button>

          {/* Primary Action Button */}
          <button
            onClick={() => openQuoteModal()}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-[#F95700] hover:bg-[#E04D00] shadow-sm rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Request a Quote</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-16 bg-[#FAF8F5] border-b border-[#E8E2D8] shadow-xl max-h-[calc(100vh-4rem)] overflow-y-auto z-50">
          <div className="px-4 py-6 space-y-4">
            <div className="flex flex-col space-y-1">
              {NAV_LINKS.map((link) => {
                const isActive = currentPage === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-left text-sm font-semibold transition-colors ${
                      isActive
                        ? 'bg-neutral-100 text-[#F95700] font-bold'
                        : 'text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && <span className="w-2 h-2 rounded-full bg-[#F95700]" />}
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-neutral-200 space-y-2.5">
              {currentUser ? (
                <div className="p-3 bg-neutral-100 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-neutral-900">{currentUser.name}</p>
                      <p className="text-[11px] text-neutral-500 font-mono">{currentUser.email}</p>
                    </div>
                    {currentUser.isAdmin && (
                      <span className="text-[10px] font-bold text-[#F95700] bg-orange-100 px-2 py-0.5 rounded font-mono">
                        Admin
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => handleNavClick('track')}
                      className="flex-1 py-1.5 px-3 text-xs font-bold text-neutral-900 bg-white border border-neutral-200 rounded-lg text-center"
                    >
                      {currentUser.isAdmin ? 'Admin Orders' : 'My Orders'}
                    </button>
                    <button
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="py-1.5 px-3 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-bold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 rounded-lg"
                >
                  <User className="w-4 h-4 text-[#F95700]" />
                  <span>Customer Sign In & Track Order</span>
                </button>
              )}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigateTo('cart');
                }}
                className="w-full flex items-center justify-between py-3 px-4 text-sm font-bold text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-lg"
              >
                <span className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-[#F95700]" />
                  <span>View Cart & Quotation</span>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#F95700] text-white text-xs font-mono">
                  {cartCount}
                </span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openQuoteModal();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 text-sm font-bold text-white bg-[#F95700] hover:bg-[#E04D00] rounded-lg shadow-sm"
              >
                <span>Request a Free Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>Chat on WhatsApp ({COMPANY_INFO.phoneDisplay})</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
