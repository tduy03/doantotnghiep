import axios from "axios";
import { useEffect, useState } from "react";
import { Product } from "../interfaces/Product";
import { toast } from "react-toastify";

export const useFilterProducts = (
    min_price: number | null,
    max_price: number | null,
    color_id: string,
    size_id: string | null,
    subcate: string | null,
    category: string | null
) => {
    const [filterProductsPrice, setFilterProductsPrice] = useState<Product[]>([]);
    const [filterProductsSubate, setFilterProductsSubate] = useState<Product[]>([]);


    const FilterProductsByPrice = async () => {
        // Nếu không có bất kỳ điều kiện nào, không gọi API
        if (!min_price && !max_price && !color_id && !size_id && !subcate && !category) {
            setFilterProductsPrice([]);
            return;
        }
        try {
            const response = await axios.post("/api/filterProduct", {
                min_price,
                max_price,
                color_id,
                size_id,
                subcate,
                category,
            });

            const products = response.data.products?.data || [];
            const responseMessage = response.data.message || null;

            // Nếu không có sản phẩm trả về
            if (!products.length) {
                toast.error(responseMessage);
            } else {
                setFilterProductsPrice(products);
            }
        } catch (error) {
            console.error("Error fetching filtered products:", error);
            toast.error("Lỗi khi tải sản phẩm!");
        }
    };

    // Gọi API mỗi khi một trong các giá trị phụ thuộc thay đổi
    useEffect(() => {
        FilterProductsByPrice();
    }, [min_price, max_price, category, color_id, size_id, subcate]);



    const FilterProductsBySubCate = async () => {

        try {
            const response = await axios.post("/api/filterProduct", {
                color_id,
                size_id,
                subcate,

            });

            const products = response.data.products?.data || [];
            const responseMessage = response.data.message || null;

            // Nếu không có sản phẩm trả về
            if (!products.length) {
                toast.error(responseMessage);
            } else {
                setFilterProductsSubate(products);
            }
        } catch (error) {
            console.error("Error fetching filtered products:", error);
            toast.error("Lỗi khi tải sản phẩm!");
        }
    };
    useEffect(() => {
        FilterProductsBySubCate();
    }, [color_id, size_id, subcate]);

    return { filterProductsPrice, filterProductsSubate, FilterProductsByPrice, FilterProductsBySubCate };
};
