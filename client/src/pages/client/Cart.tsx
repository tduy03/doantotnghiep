import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, PackageX } from "lucide-react";
import { useCart } from "../../context/Cart";
import axios from "axios";
import { toast } from "react-toastify";
import momo from "../../public/images/Logo-MoMo-Square.webp"
import vnpay from "../../public/images/logovnpay.png"
const Cart = () => {
    const { cart, removeFromCart, increaseQuantity, decreaseQuantity } =
        useCart();
    console.log(cart);

    const [currentPage, setCurrentPage] = useState(1);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const productsPerPage = 3;
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = cart.slice(indexOfFirstProduct, indexOfLastProduct);
    const safeCart = Array.isArray(cart) ? cart : []; // Default to empty array if cart is not an array
    // Then use safeCart instead of cart
    const totalCartPrice = safeCart.reduce(
        (acc, item) => acc + item.PriceProduct * item.quantity,
        0,
    );

    const handlecheckNav = (event: any) => {
        for (let item of cart) {
            // console.log(item);
            if (item.quantity > item.product_detail.quantity) {
                event.preventDefault();
                toast.error(`Số lượng sản phẩm ${item.NameProduct} , vượt quá số lượng có sẵn trong kho`);
                return;
            }
        }
    }

    const totalPages = Math.ceil(cart.length / productsPerPage);
    const handleCheckboxChange = (id: number) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
        );
    };
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
            minimumFractionDigits: 0,
        }).format(price);
    };
    //   const soluongtong = Number(cart.map(item => item.product_detail.quantity)); // số lượng chi tiết sản phẩm
    //   console.log(soluongtong);

    //   const soluongcart = Number(cart.map(item => item.quantity));
    // console.log(soluongcart);



    // console.log(item);


    return (
        <>

            <section className=" bg-slate-100 pt-2 ">
                <div className="mx-auto max-w-screen-xl px-4 xl:min-h-[620px]  min-h-[720px]  2xl:px-0">
                    <div className=" px-5 py-1 pt-1 xl:mt-3 bg-white xl:py-5">
                        <div className="">
                            <h1 className="text-xl font-bold text-gray-600  xl:text-2xl">
                                Giỏ hàng.
                            </h1>
                        </div>
                    </div>
                    {currentProducts.length === 0 ? (
                        <div className="flex flex-col items-center justify-center">
                            <div className="mt-6 flex flex-col items-center">
                                <PackageX size={200} strokeWidth="0.1" className="opacity-50" />
                                <span className="text-gray-500">
                                    Không có sản phẩm nào trong giỏ hàng.
                                </span>
                                <Link to="/" className="mt-2 text-xl hover:text-yellow-500">
                                    Tiếp tục mua sắm.
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="mb-7 xl:mt-4 mt-2 md:gap-6 lg:flex lg:items-start xl:gap-4">
                            <div className="relative mx-auto w-full flex-none overflow-hidden lg:max-w-2xl xl:min-h-[620px] xl:max-w-4xl min-h-[620px] ">
                                <div className="mb-20 space-y-6">
                                    {currentProducts.map((item) => {
                                        const totalPrice = item.PriceProduct * item.quantity;
                                        return (
                                            <div
                                                key={item.id}
                                                className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6"
                                            >
                                                <div className="space-y-1 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0 xl:space-y-4">
                                                    <div className="flex gap-2">
                                                        {/* <input
                                                            type="checkbox"
                                                            value={item.id}
                                                            onChange={() => handleCheckboxChange(item.id)}
                                                        /> */}
                                                        <a href="#" className="shrink-0 md:order-1">
                                                            <img
                                                                className="h-20 w-16 xl:h-28 xl:w-20 dark:hidden"
                                                                src={item.imageUrl}
                                                                alt="product image"
                                                            />
                                                            <img
                                                                className="hidden h-20 w-20 dark:block"
                                                                src={item.imageUrl}
                                                                alt="product image"
                                                            />
                                                        </a>
                                                        <div className="xl:hidden md:hidden">
                                                            <a
                                                                href="#"
                                                                className="dark:text-dark text-[15px] font-medium text-gray-900 hover:underline xl:hidden xl:text-base"
                                                            >
                                                                {item.NameProduct}
                                                            </a>
                                                            <div className="mt-2 flex items-center xl:mt-0">
                                                                <div className="mr-3 text-[14px] opacity-50 lg:mr-0 xl:hidden">
                                                                    Size: {item.sizeName}, Màu: {item.colorName}
                                                                </div>
                                                                <button
                                                                    onClick={() => decreaseQuantity(item.id)}
                                                                    type="button"
                                                                    className="inline-flex h-5 w-5 items-center justify-center rounded-md border bg-gray-100 hover:bg-gray-200"
                                                                >
                                                                    <svg
                                                                        className="h-2.5 w-2.5 text-gray-900"
                                                                        aria-hidden="true"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        fill="none"
                                                                        viewBox="0 0 18 2"
                                                                    >
                                                                        <path
                                                                            stroke="currentColor"
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            strokeWidth={2}
                                                                            d="M1 1h16"
                                                                        />
                                                                    </svg>
                                                                </button>
                                                                <input
                                                                    type="text"
                                                                    className="w-10 text-center"
                                                                    value={item.quantity}
                                                                    readOnly
                                                                />
                                                                <button
                                                                    onClick={() => increaseQuantity(item.id)}
                                                                    type="button"
                                                                    className="inline-flex h-5 w-5 items-center justify-center rounded-md border bg-gray-100 hover:bg-gray-200"
                                                                >
                                                                    <svg
                                                                        className="h-2.5 w-2.5 text-gray-900"
                                                                        aria-hidden="true"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        fill="none"
                                                                        viewBox="0 0 18 18"
                                                                    >
                                                                        <path
                                                                            stroke="currentColor"
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            strokeWidth={2}
                                                                            d="M9 1v16M1 9h16"
                                                                        />
                                                                    </svg>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center justify-between md:order-3 md:justify-end">
                                                        <div className="hidden items-center md:flex">
                                                            <button
                                                                onClick={() => decreaseQuantity(item.id)}
                                                                type="button"
                                                                className="inline-flex h-5 w-5 items-center justify-center rounded-md border bg-gray-100 hover:bg-gray-200"
                                                            >
                                                                <svg
                                                                    className="h-2.5 w-2.5 text-gray-900"
                                                                    aria-hidden="true"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fill="none"
                                                                    viewBox="0 0 18 2"
                                                                >
                                                                    <path
                                                                        stroke="currentColor"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={2}
                                                                        d="M1 1h16"
                                                                    />
                                                                </svg>
                                                            </button>
                                                            <input
                                                                type="text"
                                                                className="w-10 text-center"
                                                                value={item.quantity}
                                                                readOnly
                                                            />
                                                            <button
                                                                onClick={() => increaseQuantity(item.id)}
                                                                type="button"
                                                                className="inline-flex h-5 w-5 items-center justify-center rounded-md border bg-gray-100 hover:bg-gray-200"
                                                            >
                                                                <svg
                                                                    className="h-2.5 w-2.5 text-gray-900"
                                                                    aria-hidden="true"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fill="none"
                                                                    viewBox="0 0 18 18"
                                                                >
                                                                    <path
                                                                        stroke="currentColor"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={2}
                                                                        d="M9 1v16M1 9h16"
                                                                    />
                                                                </svg>
                                                            </button>

                                                        </div>
                                                        <div className="hidden text-end md:order-4 md:w-48 lg:block ">
                                                            {item.product_detail.product.price_sale !== null ? (
                                                                <div className=" ">

                                                                    <p className="dark:text-dark text-base  text-gray-900 line-through opacity-50">
                                                                        {formatPrice(item.product_detail.product.price)}
                                                                    </p>
                                                                    <p className="dark:text-dark text-base font-bold text-red-500">
                                                                        {formatPrice(item.product_detail.product.price_sale)}
                                                                    </p>

                                                                </div>
                                                            ) : (
                                                                <p className="dark:text-dark text-base font-bold text-red-500">
                                                                    {formatPrice(item.product_detail.product.price)}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="w-full min-w-0 flex-1 md:order-2 md:max-w-md xl:space-y-4">
                                                        <a
                                                            href="#"
                                                            className="dark:text-dark hidden text-base font-medium text-gray-900 hover:underline md:block xl:block"
                                                        >
                                                            {item.NameProduct}
                                                        </a>
                                                        <div className="hidden md:block  text-[14px] opacity-50">
                                                            Size: {item.sizeName}, Màu: {item.colorName}
                                                        </div>
                                                        <div className="flex items-center justify-between lg:justify-start gap-10 xl:gap-4">
                                                            <button
                                                                type="button"
                                                                className="inline-flex items-center  text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white"
                                                            >
                                                                <svg
                                                                    className="me-1.5 h-5 w-5"
                                                                    aria-hidden="true"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width={24}
                                                                    height={24}
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path
                                                                        stroke="currentColor"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={2}
                                                                        d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                                                                    />
                                                                </svg>
                                                                Yêu thích
                                                            </button>
                                                            <button
                                                                onClick={() => removeFromCart(item.id)}
                                                                type="button"
                                                                className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                                                            >
                                                                <svg
                                                                    className="me-1.5 h-5 w-5"
                                                                    aria-hidden="true"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width={24}
                                                                    height={24}
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path
                                                                        stroke="currentColor"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={2}
                                                                        d="M6 18 17.94 6M18 18 6.06 6"
                                                                    />
                                                                </svg>
                                                                Xóa
                                                            </button>
                                                            <div className="text-end md:order-4 md:w-32 lg:hidden ">
                                                                <p className="dark:text-dark text-base  text-gray-900 line-through opacity-50">
                                                                    {formatPrice(item.product_detail.product.price)}
                                                                </p>
                                                                <p className="dark:text-dark text-base font-bold text-gray-900">
                                                                    {formatPrice(item.product_detail.product.price_sale)}
                                                                </p>
                                                                {/* <p className="dark:text-dark text-base font-bold text-red-500">
                                                                    {formatPrice(totalPrice)}
                                                                </p> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="absolute bottom-0 flex w-full justify-center p-4 shadow-lg">
                                    {/* Nút Previous */}
                                    <button
                                        className="mx-1 rounded-md text-gray-700 hover:bg-yellow-300"
                                        onClick={() =>
                                            setCurrentPage((prev) => Math.max(prev - 1, 1))
                                        }
                                        disabled={currentPage === 1}
                                    >
                                        <ChevronLeft strokeWidth={0.5} />
                                    </button>
                                    {/* Số trang */}

                                    <span className="p-2 opacity-60">{` ${currentPage} / ${totalPages}`}</span>
                                    {/* Nút Next */}
                                    <button
                                        onClick={() =>
                                            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                                        }
                                        disabled={currentPage === totalPages}
                                        className="mx-1 rounded-md text-gray-700 hover:bg-yellow-300"
                                    >
                                        <ChevronRight strokeWidth={0.5} />
                                    </button>
                                </div>
                            </div>
                            <div className="mx-auto mt-6 max-w-4xl flex-1 xl:space-y-6  lg:mt-0 lg:w-full sticky bottom-0 z-40">
                                <div className="xl:space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                                    <div className="flex justify-between">
                                        <p className=" text-base xl:text-xl font-semibold text-gray-900">
                                            Tổng giá trị đơn hàng:
                                        </p>
                                        <div className="flex justify-end xl:hidden ">
                                            <Link
                                                to={"/checkout"}
                                                onClick={handlecheckNav}
                                                className="rounded-md bg-yellow-400 px-4 py-2 hover:bg-yellow-300 text-[14px]"
                                            >
                                                Đặt hàng
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="  ">
                                        <dl className="flex items-center xl:justify-between gap-4 ">
                                            <dt className="text-[15px] opacity-70 xl:text-base font-bold text-gray-900">Giá:</dt>
                                            <dd className="text-base font-bold text-red-500">
                                                {formatPrice(totalCartPrice)}
                                            </dd>
                                        </dl>
                                        <div className=" justify-center hidden xl:flex mt-5">
                                            <Link
                                                to={"/checkout"}
                                                onClick={handlecheckNav}
                                                className="rounded-md bg-yellow-400  xl:px-5 xl:py-3 hover:bg-yellow-300 "
                                            >
                                                Đặt hàng
                                            </Link>
                                        </div>
                                        <div className="hidden lg:block">
                                            <div className="flex gap-4 justify-center mt-10 mb-2 ">

                                                <img src={vnpay} alt="" className="w-24" />
                                            </div>
                                            <p className="text-[14px] opacity-60 text-center">Đảm bảo thanh toán an toàn và bảo mật</p>
                                        </div>
                                        {/* <div className="flex justify-center">
                                            <button
                                                onClick={handleButtonClick}
                                                className="rounded-md bg-yellow-400 px-5 py-3 hover:bg-yellow-300"
                                            >
                                                Đặt hàng
                                            </button>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default Cart;
