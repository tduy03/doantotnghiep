import axios, { AxiosError } from "axios";
import {
    Comment,
    ImageProd,
    Product,
    ProductView,
} from "../interfaces/Product";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLoading } from "../context/Loading";
import { toast } from "react-toastify";
interface AvgComment {
    avgComment: number;
    startComment: number;
}
export const useProduct = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [expiresTimeProducts, setExpiresTimeProducts] = useState();
    const [product, setProduct] = useState<Product>();
    const [productsHots, setProductsHots] = useState<Product[]>([]);
    const [productView, setproductViews] = useState<ProductView[]>([]);
    const [imgsProduct, setImgsProduct] = useState<ImageProd>();
    const [productsSale, setProductsSale] = useState<Product[]>([]);
    const [comments, setComments] = useState<Comment[]>([]);
    const [ProductBycategorys, setProductBycategory] = useState<Product[]>([]);
    const { loading, setLoading } = useLoading();
    const { id, idd } = useParams();
    const [avgComments, setAvgComments] = useState<AvgComment[]>([]);
    const [StartComments, setStartComments] = useState<AvgComment[]>([]);

    // console.log(avgComments);
    const [userId, setUserId] = useState<number | null>(null);
    // để nhiều cái này bị lỗi api là 429
    const fetchProducts = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get("/api/products");
            setProducts(data);
            setProductsHots(data.products_hot);
            setProductsSale(data.products_sale);
            setExpiresTimeProducts(data.products_sale[0].discount.expires_at);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchProducts();
    }, []);

    // Lấy sản phẩm theo ID
    //   const getProductById = async (id: string, idd: string) => {
    //     try {
    //       setLoading(true);
    //       const response = await axios.get(
    //         `/api/productDetai/${id}/subcate/${idd}`,
    //       );
    //       setProduct(response.data.Product);
    //       setImgsProduct(response.data.Product.images);
    //     } catch (error) {
    //       toast.error((error as AxiosError)?.message);
    //     } finally {
    //       setLoading(false);
    //     }
    //   };
    //   useEffect(() => {
    //     if (id && idd) {
    //       getProductById(id, idd);
    //     }
    //   }, [id, idd]);

    // Lấy bình luận theo sản phẩm
    const getComment = async (id: string) => {
        try {
            setLoading(true);
            const response = await axios.get(
                `/api/productDetai/${id}/subcate/${idd}`,
            );
            setComments(response.data.comments);
        } catch (error) {
            toast.error((error as AxiosError)?.message);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (id) {
            getComment(id);
        }
    }, [id]);
    // Lấy sản phẩm theo danh mục
    const getProductBycategory = async (id: string, idd: string) => {
        try {
            setLoading(true);
            const response = await axios.get(
                `/api/productDetai/${id}/subcate/${idd}`,
            );
            setProductBycategory(response.data.ProductSubCategory);
            console.log(response.data.ProductSubCategory);
        } catch (error) {
            toast.error((error as AxiosError)?.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id && idd) {
            getProductBycategory(id, idd);
        }
    }, [id, idd]);
    // Lấy sản phẩm theo ID
    const getProductById = async (id: string, idd: string) => {
        try {
            setLoading(true);
            const response = await axios.get(
                `/api/productDetai/${id}/subcate/${idd}`,
            );
            setProduct(response.data.Product);
            setImgsProduct(response.data.Product.images);
            setAvgComments(response.data.avgComment);
            setStartComments(response.data.startComment);
            // console.log(response.data.avgComment);
        } catch (error) {
            toast.error((error as AxiosError)?.message);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (id && idd) {
            getProductById(id, idd);
        }
    }, [id, idd]);

    // thêm bình luận

    const checkToken = localStorage.getItem("user");
    const checkTokenn = localStorage.getItem("token");
    useEffect(() => {
        const userID = JSON.parse(checkToken);
        if (checkToken) {
            setUserId(userID.id);
        }
    }, []);

    // gửi sản phẩm đã xem

    const addProductView = async (productId: string) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.log("Bạn chưa đăng nhập. Vui lòng đăng nhập để tiếp tục.");
                return;
            }
            await axios.post("/api/products/viewed", {
                product_id: productId,
                user_id: userId,
            });
        } catch { }
    };
    // lấy dữ liệu product view

    const getProductView = async () => {
        if (userId === null) {
            return;
        }
        try {
            const response = await axios.post("/api/products/recently-viewed", {
                user_id: userId,
            });
            setproductViews(response.data); // Dữ liệu trả về đúng cấu trúc log
        } catch (error) {
            toast.error((error as AxiosError)?.message);
        }
    };

    useEffect(() => {
        if (userId !== null) {
            getProductView();
        }
    }, [userId]);
    return {
        products,
        product,
        loading,
        productsHots,
        productsSale,
        comments,
        getComment,
        ProductBycategorys,
        getProductBycategory,
        imgsProduct,
        expiresTimeProducts,
        productView,
        getProductView,
        avgComments,
        StartComments,
        addProductView,
    };
};
