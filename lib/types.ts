export type ProductType = 'course' | 'skill' | 'tool';

export interface Lesson {
  id: string;
  productId: string;
  chapter: string;
  title: string;
  videoUrl?: string;
  duration: string;
  isPreview?: boolean;
  notes?: string;
  resources?: { name: string; url: string; size: string }[];
}

export interface Product {
  id: string;
  type: ProductType;
  title: string;
  slug: string;
  description: string;
  shortDesc: string;
  price: number;
  salePrice: number;
  thumbnail: string;
  badge?: string;
  category: string;
  rating: number;
  reviewCount: number;
  license?: string;
  stars?: string;
  hall?: string;
  level?: 'Người mới bắt đầu' | 'Trung cấp' | 'Chuyên sâu' | 'Mọi cấp độ';
  duration?: string;
  studentsCount?: number;
  instructor?: {
    name: string;
    avatar: string;
    title: string;
    bio: string;
  };
  features?: string[];
  lessons?: Lesson[];
  // For skills / tools
  previewResultBefore?: string;
  previewResultAfter?: string;
  deliveryFormat?: string; // e.g. File .json, Link GPTs, Key kích hoạt
  toolDemoUrl?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  code: string; // e.g. AIA-9824
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: {
    productId: string;
    title: string;
    price: number;
    type: ProductType;
  }[];
  subtotal: number;
  discount: number;
  total: number;
  status: 'pending' | 'paid' | 'expired';
  createdAt: string;
  paidAt?: string;
  paymentMethod: 'vietqr_sepay';
}

export interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  role: string;
  rating: number;
  comment: string;
  date: string;
  courseName?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  role: string;
  company?: string;
  rating: number;
  content: string;
  courseTaken: string;
}
