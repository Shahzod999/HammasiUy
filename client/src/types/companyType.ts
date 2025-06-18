import { ImagePreview } from "./home";

export interface GetAllCompaniesResponse {
  success: boolean;
  companies: CompanyType[];
}
export interface CompanyType {
  _id: string;
  name: string;
  description: string;
  website: string;
  email: string;
  images: ImagePreview[];
  user_id: string;
  is_verified: boolean;
  __v: number;
}
