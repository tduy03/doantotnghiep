import React, { useEffect, useRef, useState } from "react";
import useFavorites from "../../hook/useFavorites";
import { Product } from "../../interfaces/Product";
import {
    ChevronLeft,
    ChevronRight,
    Eye,
    Heart,
    ShoppingCart,
} from "lucide-react";
import ModalAddToCart from "../../components/client/Home/ModalAddToCart/ModalAddToCart";
import { useModalAddCartProvider } from "../../context/MoDalAddToCart";

type Props = {};

const ProductWishlist: React.FC<Props> = () => {
    const { isOpenModalAddToCart, setIsOpenModalAddToCart } = useModalAddCartProvider();
    const [selectedProductId, setSelectedProductId] = useState<{ id: string; idSub: string } | null>(null);
    const openModal = (id: string, idSub: string) => {
        setSelectedProductId({ id, idSub });
        setIsOpenModalAddToCart(true);
    };
    const closeModal = () => {
        setIsOpenModalAddToCart(false);

    };

    const { favorites, removeFromFavorites } = useFavorites();
    const lastProductRef = useRef<HTMLDivElement | null>(null); // Tạo ref cho sản phẩm cuối
    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0,
        }).format(price);
    };
    useEffect(() => {
        if (favorites.length >= 4) {
            lastProductRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [favorites]); // Mỗi khi danh sách favorites thay đổi, thực hiện kiểm tra

    return (
        <>
            <h1 className="text-center text-xl font-bold">Sản phẩm yêu thích</h1>
            {favorites.length > 0 ? (
                <div className="grid grid-cols-1 gap-2 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-[1300px] mx-auto">
                    {favorites.map((product: Product, index) => (
                        <div
                            key={index}
                            ref={index === favorites.length - 1 ? lastProductRef : null} // Gắn ref vào sản phẩm cuối
                            className="flex "
                        >
                            <div className="group relative mx-auto mb-4 h-[80vw] w-[45vw] p-2 md:h-[60vw] md:w-[30vw] lg:h-[30vw] lg:w-[17vw] xl:w-[18vw]">
                                <div className="mb-3 h-[80%] w-full overflow-hidden bg-slate-200 transition-transform duration-500 ease-in-out ">
                                    <img
                                        src={product.imageUrl}
                                        alt={product.imageUrl}
                                        className="h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                                    />

                                    {product.product.discount_id !== null && (
                                        <div className='absolute top-0 right-0 my-3 mx-3 py-1 px-2 rounded-md bg-red-500 text-white sale-badge'>
                                            {product.product.discount.discount_percent}%
                                        </div>
                                    )}

                                </div>
                                <div className="relative">
                                    <div className="absolute bottom-[30px] left-0 right-0 z-10 flex justify-center space-x-4 opacity-0 transition-all duration-300 group-hover:opacity-100">
                                        <a
                                            href={`productdetail/${product.product.id}/subcate/${product.product.sub_category_id}`}
                                            className="rounded-full bg-white p-2 hover:bg-black hover:text-white"
                                        >
                                            <Eye
                                                color="currentColor"
                                                strokeWidth="1.5"
                                                className="h-4 w-4 sm:h-8 sm:w-8 md:h-7 md:w-7 lg:h-7 lg:w-7 xl:h-6 xl:w-6"
                                            />
                                        </a>
                                        <div className="rounded-full bg-white p-2 hover:bg-black hover:text-white">
                                            <ShoppingCart
                                                color="currentColor"
                                                strokeWidth="1.5"
                                                className="h-4 w-4 sm:h-8 sm:w-8 md:h-7 md:w-7 lg:h-7 lg:w-7 xl:h-6 xl:w-6"
                                                onClick={() => openModal(product.product.id, product.product.sub_category_id)}
                                            />
                                        </div>
                                        <div className="rounded-full bg-white p-2 hover:bg-black hover:text-white">
                                            <Heart
                                                onClick={() => removeFromFavorites(product.product.id)}
                                                color="currentColor"
                                                strokeWidth="1.5"
                                                className="h-4 w-4 sm:h-8 sm:w-8 md:h-7 md:w-7 lg:h-7 lg:w-7 xl:h-6 xl:w-6"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <a
                                    href={`productdetail/${product.product.id}/subcate/${product.product.sub_category_id}`}
                                    className="block overflow-hidden"
                                >
                                    <div className="truncate text-center text-sm hover:text-yellow-500 md:text-base lg:text-base xl:text-base">
                                        {product.product.name}
                                    </div>
                                    <div className="block text-center">
                                        {product.product.price_sale !== null && !isNaN(product.product.price_sale) ? (
                                            <>
                                                <span className="mr-1 text-xs md:text-sm lg:text-base xl:text-base text-gray-500 line-through hover:text-yellow-500">
                                                    {formatPrice(product.product.price)}
                                                </span>
                                                <span className="text-sm md:text-base lg:text-lg xl:text-xl hover:text-yellow-500">
                                                    {formatPrice(product.product.price_sale)}
                                                </span>
                                            </>
                                        ) : (
                                            <span className="text-sm md:text-base lg:text-lg xl:text-xl hover:text-yellow-500">
                                                {formatPrice(product.product.price)}
                                            </span>
                                        )}
                                    </div>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="mt-6 text-center">
                    <p>Bạn chưa có sản phẩm yêu thích nào.</p>
                </div>
            )}
            <div className="text-center">
                <div className="mt-4 flex justify-center">
                    {/* Nút Previous */}
                    <button className="mx-2 rounded-md border-2 p-1 text-gray-700 hover:bg-yellow-300">
                        <ChevronLeft strokeWidth={0.5} />
                    </button>

                    {/* Số trang */}
                    <button className="mx-1 rounded-md border-2 px-3 py-1 text-gray-700 hover:bg-yellow-100">
                        1
                    </button>

                    {/* Nút Next */}
                    <button className="mx-2 rounded-md border-2 p-1 text-gray-700 hover:bg-yellow-300">
                        <ChevronRight strokeWidth={0.5} />
                    </button>
                </div>
                <ModalAddToCart
                    isOpenModalAddToCart={isOpenModalAddToCart}
                    closeModal={closeModal}
                    productId={selectedProductId}

                />
            </div>
        </>
    );
};

export default ProductWishlist;
