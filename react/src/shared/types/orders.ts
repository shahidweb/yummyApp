
export type IDeliveryAddress = {
    fullName: string;
    fname: string;
    lname: string;
    email: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone: string;
}

export type TItems = {
    name: string;
    quantity: number
}

export type TOrderType = {
    _id: string;
    status: number;
    items: TItems[];
    deliveryAddress: IDeliveryAddress;
    total_price: number,
    currency: string,
    createdAt: string
}

export type TOrderStatus = {
    status: number;
}


export type TopSellingProduct = {
    _id: number,
    name: string,
    orders: number,
    price: number,
    image: string
    totalSold: number
}