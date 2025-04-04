export interface OderProducts {
    ImageProduct: string;
    NameProduct: string;
    PriceProduct: number;
    colorName: string;
    price: number;
    quantity: number;
    sizeName: string;
    subtotal: number
}

export interface OderTotal {
    subtotal: number;
    total: number;
    tax: number;
}


export interface Order {
    username: string;
    phone: string;
    address: string;
    email: string;
    note: string;
    commodity_money: number;
    total_amount: string;
    shipping_id: string;


    vnp_TxnReff: string | null;
    promotion_id: string | null;

}