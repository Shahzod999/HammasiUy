export interface GetCategoriesResponse {
  success: boolean;
  data: CategoryType[];
}

export interface CategoryType {
  _id: string;
  name: string;
  description: string;
  icon: string;
  isNewConstruction: boolean;
  __v: number;
}



export interface TabsTypes {
  id: string;
  label: string;
  type: string;
}