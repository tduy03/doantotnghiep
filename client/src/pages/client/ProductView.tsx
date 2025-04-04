import React from "react";
import { useProduct } from "../../hook/Product";
import { Eye, Heart, ShoppingCart } from "lucide-react";


const ProductView = () => {
    const { productView } = useProduct();
    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0,
        }).format(price);
    };
    return (
        <div className="container mx-auto p-4 border rounded-lg">
            <h1 className="text-2xl font-bold text-center mb-6">Sản phẩm đã xem</h1>
            {productView.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {productView.map((product, index) => (
                        <div
                            key={index}
                            className="group flex flex-col rounded-lg"
                        >
                            <div className="group relative mx-auto mb-4 w-full p-2">
                                <div className="mb-3 h-[80vw] sm:h-[60vw] md:h-[30vw] lg:h-[25vw] xl:h-[16vw] w-full overflow-hidden bg-slate-200 transition-transform duration-500 ease-in-out">
                                    <img
                                        src={product.product.image}
                                        alt={product.product.image}
                                        className="h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                                    />
                                    {product.product.discount !== null && (
                                        <div className="absolute top-0 right-0 my-3 mx-3 py-1 px-2 rounded-md bg-red-500 text-white">
                                            {product.product.discount}%
                                        </div>
                                    )}
                                </div>
                                <div className="relative">
                                    <div className="absolute bottom-[30px] left-0 right-0 z-10 flex justify-center space-x-4 opacity-0 transition-all duration-300 group-hover:opacity-100">
                                        <a
                                            href={`/productdetail/${product.product.id}/subcate/${product.product.sub_category_id}`}
                                            className="rounded-full bg-white p-2 hover:bg-black hover:text-white"
                                        >
                                            <Eye
                                                color="currentColor"
                                                strokeWidth="1.5"
                                                className="h-4 w-4 sm:h-6 sm:w-6 md:h-8 md:w-8 lg:h-5 lg:w-5"
                                            />
                                        </a>
                                        <div className="rounded-full bg-white p-2 hover:bg-black hover:text-white">
                                            <ShoppingCart
                                                color="currentColor"
                                                strokeWidth="1.5"
                                                className="h-4 w-4 sm:h-6 sm:w-6 md:h-8 md:w-8 lg:h-5 lg:w-5"
                                            />
                                        </div>
                                        <div className="rounded-full bg-white p-2 hover:bg-black hover:text-white">
                                            <Heart
                                                color="currentColor"
                                                strokeWidth="1.5"
                                                className="h-4 w-4 sm:h-6 sm:w-6 md:h-8 md:w-8 lg:h-5 lg:w-5"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <a
                                    href={`productdetail/${product.product.id}/subcate/${product.product.sub_category_id}`}
                                    className="block overflow-hidden"
                                >
                                    <div className="truncate text-center text-sm sm:text-base md:text-lg lg:text-base xl:text-base hover:text-yellow-500">
                                        {product.product.name}
                                    </div>
                                    <div className="block text-center">
                                        {product.product.price_sale !== null && !isNaN(product.product.price_sale) ? (
                                            <>
                                                <span className="mr-1 text-xs sm:text-sm md:text-base lg:text-base text-gray-500 line-through hover:text-yellow-500">
                                                    {formatPrice(product.product.price)}
                                                </span>
                                                <span className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg hover:text-yellow-500">
                                                    {formatPrice(product.product.price_sale)}
                                                </span>
                                            </>
                                        ) : (
                                            <span className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg hover:text-yellow-500">
                                                {product.product.price}
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
                    <p>Không có sản phẩm  nào.</p>
                </div>
            )}
        </div>
    );
};

export default ProductView;
