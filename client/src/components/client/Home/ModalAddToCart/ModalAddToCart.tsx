import axios, { AxiosError } from "axios";
import { X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useLoading } from "../../../../context/Loading";
import { Product } from "../../../../interfaces/Product";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useColor } from "../../../../hook/Color";
import { useCart } from "../../../../context/Cart";
import { useModalAddCartProvider } from "../../../../context/MoDalAddToCart";
import useFormatPrice from "../../../../hook/useFormatPrice";
type ModalAddToCartProps = {
    isOpenModalAddToCart: boolean;
    closeModal: () => void;
    productId: { id: string; idSub: string } | null; // Hỗ trợ null
};

const ModalAddToCart = ({
    isOpenModalAddToCart,
    closeModal,
    productId = { id: "", idSub: "" },
}: ModalAddToCartProps) => {
    const { formatPrice } = useFormatPrice();
    const { setLoading } = useLoading();
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [isAnimating, setIsAnimating] = useState(false);
    const [product, setProduct] = useState<Product>();
    const { color, size } = useColor();
    const [size_id, setSizeId] = useState<{ id: string; name: string } | null>(
        null,
    );
    const [color_id, setColorId] = useState<{ id: string; name: string } | null>(
        null,
    );
    const { setIsOpenModalAddToCart } = useModalAddCartProvider();
    useEffect(() => {
        if (isOpenModalAddToCart) {
            setTimeout(() => {
                setIsAnimating(true);
            }, 10);
        } else {
            setIsAnimating(false);
        }
    }, [isOpenModalAddToCart]);

    const incurement = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };
    const dercrement = () => {
        setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };

    const getProductById = async (id: string, idSub: string) => {
        try {
            setLoading(true);
            const response = await axios.get(
                `/api/productDetai/${id}/subcate/${idSub}`,
            );
            setProduct(response.data.Product);
            console.log(product);
        } catch (error) {
            toast.error((error as AxiosError)?.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (productId?.id && productId?.idSub) {
            getProductById(productId.id, productId.idSub);
        }
    }, [productId]);

    if (!isOpenModalAddToCart) {
        return null;
    }

    const handleSize = (id: string, name: string, isChecked: boolean) => {
        if (isChecked) {
            setSizeId({ id, name });
            console.log({ id, name });
        } else {
            setSizeId(null);
        }
    };

    const handleColor = (id: string, name: string, isChecked: boolean) => {
        if (isChecked) {
            setColorId({ id, name });
        } else {
            setColorId(null);
        }
    };
    const handleAddToCart = async (
        product: Product,
        color_id: string,
        size_id: string,
    ) => {
        try {
            // Chỉ lấy id của color và size (không có name)
            const colorId = color_id.id; // Chỉ lấy id của color
            const sizeId = size_id.id; // Chỉ lấy id của size
            const price = product.price_sale ?? product.price;
            // Thực hiện thêm sản phẩm vào giỏ hàng với các tham số cần thiết
            await addToCart({
                ...product,
                price,
            }, colorId, sizeId, quantity);

            // Đóng modal sau khi thêm thành công
            setIsOpenModalAddToCart(false);
        } catch (error) {
            // Xử lý lỗi khi có vấn đề xảy ra
            console.error("Error adding to cart:", error);
        }
    };

    return (
        <>
            {product && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
                    onClick={closeModal}
                >
                    <div
                        className={`h-auto max-h-[90%] w-full max-w-[90%] transform overflow-auto rounded bg-white p-4 text-center shadow-lg transition-all duration-700 ease-in-out sm:max-w-[500px] md:max-w-[600px] md:p-6 ${isOpenModalAddToCart && isAnimating
                            ? "translate-y-0 opacity-100"
                            : "-translate-y-8 opacity-0"
                            }`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="absolute right-4 top-3">
                            <button onClick={closeModal}>
                                <X />
                            </button>
                        </div>

                        <div className="mt-4 flex flex-col items-start gap-4 md:flex-row">
                            <img
                                src={product.imageUrl}
                                className="h-64 w-full object-cover md:h-full md:w-40"
                                alt=""
                            />
                            <div className="flex-1">
                                <p className="text-[13px] md:text-[18px]">{product.name}</p>
                                {product.price_sale !== null ? (
                                    <>
                                        <span className="mr-1 text-xs text-gray-500 line-through hover:text-yellow-500 md:text-sm lg:text-base xl:text-base">
                                            {formatPrice(product.price)} 
                                        </span>
                                        <span className="text-sm hover:text-yellow-500 md:text-base lg:text-lg xl:text-xl text-red-500">
                                            {formatPrice(product.price_sale)} 
                                        </span>
                                    </>
                                ) : (
                                    <span className="text-sm hover:text-yellow-500 md:text-base lg:text-lg xl:text-xl text-red-500">
                                        {formatPrice(product.price)} 
                                    </span>
                                )}
                                <div className="mt-3 flex items-center text-sm font-medium text-gray-700">
                                    <p className="text-[13px] md:text-base">Size: </p>
                                    {size_id && (
                                        <p className="ml-1 text-[12px] md:text-base">
                                            {size_id.name}
                                        </p>
                                    )}
                                </div>

                                <div className="mt-2">
                                    <div className="flex flex-wrap items-center gap-2">
                                        {size.map((item) => (
                                            <label
                                                key={item.id}
                                                className="relative flex cursor-pointer items-center"
                                            >
                                                <input
                                                    type="checkbox"
                                                    className="peer h-6 w-6 cursor-pointer appearance-none border border-slate-300 shadow transition-all checked:bg-yellow-300 hover:shadow-md md:h-9 md:w-9"
                                                    onChange={(e) =>
                                                        handleSize(item.id, item.name, e.target.checked)
                                                    }
                                                    checked={size_id?.id === item.id}
                                                />
                                                <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-[11px] text-sm uppercase text-gray-500 opacity-100 transition-colors peer-checked:text-black peer-checked:opacity-100">
                                                    {item.name}
                                                </span>
                                            </label>
                                        ))}
                                    </div>

                                    <div className="mt-3 flex items-center text-sm font-medium text-gray-700">
                                        <p className="text-[13px] md:text-base">Màu: </p>
                                        {color_id && (
                                            <p className="text-[12px] md:text-base">
                                                {color_id.name}
                                            </p>
                                        )}
                                    </div>

                                    <div className="mt-2 flex flex-wrap items-center gap-2">
                                        {color.map((item) => (
                                            <div key={item.id}>
                                                <input
                                                    type="checkbox"
                                                    className="peer h-6 w-6 cursor-pointer appearance-none rounded-full border border-slate-300 shadow transition-all hover:shadow-md focus:outline-none focus:ring-2 md:h-7 md:w-7"
                                                    onChange={(e) =>
                                                        handleColor(item.id, item.name, e.target.checked)
                                                    }
                                                    checked={color_id?.id === item.id}
                                                    style={{
                                                        backgroundColor: item.color_code,
                                                    }}
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    <Link
                                        className="text-[14px] font-extralight hover:text-yellow-500"
                                        to={`productdetail/${product.id}/subcate/${product.sub_category_id}`}
                                    >
                                        Xem chi tiết
                                    </Link>

                                    <div className="mt-4 flex items-center">
                                        <button
                                            className="rounded-sm border bg-gray-200 px-3 py-1 hover:bg-gray-300 xl:py-2"
                                            onClick={dercrement}
                                        >
                                            -
                                        </button>
                                        <input
                                            type="number"
                                            value={quantity}
                                            readOnly
                                            className="w-16 appearance-none border-b border-t border-gray-300 py-1 text-center xl:py-2"
                                            style={{
                                                WebkitAppearance: "none",
                                                MozAppearance: "textfield",
                                            }}
                                        />
                                        <button
                                            className="mr-4 rounded-sm border bg-gray-200 px-3 py-1 hover:bg-gray-300 xl:py-2"
                                            onClick={incurement}
                                        >
                                            +
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleAddToCart(product, size_id, color_id, quantity)
                                            }
                                            className="rounded-sm bg-yellow-400 px-7 py-2 text-[15px] text-gray-800 hover:bg-yellow-300 md:text-base xl:py-2"
                                        >
                                            Thêm vào giỏ hàng
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ModalAddToCart;
