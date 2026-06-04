export type ProductType = {
    _id: string;
    name: string;
    price: number;
    description: string;
    rating: number;
    category: string;
    image: string;
    qty?: number;
}