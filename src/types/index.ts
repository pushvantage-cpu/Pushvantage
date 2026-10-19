export type PageRoute = 
  | 'home'
  | 'shop'
  | 'product-details'
  | 'studio'
  | 'about'
  | 'services'
  | 'gallery'
  | 'how-it-works'
  | 'faqs'
  | 'contact'
  | 'cart'
  | 'track';

export interface NavItem {
  id: PageRoute;
  label: string;
  path: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  category: string;
  image: string;
  benefits: string[];
  capabilities: string[];
  idealFor: string[];
}

export type ProductCategory = 
  | 't-shirts-apparel'
  | 'hoodies-sweatshirts'
  | 'uniforms-workwear'
  | 'reflective-overalls'
  | 'ppe-safety'
  | 'mugs-drinkware'
  | 'corporate-gifts'
  | 'promotional-merchandise';

export interface ProductItem {
  id: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  description: string;
  image: string;
  backImage?: string;
  features: string[];
  availableColors: { name: string; hex: string }[];
  sizes: string[];
  brandingMethods: string[];
  isFeatured?: boolean;
  basePrice?: number;
  priceNote?: string;
}

export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  categoryLabel: string;
  image: string;
  color: string;
  size: string;
  quantity: number;
  brandingMethod: string;
  viewSide: 'front' | 'back';
  placement: string;
  artworkName?: string;
  artworkDataUrl?: string;
  unitPrice?: number;
  notes?: string;
}

export type OrderStatus = 
  | 'received'
  | 'mockup_review'
  | 'in_production'
  | 'quality_check'
  | 'ready_dispatched';

export interface OnlineOrder {
  id: string; // e.g. PV-4892
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryNotes?: string;
  items: CartItem[];
  totalItems: number;
  totalAmountKes?: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  statusNotes?: string;
}

export interface AppUser {
  email: string;
  name: string;
  phone?: string;
  company?: string;
  isAdmin: boolean;
}

export interface GalleryProject {
  id: string;
  title: string;
  category: 'apparel' | 'reflective' | 'printing' | 'gifts';
  categoryLabel: string;
  description: string;
  image: string;
  details: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'printing' | 'apparel' | 'ppe' | 'orders' | 'delivery';
}

export interface QuoteFormData {
  name: string;
  email: string;
  phone: string;
  serviceOrProduct: string;
  quantity: string;
  customizationType: string;
  colorsSizes: string;
  projectDescription: string;
  attachmentName?: string;
  attachmentSize?: string;
}

export interface QuotationRecord {
  id: string; // e.g. QT-2026-108
  name: string;
  email: string;
  phone: string;
  serviceOrProduct: string;
  quantity: string;
  customizationType: string;
  colorsSizes?: string;
  projectDescription?: string;
  attachmentName?: string;
  attachmentSize?: string;
  status: 'new' | 'reviewed' | 'quoted' | 'closed';
  createdAt: string;
}

export interface RegisteredAccount {
  email: string;
  password: string;
  name: string;
  phone: string;
  company?: string;
  createdAt: string;
}

