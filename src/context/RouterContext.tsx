import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  PageRoute,
  CartItem,
  OnlineOrder,
  OrderStatus,
  AppUser,
  QuotationRecord,
  RegisteredAccount,
} from '../types';

interface RouterContextType {
  currentPage: PageRoute;
  navigateTo: (page: PageRoute, params?: Record<string, string>) => void;
  routeParams: Record<string, string>;
  selectedProductId: string | null;
  openProductDetails: (productId: string) => void;
  openStudioWithProduct: (productId: string) => void;
  // Quote Modal
  isQuoteModalOpen: boolean;
  openQuoteModal: (initialItem?: string) => void;
  closeQuoteModal: () => void;
  quoteModalInitialItem: string;
  // Cart state
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  updateCartQuantity: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  cartCount: number;
  // Auth state
  currentUser: AppUser | null;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  isAdminModalOpen: boolean;
  openAdminModal: () => void;
  closeAdminModal: () => void;
  login: (email: string, name?: string, phone?: string, company?: string) => void;
  loginWithPassword: (
    email: string,
    password: string
  ) => { success: boolean; message: string; isAdmin: boolean };
  registerAccount: (data: {
    name: string;
    email: string;
    phone: string;
    password: string;
    company?: string;
  }) => { success: boolean; message: string };
  logout: () => void;
  registeredUsers: RegisteredAccount[];
  // Order & Tracking state
  orders: OnlineOrder[];
  placeOrder: (data: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    deliveryNotes?: string;
  }) => OnlineOrder;
  updateOrderStatus: (orderId: string, status: OrderStatus, notes?: string) => void;
  findOrder: (query: string) => OnlineOrder | undefined;
  // Quotations records for Admin backend
  quotations: QuotationRecord[];
  submitQuotation: (
    data: Omit<QuotationRecord, 'id' | 'status' | 'createdAt'>
  ) => QuotationRecord;
  updateQuoteStatus: (id: string, status: QuotationRecord['status']) => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'push_vantage_cart_v1';
const ORDERS_STORAGE_KEY = 'push_vantage_orders_v1';
const USER_STORAGE_KEY = 'push_vantage_user_v1';
const USERS_STORAGE_KEY = 'push_vantage_registered_accounts_v1';
const QUOTES_STORAGE_KEY = 'push_vantage_quotes_v1';


// Seed demo orders so users and admin can track right away
const INITIAL_DEMO_ORDERS: OnlineOrder[] = [
  {
    id: 'PV-2026-01',
    customerName: 'Kenya Logistics Ltd (Peter Otieno)',
    customerEmail: 'peter@kenyalogistics.co.ke',
    customerPhone: '0712 345 678',
    deliveryNotes: 'Deliver to Mombasa Road Industrial Area Depot, Gate 3',
    items: [
      {
        id: 'item_demo_1',
        productId: 'reflective-cargo-overall',
        productName: 'Reflective Cargo Boiler Suit (One-Piece Overall)',
        categoryLabel: 'Reflective Overalls',
        image: '/src/assets/images/product_reflective_overalls_1792390996791.jpg',
        color: 'Navy Blue & Hi-Vis Orange',
        size: 'Large (42-44)',
        quantity: 35,
        brandingMethod: 'Computerized Chest Embroidery',
        viewSide: 'front',
        placement: 'Left Chest Crest',
        artworkName: 'Kenya Logistics Shield Logo',
      },
    ],
    totalItems: 35,
    status: 'in_production',
    createdAt: '2026-10-16T09:30:00Z',
    updatedAt: '2026-10-18T14:20:00Z',
    statusNotes: 'Embroidery running on multi-head machine. Inspection scheduled tomorrow.',
  },
  {
    id: 'PV-2026-02',
    customerName: 'Apex Tech Solutions (Faith Muthoni)',
    customerEmail: 'faith@apextech.co.ke',
    customerPhone: '0722 987 654',
    deliveryNotes: 'Westlands Office Park, Nairobi',
    items: [
      {
        id: 'item_demo_2',
        productId: 'heavyweight-corporate-hoodie',
        productName: 'Heavyweight Fleece Corporate Hoodie',
        categoryLabel: 'Hoodies & Sweatshirts',
        image: '/src/assets/images/shop_hoodies_sweatshirts_1792391772659.jpg',
        color: 'Charcoal Black',
        size: 'Medium',
        quantity: 20,
        brandingMethod: 'Center Chest Screen Print',
        viewSide: 'front',
        placement: 'Center Front',
        artworkName: 'Apex Tech Geometric Wordmark',
      },
    ],
    totalItems: 20,
    status: 'ready_dispatched',
    createdAt: '2026-10-14T11:00:00Z',
    updatedAt: '2026-10-18T16:45:00Z',
    statusNotes: 'Packed and ready for pickup / courier dispatch to Westlands.',
  },
];

