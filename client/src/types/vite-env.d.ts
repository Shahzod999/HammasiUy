/// <reference types="vite/client" />

// Объявление типов для решения проблем с TypeScript при сборке
interface ImagePreview {
  id?: string;
  path: string;
  preview: string;
}

// Добавляем недостающий тип House

export interface House {
  _id: number;
  title: string;
  text: string;
  address: Address;
  img: string;
  images: ImagePreview[];
  property_class: string;
  contact?: Contact;
  inputNumber: string;
  details: HouseDetails;
  __v?: number;
}

export interface ImagePreview {
  id?: string;
  path: string;
  preview: string;
  file?: File;
}

export interface Address {
  city: string;
  district: string;
  street: string;
  house_number: string;
  apartment?: string | null | undefined;
  coordinates: Coordinates;
}

export interface Coordinates {
  lat: number;
  long: number;
}

export interface Contact {
  phone: string;
  telegram: string;
  user_id: string;
}
export interface HouseDetails {
  type: string;
  year_built: number;
  material: string;
  area: string;
  rooms: any;
  floor: string;
  price: number;
  currency: string;
  price_per_m2: number;
  nearby_facilities: string[];
  comment: string;
  renovation: string;
  bathroom: string;
  balcony: string;
  mortgage: boolean;
  is_urgent: boolean;
  views: number;
  favorites: number;
  published_date: string;
  construction_details?: ConstructionDetails;
}

export interface ConstructionDetails {
  finishing_type?: string | undefined;
  completion_date?: string | undefined;
}
