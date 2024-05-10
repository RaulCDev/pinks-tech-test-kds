export type Item = {
  id: string;
  name: string;
  image: string;
  price: {
    currency: string;
    amount: number;
  };
};
