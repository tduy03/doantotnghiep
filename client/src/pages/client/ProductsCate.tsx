import { ChevronDown, ChevronLeft, ChevronRight, Eye, Filter, Heart, ShoppingCart, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useCategory } from '../../hook/useCategory';
import { useColor } from '../../hook/Color';
import { toast } from 'react-toastify';
import { useModalAddCartProvider } from '../../context/MoDalAddToCart';
import ModalAddToCart from '../../components/client/Home/ModalAddToCart/ModalAddToCart';
import { Link, useParams } from 'react-router-dom';
import { useFilterProducts } from '../../hook/UseFilterProduct';

const ProductsCate = () => {
    const [color_id, setColorID] = useState<string | null>(null);
    const [size_id, setSizeID] = useState<string | null>(null);
    const { color, size } = useColor();
    const { productBySubCateId, name } = useCategory();
    const [sortOrder, setSortOrder] = useState<string>("");
    const [isOpenPrice, setIsOpenPrice] = useState(false);
    const [isOpenArrange, setIsOpenArrange] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 3;
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const [isFilterMobile, setIsFilterMobile] = useState(false);
    const [selectedColor, setSelectedColor] = useState<{
        id: string;
        name: string;
    } | null>(null);
    const [selectedSize, setSellectedSize] = useState<{
        id: string;
        name: string;
    } | null>(null);
    const { id } = useParams()
    const { filterProductsSubate } = useFilterProducts(
        null,
        null,
        selectedColor?.id || "",
        selectedSize?.id || null,
        id || null,
        null
    );
    console.log('Danh sách sản phẩm từ API:', filterProductsSubate);
    const { isOpenModalAddToCart, setIsOpenModalAddToCart } = useModalAddCartProvider();
    const [selectedProductId, setSelectedProductId] = useState<{
        id: string;
        idSub: string;
    } | null>(null);
    const openModal = (id: string, idSub: string) => {
        setSelectedProductId({ id, idSub });
        setIsOpenModalAddToCart(true);
    };
    const closeModal = () => {
        setIsOpenModalAddToCart(false);
    };

    const handleFilterMobile = () => {
        setIsFilterMobile(true);
    }
    const closeFilterMobile = () => {
        setIsFilterMobile(false);
    }
    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const [selectedPriceRange, setSelectedPriceRange] = useState({
        range1: false, // 150 - 350
        range2: false, // 350 - 550
        range3: false, // 550 trở lên
    });
    // Hàm lọc sản phẩm theo giá, size và màu
    const filterByPriceSizeAndColor = (products) => {
        if (
            !selectedPriceRange.range1 &&
            !selectedPriceRange.range2 &&
            !selectedPriceRange.range3

        ) {
            return products; // Nếu không có checkbox nào được chọn, trả về tất cả sản phẩm.
        }

        return products.filter((product) => {
            // Kiểm tra nếu giá sale tồn tại, nếu không dùng giá gốc
            const price = product.price_sale ? parseInt(product.price_sale, 10) : parseInt(product.price, 10);

            // Đảm bảo rằng giá là một số hợp lệ
            if (isNaN(price)) return false;

            // Kiểm tra các khoảng giá
            const isInPriceRange =
                (selectedPriceRange.range1 && price >= 150000 && price <= 350000) ||
                (selectedPriceRange.range2 && price >= 350000 && price <= 550000) ||
                (selectedPriceRange.range3 && price >= 550000);


            // Trả về true nếu cả ba điều kiện (giá, size và màu) đều đúng
            return isInPriceRange;
        });
    };
    const sortProducts = (products) => {
        if (sortOrder === 'low-to-high') {
            return products.sort((a, b) => {
                const priceA = a.price_sale ? parseInt(a.price_sale, 10) : parseInt(a.price, 10);
                const priceB = b.price_sale ? parseInt(b.price_sale, 10) : parseInt(b.price, 10);
                return priceA - priceB;
            });
        } else if (sortOrder === 'high-to-low') {
            return products.sort((a, b) => {
                const priceA = a.price_sale ? parseInt(a.price_sale, 10) : parseInt(a.price, 10);
                const priceB = b.price_sale ? parseInt(b.price_sale, 10) : parseInt(b.price, 10);
                return priceB - priceA;
            });
        }
        return products; // Nếu không có sắp xếp, trả về sản phẩm gốc
    };
    // Hàm xử lý thay đổi checkbox price
    const handlePriceCheckboxChange = (event) => {
        setSelectedPriceRange({
            ...selectedPriceRange,
            [event.target.name]: event.target.checked,
        });
    };

    // Hàm xử lý thay đổi size checkbox
    const handleColor = (
        color_id: string,
        color_name: string,
        isChecked: boolean,
    ) => {
        if (isChecked) {
            setSelectedColor({ id: color_id, name: color_name });
        } else {
            setSelectedColor(null);
        }
    };

    const handleSize = (
        size_id: string,
        size_name: string,
        isChecked: boolean,
    ) => {
        if (isChecked) {
            setSellectedSize({ id: size_id, name: size_name });
        } else {
            setSellectedSize(null);
        }
    };

    // Lọc sản phẩm theo các tiêu chí đã chọn
    const filteredProducts = sortProducts(filterByPriceSizeAndColor(filterProductsSubate));

    useEffect(() => {
        // Kiểm tra xem có sản phẩm nào được lọc và có điều kiện lọc được áp dụng không
        const hasFiltersApplied =
            selectedPriceRange.range1 ||
            selectedPriceRange.range2 ||
            selectedPriceRange.range3;


        // Hiển thị thông báo chỉ khi có sản phẩm bị lọc và điều kiện lọc được áp dụng
        if (filteredProducts.length === 0 && hasFiltersApplied) {
            toast.info('Không có sản phẩm phù hợp với tiêu chí lọc!');
        }
    }, [filteredProducts, selectedPriceRange]);



    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);



    // const handleClearFilter = () => {
    //     setPriceRange(null);
    //     fetchProducts();
    // };
    // const handleClearFilterCate = () => {
    //     setCate(null);
    // }
    const handleClearFilterColor = () => {
        setSelectedColor(null);
    };
    const handleClearFilterSize = () => {
        setSellectedSize(null);
    };
    // const handleClearFilterSubcate = () => {
    //     setSubcateID(null);
    // }
    // Hàm lấy sản phẩm sau khi lọc và sắp xếp




    const toggleCollapsePrice = () => {
        setIsOpenPrice(!isOpenPrice);
    };
    const toggleCollapseArrange = () => {
        setIsOpenArrange(!isOpenArrange);
    };
    return (
        <>
            <div className="mt-2 bg-gray-50 px-5 pt-1 lg:mx-[100px] xl:mx-[150px] xl:mt-3 xl:py-5">
                {/* Header */}

                <div>
                    <h1 className="text-xl font-bold text-gray-600 xl:text-2xl">{name}</h1>
                </div>

            </div>
            <div className='lg:mx-[100px] xl:mx-[200px] '>
                <div className='flex'>
                    {/* BỘ LỌC */}
                    <div className='xl:mr-10  hidden  lg:block xl:block '>
                        <div className=' h-[700px]  overflow-y-scroll  scrollable-content'>
                            <div className='text-2xl mt-5'>Bộ lọc</div>
                            <div className="w-64">
                                {/* Header Collapse */}

                                {/* Nội dung Collapse */}
                                <hr className=' bg-black' />
                                <hr />
                                <div>
                                    <div
                                        className=" text-black p-4 cursor-pointer flex items-center"
                                        onClick={toggleCollapsePrice}
                                    >
                                        <h2 className="text-base mr-2 ">Khoảng giá</h2> <ChevronDown size={17} strokeWidth={1.5} />
                                    </div>

                                    {/* Nội dung Collapse */}
                                    <div
                                        className={`transition-max-height duration-500 ease-in-out overflow-hidden ${isOpenPrice ? 'max-h-40' : 'max-h-0'
                                            }`}
                                    >
                                        <div className="p-4 ">
                                            <form>
                                                <label className="block mb-2">
                                                    <input
                                                        type="checkbox"
                                                        name="range1"
                                                        checked={selectedPriceRange.range1}
                                                        onChange={handlePriceCheckboxChange}
                                                        className="mr-2"
                                                    />
                                                    Từ 150.000 - 350.000
                                                </label>
                                                <label className="block mb-2">
                                                    <input
                                                        type="checkbox"
                                                        name="range2"
                                                        checked={selectedPriceRange.range2}
                                                        onChange={handlePriceCheckboxChange}
                                                        className="mr-2"
                                                    />
                                                    Từ 350.000 - 550.000
                                                </label>
                                                <label className="block mb-2">
                                                    <input
                                                        type="checkbox"
                                                        name="range3"
                                                        checked={selectedPriceRange.range3}
                                                        onChange={handlePriceCheckboxChange}
                                                        className="mr-2"
                                                    />
                                                    Trên 550.000
                                                </label>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className="mb-2 mt-3 text-sm">
                                    <span>Màu Sắc: </span>
                                    <div className="mt-2 flex space-x-2">
                                        {color.map((item, index) => (
                                            <div key={index} className="inline-flex items-center">
                                                <label className="relative flex cursor-pointer items-center">
                                                    <input
                                                        type="checkbox"
                                                        className="peer h-7 w-7 cursor-pointer appearance-none rounded-full border border-slate-300 shadow transition-all hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                                                        onChange={(e) =>
                                                            handleColor(item.id, item.name, e.target.checked)
                                                        }
                                                        checked={selectedColor?.id === item.id}
                                                        style={{
                                                            backgroundColor: item.color_code,
                                                        }}
                                                    />
                                                </label>

                                            </div>
                                        )
                                        )}
                                    </div>
                                </div>
                                <div className='mt-4 '>
                                    <h2 className='mb-2'>Kích Thước</h2>
                                    <div className="inline-flex items-center ">
                                        {size.map((item, index) => (
                                            <div key={index} className="flex space-x-2 mr-2">
                                                <label className="relative flex cursor-pointer items-center">
                                                    <input
                                                        type="checkbox"
                                                        className="peer h-9 w-9 cursor-pointer appearance-none border border-slate-300 shadow transition-all checked:bg-yellow-300 hover:shadow-md"
                                                        onChange={(e) =>
                                                            handleSize(item.id, item.name, e.target.checked)
                                                        } // Gọi handleSize khi thay đổi
                                                        checked={selectedSize?.id === item.id} // Kiểm tra nếu size_id trùng với item.id thì checkbox được chọn
                                                    />
                                                    <span className="uppercase pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-sm text-gray-500 opacity-100 transition-colors peer-checked:text-black peer-checked:opacity-100">
                                                        {item.name}
                                                    </span>
                                                </label>
                                            </div>
                                        ))}


                                    </div>
                                </div>
                                {/* // */}
                            </div>

                        </div>

                    </div>


                    <div className=' col-span-3 flex flex-col '>
                        <div className='sticky top-0 z-40 bg-white'>
                            <div className='flex justify-between mx-2'>
                                <div className="text-[12px] xl:text-[14px]">
                                    <div className="mx-2 mb-3 inline-block text-[13px] xl:ml-4 xl:text-base">
                                        Đang dùng bộ lọc:
                                    </div>

                                    {selectedColor && (
                                        <div className="ml-2 inline-flex items-center justify-center rounded-lg bg-slate-100">
                                            {selectedColor.name}
                                            <X
                                                className="ml-1"
                                                size={17}
                                                strokeWidth={1}
                                                onClick={handleClearFilterColor}
                                            />
                                        </div>
                                    )}
                                    {selectedSize && (
                                        <div className="ml-2 inline-flex items-center justify-center rounded-lg bg-slate-100">
                                            {selectedSize.name}
                                            <X
                                                className="ml-1"
                                                size={17}
                                                strokeWidth={1}
                                                onClick={handleClearFilterSize}
                                            />
                                        </div>
                                    )}

                                </div>

                                <div className=""> {/* Đẩy phần tử này sang phải */}
                                    <div className="xl:block flex w-40 xl:w-full gap-2">
                                        <div
                                            onClick={handleFilterMobile}
                                            className="hover:bg-slate-100 xl:hidden flex w-full cursor-pointer items-center  text-black border border-slate-300 rounded-lg p-1 xl:p-2">
                                            <p className="text-[13px] xl:text-base">Bộ lọc</p>
                                            <Filter size={17} strokeWidth={1.5} />
                                        </div>
                                        <div
                                            className="flex  hover:bg-slate-100 w-full cursor-pointer items-center  text-black border border-slate-300 rounded-lg p-1 xl:p-2   "
                                            onClick={toggleCollapseArrange}
                                        >
                                            <h2 className="text-[13px] xl:text-base  ">Sắp xếp </h2>{" "}
                                            <ChevronDown size={17} strokeWidth={1.5} />
                                        </div>
                                    </div>

                                    {/* Nội dung Collapse */}
                                    <div
                                        className={`transition-max-height absolute right-1 mt-2 overflow-hidden duration-500 ease-in-out ${isOpenArrange ? "max-h-40" : "max-h-0"
                                            }`}
                                    >
                                        <div className="rounded border-2 bg-white p-2">
                                            <label className="mb-2 block">
                                                <button
                                                    className={` p-1 text-[12px] xl:text-base ${sortOrder === "low-to-high" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                                                    onClick={() => setSortOrder("low-to-high")}
                                                >
                                                    Từ thấp đến cao
                                                </button>
                                            </label>
                                            <label className="mb-2 block">
                                                <button
                                                    className={` p-1 text-[12px] xl:text-base ${sortOrder === "high-to-low" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                                                    onClick={() => setSortOrder("high-to-low")}
                                                >
                                                    Từ cao đến thấp
                                                </button>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>



                        {/* BOX PRODUCTS*/}
                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 mx-2">
                            {currentProducts.length > 0 ? (
                                currentProducts.map((item) => (
                                    <div key={item.id} className="relative mt-4 md:ml-4 lg:ml-3">
                                        <div className="product-carousel grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-7">
                                            <div className="group relative mb-4 h-[70vw] w-[45vw] ml-1 right-0 transition-all duration-500 ease-in-out md:h-[60vw] md:w-[30vw] lg:h-[28vw] lg:w-[17vw] xl:w-[16vw] xl:h-[25vw">
                                                <div className="mb-3 h-[80%] w-full overflow-hidden bg-slate-200 transition-transform duration-500 ease-in-out">
                                                    <img
                                                        src={`http://127.0.0.1:8000/storage/${item.image}`}
                                                        alt={item.name}
                                                        className="h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                                                    />
                                                </div>
                                                <div className="relative">
                                                    <div className="absolute bottom-[25px] xl:bottom-[30px] left-0 right-0 z-10 flex translate-y-10 transform justify-center space-x-3 xl:space-x-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                                        <Link
                                                            to={`/productdetail/${item.id}/subcate/${item.sub_category_id}`}
                                                            className="translate-y-[30px] transform rounded-full bg-white p-[6px] opacity-0 transition-all duration-[50] ease-out hover:bg-black hover:text-white group-hover:translate-y-0 group-hover:opacity-100 lg:p-[5px] xl:lg:p-2"
                                                        >
                                                            <Eye
                                                                color="currentColor"
                                                                strokeWidth="1.5"
                                                                className="w-[14px] h-[14px] sm:w-6 sm:h-6 md:w-5 md:h-5 lg:w-4 lg:h-4 xl:w-5 xl:h-5"
                                                            />
                                                        </Link>
                                                        <div className="transform translate-y-[35px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out rounded-full bg-white p-[6px] lg:p-[5px] xl:lg:p-2 hover:bg-black hover:text-white">
                                                            <ShoppingCart
                                                                color="currentColor"
                                                                strokeWidth="1.5"
                                                                className="w-[14px] h-[14px] sm:w-6 sm:h-6 md:w-5 md:h-5 lg:w-4 lg:h-4  xl:w-5 xl:h-5"
                                                                onClick={() =>
                                                                    openModal(item.id, item.sub_category_id)
                                                                }
                                                            />
                                                        </div>
                                                        <div className="transform translate-y-[35px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out rounded-full bg-white p-[6px] lg:p-[5px] xl:lg:p-2 hover:bg-black hover:text-white">
                                                            <Heart
                                                                color="currentColor"
                                                                strokeWidth="1.5"
                                                                className="w-[14px] h-[14px] sm:w-6 sm:h-6 md:w-5 md:h-5 lg:w-4 lg:h-4  xl:w-5 xl:h-5"

                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <a className="block overflow-hidden">
                                                    <div className="truncate text-center text-sm md:text-base lg:text-base xl:text-base hover:text-yellow-500">
                                                        {item.name}
                                                    </div>
                                                    <div className="text-center block">
                                                        {item.price_sale !== null ? (
                                                            <>
                                                                <span className="mr-1 text-xs md:text-sm lg:text-base xl:text-base text-gray-500 line-through hover:text-yellow-500">
                                                                    {formatPrice(item.price)}
                                                                </span>
                                                                <span className="text-sm md:text-base lg:text-lg xl:text-xl hover:text-yellow-500">
                                                                    {formatPrice(item.price_sale)}
                                                                </span>
                                                            </>
                                                        ) : (
                                                            <span className="text-sm md:text-base lg:text-lg xl:text-xl hover:text-yellow-500">
                                                                {formatPrice(item.price)}
                                                            </span>
                                                        )}
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="flex justify-center text-gray-500 mt-4">
                                    <p> Không có sản phẩm nào</p>


                                </div>
                            )}

                        </div>
                        <div className="flex justify-center mt-4">
                            {/* Nút Previous */}
                            <button
                                className="mx-1   text-gray-700 rounded-md hover:bg-yellow-300"
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                            >
                                <ChevronLeft strokeWidth={0.5} />
                            </button>
                            {/* Số trang */}

                            <span className="p-2 opacity-60">{` ${currentPage} / ${totalPages}`}</span>
                            {/* Nút Next */}
                            <button
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="mx-1 text-gray-700 rounded-md hover:bg-yellow-300"
                            >
                                <ChevronRight strokeWidth={0.5} />
                            </button>
                        </div>


                    </div>

                </div>

            </div >
            <div>
                {/* Modal filter mobile */}
                {isFilterMobile && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3">
                            {/* Nội dung modal */}

                            <div
                                className="scrollable-content h-[500px] overflow-y-scroll md:h-[500px] "
                            >
                                <div className="mt-5 text-2xl sm:text-lg">Bộ lọc</div>
                                <div className="xl:w-64 lg:w-48 md:w-full sm:w-full">
                                    {/* Header Collapse */}
                                    <div>
                                        <div
                                            className=" text-black p-4 cursor-pointer flex items-center"
                                            onClick={toggleCollapsePrice}
                                        >
                                            <h2 className="text-base mr-2 ">Khoảng giá</h2> <ChevronDown size={17} strokeWidth={1.5} />
                                        </div>

                                        {/* Nội dung Collapse */}
                                        <div
                                            className={`transition-max-height duration-500 ease-in-out overflow-hidden ${isOpenPrice ? 'max-h-40' : 'max-h-0'
                                                }`}
                                        >
                                            <div className="p-4 ">
                                                <form>
                                                    <label className="block mb-2">
                                                        <input
                                                            type="checkbox"
                                                            name="range1"
                                                            checked={selectedPriceRange.range1}
                                                            onChange={handlePriceCheckboxChange}
                                                            className="mr-2"
                                                        />
                                                        Từ 150.000 - 350.000
                                                    </label>
                                                    <label className="block mb-2">
                                                        <input
                                                            type="checkbox"
                                                            name="range2"
                                                            checked={selectedPriceRange.range2}
                                                            onChange={handlePriceCheckboxChange}
                                                            className="mr-2"
                                                        />
                                                        Từ 350.000 - 550.000
                                                    </label>
                                                    <label className="block mb-2">
                                                        <input
                                                            type="checkbox"
                                                            name="range3"
                                                            checked={selectedPriceRange.range3}
                                                            onChange={handlePriceCheckboxChange}
                                                            className="mr-2"
                                                        />
                                                        Trên 550.000
                                                    </label>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />

                                    <div className="mb-2 mt-3 text-sm">
                                        <span>Màu Sắc: </span>
                                        <div className="mt-2 flex space-x-2">
                                            {color.map((item, index) => (
                                                <div key={index} className="inline-flex items-center">
                                                    <label className="relative flex cursor-pointer items-center">
                                                        <input

                                                            className=" focus:outline-none focus:ring-2  focus:ring-offset-2 peer h-7 w-7 cursor-pointer appearance-none border border-slate-300 shadow transition-all hover:shadow-md rounded-full"
                                                            type="checkbox"
                                                            onChange={(e) =>
                                                                handleColor(item.id, item.name, e.target.checked)
                                                            }
                                                            checked={selectedColor?.id === item.id}
                                                            style={{
                                                                backgroundColor: item.color_code,
                                                            }}

                                                        />
                                                    </label>

                                                </div>
                                            )
                                            )}
                                        </div>
                                    </div>
                                    <div className='mt-4 '>
                                        <h2 className='mb-2'>Kích Thước</h2>
                                        <div className="inline-flex items-center ">
                                            {size.map((item, index) => (
                                                <div key={index} className="flex space-x-2 mr-2">
                                                    <label className="relative flex cursor-pointer items-center">
                                                        <input
                                                            type="checkbox"
                                                            className="peer h-9 w-9 cursor-pointer appearance-none border border-slate-300 shadow transition-all checked:bg-yellow-300 hover:shadow-md"
                                                            onChange={(e) =>
                                                                handleSize(item.id, item.name, e.target.checked)
                                                            } // Gọi handleSize khi thay đổi
                                                            checked={selectedSize?.id === item.id}
                                                        />
                                                        <span className="uppercase pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-sm text-gray-500 opacity-100 transition-colors peer-checked:text-black peer-checked:opacity-100">
                                                            {item.name}
                                                        </span>
                                                    </label>
                                                </div>
                                            ))}


                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Nút đóng modal */}
                            <div className="flex justify-center">
                                <button
                                    onClick={closeFilterMobile}
                                    className="bg-red-500  text-white px-4 py-2 rounded"
                                >
                                    OK
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                <ModalAddToCart
                    isOpenModalAddToCart={isOpenModalAddToCart}
                    closeModal={closeModal}
                    productId={selectedProductId}
                />
            </div>
        </>
    )
}

export default ProductsCate