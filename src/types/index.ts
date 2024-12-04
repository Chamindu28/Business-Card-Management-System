export interface User {
  id: string;
  email: string;
  role: 'admin' | 'business';
  businessId?: string;
}

export interface Business {
  id: string;
  name: string;
  logo: string;
  industry: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BusinessCard {
  id: string;
  businessId: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  website?: string;
  address?: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
  profileImage?: string;
  customFields: Record<string, string>;
  createdAt: Date;
  updatedAt: Date;
}