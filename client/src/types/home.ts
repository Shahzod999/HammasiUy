import { CategoryType } from "./catgoryTypes";

export interface GetPropertiesResponse {
  success: boolean;
  properties: House[];
  pagination: {
    limit: number;
    page: number;
    pages: number;
    total: number;
  };
}

export interface weSendToServerHouse {
  _id?: string;
  title: string;
  text: string;
  address: Address;

  images: ImagePreview[];
  property_class: string;
  inputNumber: string;
  details: HouseDetails;
}
export interface House {
  _id: string;
  title: string;
  text: string;
  address: Address;

  images: ImagePreview[];
  property_class: string;
  contact: Contact;
  inputNumber: string;
  details: HouseDetails;
  __v?: number;
}

export interface BasicInfoType {
  title: string;
  text: string;
  property_class: string;
  images: ImagePreview[];
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
  _id: string;
  profile_name: string;
  user_id: string;
  user_name: string;
  phone: string;
  favorites: any[];
  __v: number;
}
export interface HouseDetails {
  type: CategoryType | any;
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
  heating: string;
  ceiling_height: string;
  parking: string;
  completion_year?: number;
}

export interface ConstructionDetails {
  finishing_type?: string | undefined;
  completion_date?: string | undefined;
}
