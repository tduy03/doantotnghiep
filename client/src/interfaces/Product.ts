// Định nghĩa kiểu cho variants (biến thể)
export interface ProductVariants {
    sizes: string[];
    colors: string[];
}

// Định nghĩa kiểu cho sản phẩm
export interface Product {
    id: string;
    name: string;
    price: number
    image: string;
    variants: ProductVariants;
    description: string;
    sub_category_id: string
    price_sale: number
    images: ImageProd[]
    content: string
    imageUrl: string
    discount: Discount;
}

export interface Discount {
    id: number;
    discount_percent: string;
    expires_at: string;
    is_active: number;
}
export interface ImageProd {
    id: string;
    image: string;
    product_image_id: string
}
export interface ApiResponse {
    status: string;
    products: Product[];
    products_hot: Product[];
    products_sale: Product[];
    products_showhome: Product[];
}

export interface Colors {
    id: string
    name: string
    color_code: string
}

export interface Sizes {
    id: string
    name: string
}
export interface User {
    id: number;
    name: string;
}

export interface Reply {
    id: number;
    comment: string;
    rating: number;
    created_at: string;
    user: User;
}

export interface Comment {
    id: number;
    comment: string;
    rating: number;
    created_at: string;
    user: User;
    replies: Reply[];
}

export interface CommentsResponse {
    comments: Comment[];
}

export interface Discount {
    id: number,
    discount_percent: number,
    is_active: number,
    sub_category_id: number
}

export interface ProductView {
    id: number;
    product: {
        id: number;
        name: string;
        image: string;
        price: number;
        price_sale?: number;
        discount: Discount;
    };
    product_id: number;
    user_id: number;
    viewed_at: string;
}