

export type Cart_detail = {
    id: number
    NameProduct: string
    cart_id: number
    product_detail: Product_detail[]
    quantity: number
    PriceProduct: number
    total_price: number
    colorName: string
    ImageProduct: string
    sizeName: string
    imageUrl: string
}
export type Product_detail = {
    id: number | string
    product_id: number
    size_id: string
    color_id: string
}