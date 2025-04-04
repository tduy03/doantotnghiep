import React, { ChangeEvent, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faL, faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { ChevronDown, ChevronRight, Eye, Heart, ShoppingCart, User } from "lucide-react";
import { useProduct } from "../../hook/Product";
import { Colors, Product, Sizes } from "../../interfaces/Product";
import { useColor } from "../../hook/Color";
import { useCart } from "../../context/Cart";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../css/slickvoucher.css";

// import required modules
import { Navigation, Thumbs } from 'swiper/modules';
import ModalVoucher from "../../components/ModalVoucher/ModalVoucher";
import { usePromotion } from "../../hook/usePromotion";
import Slider from "react-slick";
import { useModalAddCartProvider } from "../../context/MoDalAddToCart";
import ModalAddToCart from "../../components/client/Home/ModalAddToCart/ModalAddToCart";

const ProductDetail: React.FC = () => {
    const { isOpenModalAddToCart, setIsOpenModalAddToCart } = useModalAddCartProvider();
    const [selectedProductId, setSelectedProductId] = useState<{ id: string; idSub: string } | null>(null);
    const openModal = (id: string, idSub: string) => {
        setSelectedProductId({ id, idSub });
        setIsOpenModalAddToCart(true);
    };
    const closeModal = () => {
        setIsOpenModalAddToCart(false);

    };

    const settings = {
        dots: false,
        speed: 500,
        slidesToShow: 1,
        arrows: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const { product, comments, ProductBycategorys, avgComments, StartComments } = useProduct();

    const [selectSize, setSelectSize] = useState<Sizes>({ id: '', name: '' });
    const [selectColor, setSelectColor] = useState<Colors>({ id: '', name: '', color_code: '' });
    const [quantity, setQuantity] = useState(1);
    const [showDescription, setShowDescription] = useState(true);
    const [showComment, setShowComment] = useState(false);
    const { color, size } = useColor();
    const [selectedImage, setSelectedImage] = useState(null);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const { addProductView } = useProduct();

    const [openVoucher, setOpenVoucher] = useState(false)
    const { promotions, addPromotion } = usePromotion();
    const handleOpenVoucher = () => {
        setOpenVoucher(true);
    }
    const handleCloseVoucher = () => {
        setOpenVoucher(false);
    }

    const { addToCart } = useCart();

    useEffect(() => {
        if (product) {
            addProductView(product.id);
        }
    }, [product]);
    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0,
        }).format(price);
    };
    // Tăng giảm sô lượng
    const incurement = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };
    const dercrement = () => {
        setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };

    const handleChangeSize = (event: ChangeEvent<HTMLInputElement>, sizeName: string) => {
        setSelectSize({
            id: String(event.target.value),
            name: sizeName,
        });
    };


    const handleChangeColor = (event: ChangeEvent<HTMLInputElement>, colorName: string) => {
        setSelectColor({
            id: event.target.value,
            name: colorName,
            color_code: ''
        });
    };

    // Mô tả & Comment
    const showOnlyDescription = () => {
        setShowDescription(true);
        setShowComment(false);
    };
    const showOnlyComment = () => {
        setShowComment(true);
        setShowDescription(false);
    };

    const handleAddToCart = async (product: Product, color_id: string, size_id: string) => {
        try {
            const price = product.price_sale ?? product.price;
            await addToCart({
                ...product,
                price,
            }, color_id, size_id, quantity);
            console.log(`Sản phẩm được thêm với giá: ${price}`);
        } catch (error) {
            console.error(error);
        }


    };

    //Promotion

    const handleAddPromotion = (id: string) => {
        addPromotion(id);
    };
    // console.log(avgComments);

    return (
        <>
            {product && (
                <div className="mx-2 mt-4 overflow-hidden md:mx-7 lg:mx-[100px] xl:mx-[150px] lg:mt-14">
                    <div className="md:flex lg:flex justify-center md:gap-10">
                        <div className="flex gap-4 xl:gap-6">
                            {/* Danh sách ảnh (Swiper) - Hiển thị dọc */}
                            <div className="mb-3 w-[100px] h-[300px] lg:h-[400px] lg:w-[100px] xl:h-[500px] hidden lg:block ">
                                <Swiper
                                    direction="vertical" // Đặt chiều dọc cho swiper
                                    slidesPerView={4} // Đảm bảo nhiều ảnh hiển thị cùng lúc
                                    spaceBetween={10}
                                    onSwiper={setThumbsSwiper}
                                    modules={[Navigation, Thumbs]}
                                    className="h-full w-20 xl:w-20 overflow-hidden"
                                >
                                    {product.images.map((img) => (
                                        <SwiperSlide key={img.id}>
                                            <div
                                                className="p-1 lg:h-[90px] xl:h-[120px] hover:bg-slate-300 cursor-pointer"
                                                onClick={() => setSelectedImage(`http://127.0.0.1:8000/storage/${img.image}`)}
                                            >
                                                <img
                                                    className="h-full w-full object-cover"
                                                    src={`http://127.0.0.1:8000/storage/${img.image}`}
                                                    alt=""
                                                />
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>

                            {/* Ảnh chính */}
                            <div className="mb-3 flex justify-center h-[300px] w-full md:w-[400px] md:h-[500px] lg:w-[250px] lg:h-[400px] xl:w-[400px] xl:h-[500px]">
                                <Swiper
                                    navigation
                                    thumbs={{ swiper: thumbsSwiper }}
                                    modules={[Navigation, Thumbs]}
                                    className="h-full w-full"
                                >
                                    {product.images.map((img) => (
                                        <SwiperSlide key={img.id}>
                                            <img
                                                src={`http://127.0.0.1:8000/storage/${img.image}`}
                                                alt=""
                                                className="w-full h-full object-cover"
                                            />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>

                        <div>
                            <div className="space-y-2">
                                <div className="text-[16px]">
                                    {product.name}
                                </div>
                                <div className="flex items-center">
                                    <div className="flex items-center mr-3">

                                        <span className="mr-2 ">{avgComments} <FontAwesomeIcon className="text-yellow-500" icon={faStarSolid} /></span>
                                        <span className="text-xs">| Đã bán: {product.soldQuantity}</span>
                                    </div>
                                    <div className=" text-[13px] xl:text-sm">
                                        Tình trạng:
                                        {product.stock > 0 ? (
                                            <span className="text-[13px] xl:text-sm font-bold text-green-500 ml-1">Còn hàng</span>
                                        ) : (
                                            <span className="text-[13px] xl:text-sm font-bold text-red-500 ml-1">Hết hàng</span>
                                        )
                                        }
                                    </div>
                                </div>
                                <div className="text-lg font-bold">
                                    {product.price_sale !== null ? (
                                        <>
                                            <span className="mr-1 text-xs md:text-sm lg:text-base xl:text-base text-gray-500 line-through hover:text-yellow-500">
                                                {formatPrice(product.price)}
                                            </span>
                                            <span className="text-sm md:text-base lg:text-lg xl:text-xl hover:text-yellow-500">
                                                {formatPrice(product.price_sale)}
                                            </span>
                                        </>
                                    ) : (
                                        <span className="text-sm md:text-base lg:text-lg xl:text-xl hover:text-yellow-500">
                                            {formatPrice(product.price)}
                                        </span>
                                    )}

                                </div>


                                <div className="mb-2 flex justify-start items-center text-[13px] xl:text-sm md:block gap-3">
                                    <span className="hover:text-yellow-400 md:mr-11">
                                        <Link to="">Giúp bạn chọn size</Link>
                                    </span>
                                    <span className="hover:text-yellow-400">
                                        <a href="">Bảng size</a>
                                    </span>
                                    <span></span>
                                </div>
                            </div>
                            <div className="mb-2 mt-3 text-sm">
                                <span>Màu Sắc: {selectColor.name} </span>
                                <div className="mt-2 flex space-x-2">
                                    {color.map((color, index) => {
                                        return (
                                            <div key={index} className="inline-flex items-center">
                                                <label className="relative flex cursor-pointer items-center">
                                                    <input
                                                        type="checkbox"
                                                        name={color.name}
                                                        value={color.id}
                                                        checked={selectColor.id === color.id}
                                                        onChange={(event) => handleChangeColor(event, color.name)}
                                                        className="peer h-6 w-6 cursor-pointer appearance-none rounded-full border border-slate-300 shadow transition-all hover:shadow-md focus:outline-none focus:ring-2 md:h-7 md:w-7"
                                                        style={{ backgroundColor: color.color_code }}
                                                    />
                                                </label>

                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <div>
                                <div className=" items-center text-sm md:block md:mr-11 md:mt-3">
                                    <span className="md:mr-11 text-sm  mb-8">Kích thước: {selectSize.name}</span>
                                    <div className="flex space-x-2 mt-2">
                                        {size.map((size, index) => (
                                            <label key={index} className="relative flex cursor-pointer items-center">
                                                <input
                                                    type="checkbox"
                                                    name={size.name}
                                                    value={size.id}
                                                    checked={selectSize?.name === size.name}
                                                    onChange={(event) => handleChangeSize(event, size.name)}
                                                    className={`peer h-6 w-6 cursor-pointer appearance-none border border-slate-300 shadow transition-all 
                                                        bg-white hover:shadow-md ${selectSize.name === size.name ? 'bg-yellow-300' : ''} md:h-9 md:w-9`} />
                                                <span className="uppercase pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-[12px] xl:text-sm text-gray-500 transition-colors peer-checked:text-black">
                                                    {size.name}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>


                            <div className=" flex items-center mt-5">
                                <div className="mr-2 text-[14px] xl:text-base">Mô tả:</div>

                                <p className="opacity-70 text-[14px] xl:text-base">{product.description}</p>

                            </div>

                            <div className="mt-7 flex ">
                                <button
                                    className="rounded-sm border bg-gray-200 px-3 xl:py-1  hover:bg-gray-300"
                                    onClick={dercrement}
                                >
                                    -
                                </button>
                                <input
                                    type="number"
                                    value={quantity}
                                    readOnly
                                    className="w-16 appearance-none border-b border-t border-gray-300 text-center text-[13px] xl:text-base"
                                    style={{
                                        WebkitAppearance: "none",
                                        MozAppearance: "textfield",
                                    }}
                                />
                                <button
                                    className="mr-4 rounded-sm border bg-gray-200 px-3 xl:py-1 hover:bg-gray-300"
                                    onClick={incurement}
                                >
                                    +
                                </button>
                                <button className=" text-[13px] xl:text-base w-[300px] rounded-sm bg-yellow-400 px-10 py-3" onClick={() => handleAddToCart(product, selectColor.id, selectSize.id, quantity)}>
                                    Thêm vào giỏ hàng
                                </button>
                            </div>
                            <div>
                                <div onClick={handleOpenVoucher} className="mt-5 flex items-center gap-1">Voucher và khuyến mãi<ChevronDown /></div>
                                <div className="w-[450px]">
                                    <Slider className="custom-slider" {...settings}>
                                        {promotions.map((item) => (
                                            <div
                                                key={item.id}
                                                className="bg-yellow-100 p-4 rounded-lg mt-2 gap-5 px-5"
                                            >
                                                <div className="flex justify-around">
                                                    <div className=" w-[200px] md:w-[400px]">
                                                        <span className=" mr-2">{item.code}</span>
                                                        <span className="text-sm">Giảm: {item.discount}%</span>
                                                        <p className="text-[14px] opacity-50">
                                                            Hết hạn sau: {new Date(item.end_date).toLocaleDateString('vi-VN')}
                                                        </p>
                                                    </div>
                                                    <button
                                                        onClick={() => handleAddPromotion(item.id)}
                                                        className="bg-red-500 py-1 px-3 rounded-lg text-white text-[13px]"
                                                    >
                                                        Nhận
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </Slider>

                                </div>
                                <ModalVoucher

                                    handleCloseVoucher={handleCloseVoucher}
                                    openVoucher={openVoucher}
                                    promotions={promotions}
                                />
                            </div>
                        </div>
                    </div>
                    <hr className="mt-7" />
                    <div>

                        <div className="mb-5 mt-10 flex justify-center space-x-4 lg:space-x-10 lg:text-xl">
                            <h1
                                className={`hovermenuNav hover:text-yellow-500 ${showDescription ? "text-yellow-500" : "text-gray-800"
                                    } hover:bg-blue-700}`}
                            >
                                <button onClick={showOnlyDescription}>Mô tả chi tiết</button>
                            </h1>
                            <h1
                                className={`hovermenuNav hover:text-yellow-500 ${showComment ? "text-yellow-500" : "text-gray-800"
                                    } hover:bg-blue-700}`}
                            >
                                <button onClick={showOnlyComment}>Đánh giá (<span>{avgComments} <FontAwesomeIcon className="text-yellow-500" icon={faStarSolid} /></span>)</button>
                            </h1>
                        </div>
                        {showDescription && (
                            <p className="mb-8 text-sm lg:text-lg opacity-85  lg:mx-20 lg:mt-8" dangerouslySetInnerHTML={{ __html: product ? product.content : 'Loading content...' }}>
                            </p>
                        )}

                        {showComment && (
                            <div className="mb-10 border-2 lg:mt-8">
                                <div className="flex flex-col items-center justify-center p-5 ">
                                    <div>ĐÁNH GIÁ SẢN PHẨM</div>
                                    <span>
                                        {avgComments}<FontAwesomeIcon className="text-yellow-500" icon={faStarSolid} />
                                    </span>
                                    <span className="ml-2 mr-2 flex text-[14px]">

                                        <span className="text-xs"> {StartComments} đánh giá</span>
                                    </span>
                                </div>
                                <div className="ml-2 lg:mx-20 h-[450px] overflow-y-scroll scrollable-content">
                                    {comments.length > 0 ? (
                                        comments.map((comment) => (
                                            <div className="mb-3" key={comment.id}>
                                                <div className="flex items-center">
                                                    <div className="mr-2">
                                                        <User
                                                            size={25}
                                                            strokeWidth={1.5}
                                                            className="rounded-full bg-slate-300 p-1"
                                                        />
                                                    </div>
                                                    <div>
                                                        <div>{comment.user.name}</div>
                                                        <span className="flex text-[10px]">
                                                            {Array.from({ length: 5 }, (_, index) => (
                                                                <FontAwesomeIcon className="text-yellow-500"
                                                                    key={index}
                                                                    icon={index < comment.rating ? faStarSolid : faStarRegular}
                                                                />
                                                            ))}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="ml-8 mb-1">{comment.comment}</div>
                                                <div className="ml-8 text-sm opacity-70 mt-1">
                                                    Ngày đăng: {new Date(comment.created_at).toLocaleDateString()}
                                                </div>

                                                {comment.replies.map((reply) => (
                                                    <div>
                                                        <div className="flex items-center mt-5 ml-5">
                                                            <div className="mr-2">
                                                                <User
                                                                    size={25}
                                                                    strokeWidth={1.5}
                                                                    className="rounded-full bg-slate-300 p-1"
                                                                />
                                                            </div>
                                                            <div>
                                                                <div>{reply.user.name}</div>

                                                            </div>
                                                        </div>

                                                        <div className="ml-14 mb-1">{reply.comment}</div>

                                                        <div className="ml-14 text-sm opacity-70 mt-1">
                                                            Ngày đăng: {new Date(reply.created_at).toLocaleDateString()}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                        ))
                                    ) : (
                                        <div className="flex items-center justify-center text-gray-800">
                                            Không có đánh giá nào.
                                        </div>
                                    )}


                                    <hr className="mr-2 mt-3" />

                                </div>

                            </div>
                        )}
                    </div >
                    <hr className="mb-8" />

                    <h1 className="mb-5 text-center text-lg">CÓ THỂ BẠN SẼ THÍCH</h1>
                    <div className=" overflow-hidden">
                        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 ">
                            {ProductBycategorys.map((ProductBycategory) => (
                                <div className="relative mt-9 ml-3.5 md:ml-4 lg:ml-3 " key={ProductBycategory.id}>
                                    <div className="product-carousel grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-7">
                                        <div className="group relative mb-4 h-[80vw] w-[45vw] ml-1 right-0 transition-all duration-500 ease-in-out md:h-[60vw] md:w-[30vw] lg:h-[30vw] lg:w-[17vw] xl:w-[18vw]">
                                            <div className="mb-3 h-[80%] w-full overflow-hidden bg-slate-200 transition-transform duration-500 ease-in-out">
                                                <img
                                                    src={ProductBycategory.imageUrl || 'default-image-url.jpg'}
                                                    alt={ProductBycategory.name}
                                                    className="h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                                                />
                                                {ProductBycategory.discount_id !== null && (
                                                    <div className='absolute top-0 right-0 my-3 mx-3 py-1 px-2 rounded-md bg-red-500 text-white sale-badge'>
                                                        {ProductBycategory.discount.discount_percent}%
                                                    </div>
                                                )}
                                            </div>
                                            <div className="relative">
                                                <div className="absolute bottom-[30px] left-0 right-0 z-10 flex translate-y-10 transform justify-center space-x-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                                    <a href={`/productdetail/${ProductBycategory.id}/subcate/${ProductBycategory.sub_category_id}`} className="rounded-full bg-white p-2 hover:bg-black hover:text-white">
                                                        <Eye
                                                            color="currentColor"
                                                            strokeWidth="1.5"
                                                            className="w-4 h-4 sm:w-8 sm:h-8 md:w-7 md:h-7 lg:w-7 lg:h-7 xl:w-6 xl:h-6"
                                                        />
                                                    </a>
                                                    <div className="rounded-full bg-white p-2 hover:bg-black hover:text-white">
                                                        <ShoppingCart
                                                            color="currentColor"
                                                            strokeWidth="1.5"
                                                            className="w-4 h-4 sm:w-8 sm:h-8 md:w-7 md:h-7 lg:w-7 lg:h-7 xl:w-6 xl:h-6"
                                                            onClick={() => openModal(product.id, product.sub_category_id)}
                                                        />
                                                    </div>
                                                    <div className="rounded-full bg-white p-2 hover:bg-black hover:text-white">
                                                        <Heart
                                                            color="currentColor"
                                                            strokeWidth="1.5"
                                                            className="w-4 h-4 sm:w-8 sm:h-8 md:w-7 md:h-7 lg:w-7 lg:h-7 xl:w-6 xl:h-6"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <a href={`/productdetail/${ProductBycategory.id}/subcate/${ProductBycategory.sub_category_id}`} className="block overflow-hidden">
                                                <div className="truncate text-center text-sm md:text-base lg:text-base xl:text-base hover:text-yellow-500">
                                                    {ProductBycategory.name}
                                                </div>
                                                <div className="text-center block">
                                                    {ProductBycategory.price_sale !== null ? (
                                                        <>
                                                            <span className="mr-1 text-xs md:text-sm lg:text-base xl:text-base text-gray-500 line-through hover:text-yellow-500">
                                                                {formatPrice(ProductBycategory.price)}
                                                            </span>
                                                            <span className="text-sm md:text-base lg:text-lg xl:text-xl hover:text-yellow-500">
                                                                {formatPrice(ProductBycategory.price_sale)}
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <span className="text-sm md:text-base lg:text-lg xl:text-xl hover:text-yellow-500">
                                                            {formatPrice(ProductBycategory.price)}
                                                        </span>
                                                    )}
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <ModalAddToCart
                        isOpenModalAddToCart={isOpenModalAddToCart}
                        closeModal={closeModal}
                        productId={selectedProductId}

                    />
                </div >

            )}
        </>
    );
};

export default ProductDetail;