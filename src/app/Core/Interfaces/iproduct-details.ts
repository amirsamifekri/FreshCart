export interface IProductDetails {
  images: string[];
  description: string;
  category: { name: string };
  ratingsAverage: number;
  price: number;
  title: string;
  _id?: string;
}
