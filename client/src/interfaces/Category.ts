export interface SubCategory {
    id: string;
    name: string;
    image: string;
    category_id: string;
    status: string

}

export interface Category {
    id: string;
    name: string;
    slug: string;
    sub_categories: SubCategory[];

}