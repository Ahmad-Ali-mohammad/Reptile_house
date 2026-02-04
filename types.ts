
import React from 'react';

export type UserRole = 'admin' | 'manager' | 'editor' | 'user';

export interface ReptileSpecification {
    label: string;
    value: string;
}

export interface ReptileReview {
    user: string;
    rating: number;
    comment: string;
    date: string;
}

export interface Reptile {
  id: number;
  name: string;
  species: string;
  description?: string;
  price: number;
  imageUrl: string;
  rating: number;
  isAvailable: boolean;
  status: 'متوفر' | 'قيد الحجز' | 'غير متوفر';
  category: 'snake' | 'lizard' | 'turtle';
  specifications?: ReptileSpecification[];
  reviews?: ReptileReview[];
  careInstructions?: string;
}

export interface HeroSlide {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  buttonText: string;
  link: string;
  active: boolean;
}

export interface Article {
  id: number;
  title: string;
  excerpt: string;
  content?: string;
  category: 'تعليمي' | 'أخبار' | 'نصائح طبية';
  date: string;
  author: string;
  image: string;
}

export interface ServiceItem {
  id: number;
  title: string;
  description: string;
  icon: string;
  price?: string;
}

export interface MediaItem {
  id: string;
  url: string;
  name: string;
  size: string;
  date: string;
}

export interface Category {
  id: number;
  name: string;
  icon: React.ReactNode;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

export interface OrderItem {
  reptileId: number;
  name: string;
  quantity: number;
  price: number;
  imageUrl: string;
}

export interface Order {
  id: string;
  date: string;
  status: 'قيد المعالجة' | 'تم الشحن' | 'تم التوصيل' | 'تم التأكيد';
  total: number;
  items: OrderItem[];
}

export interface CartItem extends Reptile {
    quantity: number;
}

export interface Address {
    id: number;
    label: string;
    street: string;
    city: string;
    country: string;
    isDefault: boolean;
}

export interface NotificationSettings {
    orders: boolean;
    promotions: boolean;
    system: boolean;
    messages: boolean;
}
