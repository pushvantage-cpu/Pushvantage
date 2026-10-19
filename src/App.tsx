import React, { useEffect, useState } from 'react';
import { RouterProvider, useRouter } from './context/RouterContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { DesignStudioPage } from './pages/DesignStudioPage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { GalleryPage } from './pages/GalleryPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { FaqsPage } from './pages/FaqsPage';
import { ContactPage } from './pages/ContactPage';
import { CartPage } from './pages/CartPage';
import { TrackOrderPage } from './pages/TrackOrderPage';
import { AuthModal } from './components/AuthModal';
import { AdminModal } from './components/AdminModal';
import { COMPANY_INFO } from './data/companyData';
import { MessageSquare, ArrowUp, ShoppingBag } from 'lucide-react';

const PageRenderer: React.FC = () => {
  const { currentPage, cartCount, navigateTo } = useRouter();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderActivePage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'shop':
        return <ShopPage />;
      case 'product-details':
        return <ProductDetailsPage />;
      case 'studio':
        return <DesignStudioPage />;
      case 'about':
        return <AboutPage />;
      case 'services':
        return <ServicesPage />;
      case 'gallery':
        return <GalleryPage />;
      case 'how-it-works':
        return <HowItWorksPage />;
      case 'faqs':
        return <FaqsPage />;
      case 'contact':
        return <ContactPage />;
      case 'cart':
        return <CartPage />;
      case 'track':
        return <TrackOrderPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900 font-sans selection:bg-[#F95700] selection:text-white">
      {/* Navigation Top Bar */}
      <Navbar />

      {/* Main Page Body */}
      <main className="flex-1 w-full">
        {renderActivePage()}
      </main>

      {/* Global Brand Footer */}
      <Footer />

      {/* Global Interactive Quote Request Modal */}
      <QuoteModal />

      {/* Public Customer Sign In & Order Application Modal */}
      <AuthModal />

      {/* Workshop Administration Portal Modal (pushvantage@gmail.com) */}
      <AdminModal />

      {/* Floating Action Buttons */}
      <aside aria-label="Quick Actions" className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5">
        {/* Floating Cart Button on mobile */}
        {cartCount > 0 && currentPage !== 'cart' && (
          <button
            onClick={() => navigateTo('cart')}
            className="flex sm:hidden items-center gap-1.5 px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs rounded-full shadow-lg border border-neutral-700"
          >
            <ShoppingBag className="w-4 h-4 text-[#F95700]" />
            <span>Cart ({cartCount})</span>
          </button>
        )}

        {/* Floating WhatsApp Hotline */}
        <a
          href={COMPANY_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
          aria-label="Chat on WhatsApp with Push Vantage Ltd"
        >
          <MessageSquare className="w-4 h-4 fill-white" />
          <span className="hidden sm:inline">WhatsApp (0725 356 926)</span>
        </a>

        {/* Scroll To Top button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="p-2.5 bg-neutral-900/80 hover:bg-neutral-900 text-white rounded-full shadow-md backdrop-blur-xs transition-all hover:scale-105 cursor-pointer"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}
      </aside>
    </div>
  );
};

export default function App() {
  return (
    <RouterProvider>
      <PageRenderer />
    </RouterProvider>
  );
}