const INITIAL_DEMO_QUOTES: QuotationRecord[] = [
  {
    id: 'QT-2026-101',
    name: 'Nairobi Construction Guild (Eng. Kipchumba)',
    email: 'kipchumba@ncguild.ke',
    phone: '0722 112 233',
    serviceOrProduct: 'Reflective Cargo Boiler Suits & Safety Helmets',
    quantity: '85 pcs',
    customizationType: 'Screen Printing on Back & High-Density Chest Embroidery',
    colorsSizes: 'Assorted Navy Blue (M x 25, L x 35, XL x 25)',
    projectDescription: 'Urgent turnaround for construction team deployment at Kilimani site.',
    attachmentName: 'NCG_Corporate_Branding_Guidelines.pdf',
    attachmentSize: '1.4 MB',
    status: 'new',
    createdAt: '2026-10-18T10:15:00Z',
  },
  {
    id: 'QT-2026-102',
    name: 'Savannah Safari Expeditions (Miriam Wanjiku)',
    email: 'miriam@savannahsafaris.com',
    phone: '0733 456 789',
    serviceOrProduct: 'Premium Pique Polo Shirts & Safari Bush Caps',
    quantity: '120 pcs',
    customizationType: 'Subtle Golden Thread Embroidery on Left Breast',
    colorsSizes: 'Forest Green & Desert Khaki (S, M, L, XL)',
    projectDescription: 'Uniform overhaul for tour guides and drivers ahead of the peak safari season.',
    attachmentName: 'Savannah_Logo_Vector.svg',
    attachmentSize: '420 KB',
    status: 'reviewed',
    createdAt: '2026-10-17T15:30:00Z',
  },
];

