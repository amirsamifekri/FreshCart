export interface IProduct {
  _id?: string;
  title: string;
  price: number;
  imageCover: string;
  category: { name: string };
  ratingsAverage: number;
}
