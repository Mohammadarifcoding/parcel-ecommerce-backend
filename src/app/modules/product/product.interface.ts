export interface TProduct {
  slug_id:string;
  title: string;
  category: string;
  inStock: boolean;
  img: string[];
  description: string;
  details: string[];
  size: string[];
  price: number;
  visibility: boolean;
  date: string;
  discount: number;
  tax: number;
  color: string[];
  stock: number;
  isDeleted: boolean;
}