const INITIAL_REGISTERED_USERS: RegisteredAccount[] = [
  {
    name: 'Peter Otieno',
    email: 'peter@kenyalogistics.co.ke',
    phone: '0712 345 678',
    company: 'Kenya Logistics Ltd',
    password: 'Client@2026',
    createdAt: '2026-10-15T08:00:00Z',
  },
];

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [routeParams, setRouteParams] = useState<Record<string, string>>({});
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteModalInitialItem, setQuoteModalInitialItem] = useState('');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Registered Accounts (public users with passwords of their choice)
  const [registeredUsers, setRegisteredUsers] = useState<RegisteredAccount[]>(() => {
    try {
      const stored = localStorage.getItem(USERS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return INITIAL_REGISTERED_USERS;
    } catch {
      return INITIAL_REGISTERED_USERS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(registeredUsers));
    } catch {
      // ignore
    }
  }, [registeredUsers]);

  // Quotation Inquiries (accessible to Admin backend)
  const [quotations, setQuotations] = useState<QuotationRecord[]>(() => {
    try {
      const stored = localStorage.getItem(QUOTES_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return INITIAL_DEMO_QUOTES;
    } catch {
      return INITIAL_DEMO_QUOTES;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(QUOTES_STORAGE_KEY, JSON.stringify(quotations));
    } catch {
      // ignore
    }
  }, [quotations]);

  // Auth User
  const [currentUser, setCurrentUser] = useState<AppUser | null>(() => {
    try {
      const stored = localStorage.getItem(USER_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    } catch {
      // ignore
    }
  }, [currentUser]);

  // Orders
  const [orders, setOrders] = useState<OnlineOrder[]>(() => {
    try {
      const stored = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return INITIAL_DEMO_ORDERS;
    } catch {
      return INITIAL_DEMO_ORDERS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);


  const pageTitles: Record<PageRoute, string> = {
    home: 'Push Vantage Ltd — Sew It. Brand It. Print It. | Nairobi, Kenya',
    shop: 'Shop Online | Apparel, Reflective Overalls & PPE | Push Vantage Ltd',
    'product-details': 'Product Details | Push Vantage Ltd Online Shop',
    studio: 'Interactive Design Studio | Customize Workwear & Apparel | Push Vantage Ltd',
    about: 'About Us | Push Vantage Ltd — Custom Apparel, PPE & Branding Nairobi',
    services: 'Our Services | Custom Printing, Apparel & PPE | Push Vantage Ltd',
    gallery: 'Our Work & Gallery | Production Showcase | Push Vantage Ltd',
    'how-it-works': 'How It Works | Order & Production Process | Push Vantage Ltd',
    faqs: 'Frequently Asked Questions | Push Vantage Ltd',
    contact: 'Contact Us | pushvantage@gmail.com | 0725 356 926 | Nairobi',
    cart: 'Your Cart & Quotation | Push Vantage Ltd Online Shop',
    track: 'Track Your Order | Live Production Status | Push Vantage Ltd',
  };

  const getPageFromUrl = (): { page: PageRoute; params: Record<string, string> } => {
    const searchParams = new URLSearchParams(window.location.search);
    const params: Record<string, string> = {};
    searchParams.forEach((val, key) => {
      params[key] = val;
    });

    const hashRaw = window.location.hash.replace(/^#\/?/, '');
    const [hashPath, hashQuery] = hashRaw.split('?');
    if (hashQuery) {
      const hashSearchParams = new URLSearchParams(hashQuery);
      hashSearchParams.forEach((val, key) => {
        params[key] = val;
      });
    }

    const validPages: PageRoute[] = [
      'home', 'shop', 'product-details', 'studio', 'about', 'services', 
      'gallery', 'how-it-works', 'faqs', 'contact', 'cart', 'track'
    ];

    if (validPages.includes(hashPath as PageRoute)) {
      return { page: hashPath as PageRoute, params };
    }

    const path = window.location.pathname.replace(/^\//, '').split('/')[0];
    if (validPages.includes(path as PageRoute)) {
      return { page: path as PageRoute, params };
    }

    return { page: 'home', params };
  };

  useEffect(() => {
    const handleLocationChange = () => {
      const { page, params } = getPageFromUrl();
      setCurrentPage(page);
      setRouteParams(params);
      if (params.product) {
        setSelectedProductId(params.product);
      }
      document.title = pageTitles[page] || pageTitles.home;
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigateTo = (page: PageRoute, params?: Record<string, string>) => {
    setCurrentPage(page);
    document.title = pageTitles[page] || pageTitles.home;
    setRouteParams(params || {});
    if (params?.product) {
      setSelectedProductId(params.product);
    }

    const queryString = params && Object.keys(params).length > 0 
      ? `?${new URLSearchParams(params).toString()}` 
      : '';
    const newPath = page === 'home' ? `/${queryString}` : `/${page}${queryString}`;
    const newHash = page === 'home' ? `#/${queryString}` : `#/${page}${queryString}`;

    try {
      window.history.pushState({ page, params }, '', newPath);
    } catch {
      window.location.hash = newHash;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openProductDetails = (productId: string) => {
    setSelectedProductId(productId);
    navigateTo('product-details', { product: productId });
  };

  const openStudioWithProduct = (productId: string) => {
    setSelectedProductId(productId);
    navigateTo('studio', { product: productId });
  };

  const openQuoteModal = (initialItem?: string) => {
    setQuoteModalInitialItem(initialItem || '');
    setIsQuoteModalOpen(true);
  };

  const closeQuoteModal = () => {
    setIsQuoteModalOpen(false);
  };

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  const openAdminModal = () => setIsAdminModalOpen(true);
  const closeAdminModal = () => setIsAdminModalOpen(false);

  const loginWithPassword = (
    email: string,
    password: string
  ): { success: boolean; message: string; isAdmin: boolean } => {
    const cleanEmail = email.trim().toLowerCase();

    // Admin authentication check
    if (cleanEmail === 'pushvantage@gmail.com') {
      if (password === 'Recommendations@2026') {
        const adminUser: AppUser = {
          email: 'pushvantage@gmail.com',
          name: 'Push Vantage Administrator',
          isAdmin: true,
        };
        setCurrentUser(adminUser);
        closeAuthModal();
        return {
          success: true,
          message: 'Admin access verified. Welcome to Push Vantage workshop portal.',
          isAdmin: true,
        };
      } else {
        return {
          success: false,
          message: 'Incorrect password for pushvantage@gmail.com. Please enter the valid admin supervisor credentials.',
          isAdmin: true,
        };
      }
    }

    // Public customer authentication check
    const existing = registeredUsers.find((u) => u.email.toLowerCase() === cleanEmail);
    if (!existing) {
      return {
        success: false,
        message: 'No registered customer account found for this email. Please switch to "Create Account" to register.',
        isAdmin: false,
      };
    }

    if (existing.password !== password) {
      return {
        success: false,
        message: 'Incorrect password for this customer account. Please try again.',
        isAdmin: false,
      };
    }

    const customerUser: AppUser = {
      email: existing.email,
      name: existing.name,
      phone: existing.phone,
      company: existing.company,
      isAdmin: false,
    };
    setCurrentUser(customerUser);
    closeAuthModal();
    return {
      success: true,
      message: `Signed in successfully. Welcome back, ${existing.name}!`,
      isAdmin: false,
    };
  };

  const registerAccount = (data: {
    name: string;
    email: string;
    phone: string;
    password: string;
    company?: string;
  }): { success: boolean; message: string } => {
    const cleanEmail = data.email.trim().toLowerCase();
    if (cleanEmail === 'pushvantage@gmail.com') {
      return {
        success: false,
        message: 'This email is reserved for Push Vantage administrative operations.',
      };
    }
    const alreadyExists = registeredUsers.some((u) => u.email.toLowerCase() === cleanEmail);
    if (alreadyExists) {
      return {
        success: false,
        message: 'An account with this email address is already registered. Please sign in.',
      };
    }

    const newAccount: RegisteredAccount = {
      name: data.name.trim(),
      email: cleanEmail,
      phone: data.phone.trim(),
      password: data.password,
      company: data.company?.trim(),
      createdAt: new Date().toISOString(),
    };

    setRegisteredUsers((prev) => [newAccount, ...prev]);

    const newAppUser: AppUser = {
      email: newAccount.email,
      name: newAccount.name,
      phone: newAccount.phone,
      company: newAccount.company,
      isAdmin: false,
    };
    setCurrentUser(newAppUser);
    return {
      success: true,
      message: 'Account created successfully! You can now apply for custom orders and track your projects.',
    };
  };

  const submitQuotation = (
    data: Omit<QuotationRecord, 'id' | 'status' | 'createdAt'>
  ): QuotationRecord => {
    const rand = Math.floor(100 + Math.random() * 900);
    const newQuote: QuotationRecord = {
      ...data,
      id: `QT-${new Date().getFullYear()}-${rand}`,
      status: 'new',
      createdAt: new Date().toISOString(),
    };
    setQuotations((prev) => [newQuote, ...prev]);
    return newQuote;
  };

  const updateQuoteStatus = (id: string, status: QuotationRecord['status']) => {
    setQuotations((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status } : q))
    );
  };

  const login = (email: string, name?: string, phone?: string, company?: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const isAdmin = cleanEmail === 'pushvantage@gmail.com';
    const user: AppUser = {
      email: cleanEmail,
      name: name?.trim() || (isAdmin ? 'Push Vantage Admin' : cleanEmail.split('@')[0]),
      phone: phone?.trim(),
      company: company?.trim(),
      isAdmin,
    };
    setCurrentUser(user);
    closeAuthModal();
    closeAdminModal();
  };

  const logout = () => {
    setCurrentUser(null);
  };


  // Cart operations
  const addToCart = (item: Omit<CartItem, 'id'>) => {
    const newCartItem: CartItem = {
      ...item,
      id: `item_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    };
    setCart((prev) => [newCartItem, ...prev]);
  };

  const updateCartQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Orders operations
  const placeOrder = (data: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    deliveryNotes?: string;
  }): OnlineOrder => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const orderId = `PV-${new Date().getFullYear()}-${randomNum}`;
    const totalItems = cart.reduce((s, i) => s + i.quantity, 0);
    const pricedItems = cart.filter((i) => i.unitPrice && i.unitPrice > 0);
    const totalAmountKes = pricedItems.length > 0
      ? pricedItems.reduce((s, i) => s + (i.unitPrice || 0) * i.quantity, 0)
      : undefined;

    const newOrder: OnlineOrder = {
      id: orderId,
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone,
      deliveryNotes: data.deliveryNotes,
      items: [...cart],
      totalItems,
      totalAmountKes,
      status: 'received',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      statusNotes: 'Order received online. Our tailoring & printing team is reviewing your requirements.',
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, notes?: string) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          return {
            ...ord,
            status,
            statusNotes: notes || ord.statusNotes,
            updatedAt: new Date().toISOString(),
          };
        }
        return ord;
      })
    );
  };

  const findOrder = (query: string): OnlineOrder | undefined => {
    const q = query.trim().toLowerCase();
    if (!q) return undefined;
    return orders.find(
      (ord) =>
        ord.id.toLowerCase() === q ||
        ord.customerPhone.replace(/\s+/g, '').includes(q.replace(/\s+/g, '')) ||
        ord.customerEmail.toLowerCase() === q
    );
  };

  return (
    <RouterContext.Provider
      value={{
        currentPage,
        navigateTo,
        routeParams,
        selectedProductId,
        openProductDetails,
        openStudioWithProduct,
        isQuoteModalOpen,
        openQuoteModal,
        closeQuoteModal,
        quoteModalInitialItem,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        currentUser,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        isAdminModalOpen,
        openAdminModal,
        closeAdminModal,
        login,
        loginWithPassword,
        registerAccount,
        registeredUsers,
        logout,
        orders,
        placeOrder,
        updateOrderStatus,
        findOrder,
        quotations,
        submitQuotation,
        updateQuoteStatus,
      }}
    >
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
};
