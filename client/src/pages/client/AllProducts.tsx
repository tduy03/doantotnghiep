import {
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Eye,
    Filter,
    Heart,
    ShoppingCart,
    X,
} from "lucide-react";
import { useEffect, useState } from "react";
import "../../css/AllProduct.css";
import { useFilterProducts } from "../../hook/UseFilterProduct";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { useColor } from "../../hook/Color";
import { useCategory } from "../../hook/useCategory";
import { useModalAddCartProvider } from "../../context/MoDalAddToCart";
import ModalAddToCart from "../../components/client/Home/ModalAddToCart/ModalAddToCart";
import { useLoading } from "../../context/Loading";
import { Product } from "../../interfaces/Product";
import { toast } from "react-toastify";

interface PriceRange {
    min: number;
    max: number;
}
const AllProducts = () => {
    // các sản phẩm mới nhất


    const { setLoading } = useLoading();
    const [priceRange, setPriceRange] = useState<PriceRange | null>(null);
    const [category, setCate] = useState<{
        id: string;
        name: string;
    } | null>(null);
    const [selectedColor, setSelectedColor] = useState<{
        id: string;
        name: string;
    } | null>(null);
    const [selectedSize, setSellectedSize] = useState<{
        id: string;
        name: string;
    } | null>(null);
    const [selectedSubcate, setSelectedSubcate] = useState<{
        id: string;
        name: string;
    } | null>(null);
    const { color, size } = useColor();
    const { subcates, categories } = useCategory();
    const [sortOrder, setSortOrder] = useState<string>("");
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<Product[]>([]);
    const location = useLocation();
    const [isFilterMobile, setIsFilterMobile] = useState(false);

    const { isOpenModalAddToCart, setIsOpenModalAddToCart } =
        useModalAddCartProvider();
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
    };
    const closeFilterMobile = () => {
        setIsFilterMobile(false);
    };
    const formatPrice = (price) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
            minimumFractionDigits: 0,
        }).format(price);
    };
    const { filterProductsPrice, } = useFilterProducts(
        priceRange?.min || null,
        priceRange?.max || null,
        selectedColor?.id,
        selectedSize?.id,
        selectedSubcate?.id,
        category?.id,
    );

    // Hàm xử lý khi người dùng chọn khoảng giá
    const handlePriceChange = (min: number, max: number, isChecked: boolean) => {
        if (isChecked) {
            // Cập nhật khoảng giá đã chọn
            setPriceRange({ min, max });
        } else {
            setPriceRange(null);
        }
    };


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
    const handleCate = (
        category_id: string,
        category_name: string,
        isChecked: boolean
    ) => {
        if (isChecked) {
            setCate({ id: category_id, name: category_name }); // Cập nhật cate khi checkbox được chọn
        } else {
            setCate(null); // Nếu checkbox bị bỏ chọn, set cate thành null
        }
    };
    const handleSubCate = (
        subcate_id: string,
        subcate_name: string,
        isChecked: boolean,
    ) => {
        if (isChecked) {
            setSelectedSubcate({ id: subcate_id, name: subcate_name });
        } else {
            setSelectedSubcate(null);
        }
    };


    const handleClearFilter = () => {
        setPriceRange(null);
        fetchProducts();
    };
    const handleClearFilterCate = () => {
        setCate(null);
    };
    const handleClearFilterColor = () => {
        setSelectedColor(null);
    };
    const handleClearFilterSize = () => {
        setSellectedSize(null);
    };
    const handleClearFilterSubcate = () => {
        setSelectedSubcate(null);
    };
    // Hàm lấy sản phẩm sau khi lọc và sắp xếp
    // const getFilteredAndSortedProducts = () => {
    //     const products = [...filterProductsPrice]
    //     if (sortOrder === "lowToHigh") {
    //         products.sort((a, b) => a.price - b.price);
    //     } else if (sortOrder === "highToLow") {
    //         products.sort((a, b) => b.price - a.price);
    //     }
    //     return products;
    // };
    const [isOpenSex, setIsOpenSex] = useState(false);
    const [isOpenShirt, setIsOpenShirt] = useState(false);
    const [isOpenTrousers, setIsOpenTrousers] = useState(false);
    const [isOpenPrice, setIsOpenPrice] = useState(false);
    const [isOpenArrange, setIsOpenArrange] = useState(false);
    const [productNew, setProductNew] = useState<Product[]>([]);

    const toggleCollapseSex = () => {
        setIsOpenSex(!isOpenSex);
    };
    const toggleCollapseShirt = () => {
        setIsOpenShirt(!isOpenShirt);
    };
    const toggleCollapseTrousers = () => {
        setIsOpenTrousers(!isOpenTrousers);
    };
    const toggleCollapsePrice = () => {
        setIsOpenPrice(!isOpenPrice);
    };
    const toggleCollapseArrange = () => {
        setIsOpenArrange(!isOpenArrange);
    };

    // search
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const q = params.get("q");
        setSearchQuery(q);
        if (q) {
            handleSearch(q);
        }
    }, [location.search]);

    const handleSearch = async (searchTerm: string) => {
        try {
            setLoading(true);
            const search = await axios.post(
                `http://127.0.0.1:8000/api/search?q=${searchTerm}`,
            );
            setSearchResults(search.data);
            if (!search.ok) {
                throw new Error("Không thể tải dữ liệu sản phẩm");
            }
        } catch (error) {
            // console.log(error);
        } finally {
            setLoading(false);
        }
    };


    const fetchProducts = async () => {
        try {
            const responst = await axios.get(
                "http://127.0.0.1:8000/api/products?page=${currentPage}",
            );

            if (Array.isArray(responst.data.products)) {
                setProductNew(responst.data.products);
            } else {
                console.error("Dữ liệu trả về không phải là mảng");
                setProductNew([]); // Nếu không phải mảng, đặt productNew là mảng rỗng
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };
    useEffect(() => {
        fetchProducts();
    }, []);
    useEffect(() => {
        // Kiểm tra khi danh sách sản phẩm được cập nhật
        if (filterProductsPrice.length > 0) {
            toast.success(`Tìm thấy ${filterProductsPrice.length} sản phẩm!`);
        }
    }, [filterProductsPrice]); // Chỉ chạy khi `filterProductsPrice` thay đổi
    const getSortedProducts = (products) => {
        if (sortOrder === "lowToHigh") {
            return products.sort((a, b) => a.price - b.price); // Sắp xếp từ thấp đến cao
        } else if (sortOrder === "highToLow") {
            return products.sort((a, b) => b.price - a.price); // Sắp xếp từ cao đến thấp
        }
        return products; // Nếu không có sắp xếp, trả về mảng ban đầu
    };
    const ITEMS_PER_PAGE = 6; // Số sản phẩm trên mỗi trang
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại

    // Kết hợp các sản phẩm từ các mảng
    let products: Product[] = [];
    if (filterProductsPrice.length > 0) {
        products = filterProductsPrice;
    } else if (searchResults.length > 0) {
        products = searchResults;
    } else if (productNew.length > 0) {
        products = productNew;
    }

    // Sắp xếp các sản phẩm
    const sortedProducts = getSortedProducts(products, sortOrder);

    // Tính toán số trang
    const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);

    // Lấy các sản phẩm cần hiển thị cho trang hiện tại
    const indexOfLastProduct = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstProduct = indexOfLastProduct - ITEMS_PER_PAGE;
    const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    // Chuyển đến trang kế tiếp hoặc quay lại trang trước đó
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            <div className="mt-2 bg-gray-50 px-5 pt-1 lg:mx-[100px] xl:mx-[150px] xl:mt-3 xl:py-5">
                {/* Header */}

                <div>
                    <h1 className="text-xl font-bold text-gray-600 xl:text-2xl">Sản phẩm.</h1>
                </div>

            </div>
            <div className="lg:mx-[100px] xl:mx-[150px]">
                <div className="flex">
                    {/* BỘ LỌC */}
                    <div className="hidden lg:block xl:mr-20 xl:block">
                        <div className="scrollable-content h-[700px] overflow-y-scroll">
                            <div className="mt-5 text-2xl">Bộ lọc</div>
                            <div className="w-64">
                                {/* Header Collapse */}
                                <div
                                    className="flex cursor-pointer items-center p-4"
                                    onClick={toggleCollapseSex}
                                >
                                    <h2 className="mr-2 text-base">Thể Loại</h2>
                                    <ChevronDown size={17} strokeWidth={1.5} />
                                </div>

                                {/* Nội dung Collapse */}
                                <div
                                    className={`transition-max-height overflow-hidden duration-500 ease-in-out ${isOpenSex ? "max-h-40" : "max-h-0"
                                        }`}
                                >
                                    <div className="p-4">
                                        {categories.map((item, index) => (
                                            <label key={index} className="mb-2 block">
                                                <input
                                                    type="checkbox"
                                                    className="mr-2"
                                                    onChange={(e) =>
                                                        handleCate(item.id,
                                                            item.name,
                                                            e.target.checked,)
                                                    }
                                                    checked={category?.id === item.id}
                                                    name="cate"
                                                />
                                                {item.name}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <hr />
                                <div >
                                    <div
                                        className="flex cursor-pointer items-center p-4"
                                        onClick={toggleCollapseShirt}
                                    >
                                        <h2 className="mr-2 text-base">Áo, Quần</h2>
                                        <ChevronDown size={17} strokeWidth={1.5} />
                                    </div>

                                    {/* Nội dung Collapse */}
                                    <div
                                        className={`transition-max-height  overflow-hidden duration-500 ease-in-out ${isOpenShirt ? "max-h-auto" : "max-h-0"
                                            }`}
                                    >
                                        <div className="p-4  ">
                                            {subcates.map((item, index) => (
                                                <label key={index} className="mb-2 block">
                                                    <input
                                                        type="checkbox"
                                                        value={item.name}
                                                        className="mr-2"
                                                        onChange={(e) =>
                                                            handleSubCate(
                                                                item.id,
                                                                item.name,
                                                                e.target.checked,
                                                            )
                                                        }
                                                        checked={selectedSubcate?.id === item.id}
                                                    />
                                                    {item.name}
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <hr className="bg-black" />

                                <div>
                                    <div
                                        className="flex cursor-pointer items-center p-4 text-black"
                                        onClick={toggleCollapsePrice}
                                    >
                                        <h2 className="mr-2 text-base">Khoảng giá</h2>{" "}
                                        <ChevronDown size={17} strokeWidth={1.5} />
                                    </div>

                                    {/* Nội dung Collapse */}
                                    <div
                                        className={`transition-max-height overflow-hidden duration-500 ease-in-out ${isOpenPrice ? "max-h-40" : "max-h-0"
                                            }`}
                                    >
                                        <div className="p-4">
                                            <form>
                                                <label className="mb-2 block">
                                                    <input
                                                        type="checkbox"
                                                        name="price-range"
                                                        className="mr-2"
                                                        onChange={(e) =>
                                                            handlePriceChange(
                                                                150000,
                                                                350000,
                                                                e.target.checked,
                                                            )
                                                        }
                                                        checked={
                                                            priceRange?.min === 150000 &&
                                                            priceRange?.max === 350000
                                                        }
                                                    />
                                                    Từ 150.000 - 350.000
                                                </label>
                                                <label className="mb-2 block">
                                                    <input
                                                        type="checkbox"
                                                        name="price-range"
                                                        className="mr-2"
                                                        onChange={(e) =>
                                                            handlePriceChange(
                                                                350000,
                                                                550000,
                                                                e.target.checked,
                                                            )
                                                        }
                                                        checked={
                                                            priceRange?.min === 350000 &&
                                                            priceRange?.max === 550000
                                                        }
                                                    />
                                                    Từ 350.000 - 550.000
                                                </label>
                                                <label className="mb-2 block">
                                                    <input
                                                        type="checkbox"
                                                        name="price-range"
                                                        className="mr-2"
                                                        onChange={(e) =>
                                                            handlePriceChange(
                                                                550000,
                                                                Number.MAX_SAFE_INTEGER,
                                                                e.target.checked,
                                                            )
                                                        }
                                                        checked={
                                                            priceRange?.min === 550000 &&
                                                            priceRange?.max === Number.MAX_SAFE_INTEGER
                                                        }
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
                                        ))}
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <h2 className="mb-2">Kích Thước</h2>
                                    <div className="inline-flex items-center">
                                        {size.map((item, index) => (
                                            <div key={index} className="mr-2 flex space-x-2">
                                                <label className="relative flex cursor-pointer items-center">
                                                    <input
                                                        type="checkbox"
                                                        className="peer h-9 w-9 cursor-pointer appearance-none border border-slate-300 shadow transition-all checked:bg-yellow-300 hover:shadow-md"
                                                        onChange={(e) =>
                                                            handleSize(item.id, item.name, e.target.checked)
                                                        } // Gọi handleSize khi thay đổi
                                                        checked={selectedSize?.id === item.id} // Kiểm tra nếu size_id trùng với item.id thì checkbox được chọn
                                                    />
                                                    <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-sm uppercase text-gray-500 opacity-100 transition-colors peer-checked:text-black peer-checked:opacity-100">
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

                    {/* BOX PRODUCTS*/}
                    <div className="mx-2">
                        <div className="sticky top-10 z-40 bg-white pt-2 xl:top-[68px]">
                            <div className="flex justify-between">
                                <div className="text-[12px] xl:text-[14px]">
                                    <div className="mx-2 mb-3 inline-block text-[13px] xl:ml-4 xl:text-base">
                                        Đang dùng bộ lọc:
                                    </div>
                                    {priceRange && (
                                        <div className="ml-2 inline-flex items-center justify-center rounded-lg bg-slate-100">
                                            {priceRange.min} - {priceRange.max}
                                            <X
                                                className="ml-1"
                                                size={17}
                                                strokeWidth={1}
                                                onClick={handleClearFilter}
                                            />
                                        </div>
                                    )}
                                    {category && (
                                        <div className="ml-2 inline-flex items-center justify-center rounded-lg bg-slate-100">
                                            {category.name}
                                            <X
                                                className="ml-1"
                                                size={17}
                                                strokeWidth={1}
                                                onClick={handleClearFilterCate}
                                            />
                                        </div>
                                    )}
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
                                    {selectedSubcate && (
                                        <div className="ml-2 inline-flex items-center justify-center rounded-lg bg-slate-100">
                                            {selectedSubcate.name}
                                            <X
                                                className="ml-1"
                                                size={17}
                                                strokeWidth={1}
                                                onClick={handleClearFilterSubcate}
                                            />
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <div className="flex w-40 gap-2 xl:block xl:w-full">
                                        <div
                                            onClick={handleFilterMobile}
                                            className="flex w-full cursor-pointer items-center rounded-lg border border-slate-300 p-1 text-black hover:bg-slate-100 xl:hidden xl:p-2"
                                        >
                                            <p className="text-[13px] xl:text-base">Bộ lọc</p>
                                            <Filter size={17} strokeWidth={1.5} />
                                        </div>
                                        <div
                                            className="flex w-full cursor-pointer items-center rounded-lg border border-slate-300 p-1 text-black hover:bg-slate-100 xl:p-2"
                                            onClick={toggleCollapseArrange}
                                        >
                                            <h2 className="text-[13px] xl:text-base">Sắp xếp </h2>{" "}
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
                                                    className={`p-1 text-[12px] xl:text-base ${sortOrder === "lowToHigh" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                                                    onClick={() => setSortOrder("lowToHigh")}
                                                >
                                                    Từ thấp đến cao
                                                </button>
                                            </label>
                                            <label className="mb-2 block">
                                                <button
                                                    className={`p-1 text-[12px] xl:text-base ${sortOrder === "highToLow" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                                                    onClick={() => setSortOrder("highToLow")}
                                                >
                                                    Từ cao đến thấp
                                                </button>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3">
                            {
                                // Kiểm tra từng mảng có dữ liệu và chỉ hiển thị mảng có dữ liệu
                                currentProducts.length > 0 ? (
                                    <>
                                        {getSortedProducts(currentProducts).map((item) => (
                                            <div
                                                key={item.id || item.name}
                                                className="relative ml-1 mt-4 md:ml-2 lg:ml-3 xl:ml-0"
                                            >
                                                <div className="product-carousel grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-7">
                                                    <div className="group relative right-0 mb-4 ml-1 h-[60vw] w-[45vw] transition-all duration-500 ease-in-out md:h-[42vw] md:w-[30vw] lg:h-[28vw] lg:w-[17vw] xl:w-[18vw]">
                                                        <div className="mb-3 h-[90%] w-full overflow-hidden bg-slate-200 transition-transform duration-500 ease-in-out">
                                                            <img
                                                                src={`http://127.0.0.1:8000/storage/${item.image}`}
                                                                alt={item.name || "Product Image"}
                                                                className="h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                                                            />
                                                        </div>
                                                        <div className="relative">
                                                            <div className="absolute bottom-[25px] left-0 right-0 z-10 flex translate-y-10 transform justify-center space-x-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 xl:bottom-[30px] xl:space-x-4">
                                                                <Link
                                                                    to={`/productdetail/${item.id}/subcate/${item.sub_category_id}`}
                                                                    className="translate-y-[30px] transform rounded-full bg-white p-[6px] opacity-0 transition-all duration-[50] ease-out hover:bg-black hover:text-white group-hover:translate-y-0 group-hover:opacity-100 lg:p-[5px] xl:lg:p-2"
                                                                >
                                                                    <Eye
                                                                        color="currentColor"
                                                                        strokeWidth="1.5"
                                                                        className="h-[14px] w-[14px] sm:h-6 sm:w-6 md:h-5 md:w-5 lg:h-4 lg:w-4 xl:h-5 xl:w-5"
                                                                    />
                                                                </Link>
                                                                <div className="translate-y-[35px] transform rounded-full bg-white p-[6px] opacity-0 transition-all duration-500 ease-out hover:bg-black hover:text-white group-hover:translate-y-0 group-hover:opacity-100 lg:p-[5px] xl:lg:p-2">
                                                                    <ShoppingCart
                                                                        color="currentColor"
                                                                        strokeWidth="1.5"
                                                                        className="h-[14px] w-[14px] sm:h-6 sm:w-6 md:h-5 md:w-5 lg:h-4 lg:w-4 xl:h-5 xl:w-5"
                                                                        onClick={() =>
                                                                            openModal(item.id, item.sub_category_id)
                                                                        }
                                                                    />
                                                                </div>
                                                                <div className="translate-y-[35px] transform rounded-full bg-white p-[6px] opacity-0 transition-all duration-500 ease-out hover:bg-black hover:text-white group-hover:translate-y-0 group-hover:opacity-100 lg:p-[5px] xl:lg:p-2">
                                                                    <Heart
                                                                        color="currentColor"
                                                                        strokeWidth="1.5"
                                                                        className="h-[14px] w-[14px] sm:h-6 sm:w-6 md:h-5 md:w-5 lg:h-4 lg:w-4 xl:h-5 xl:w-5"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <a className="block overflow-hidden">
                                                            <div className="truncate text-center text-sm hover:text-yellow-500 md:text-base lg:text-base xl:text-base">
                                                                {item.name}
                                                            </div>
                                                            <div className="block text-center">
                                                                {item.price_sale !== null ? (
                                                                    <>
                                                                        <span className="mr-1 text-xs text-gray-500 line-through hover:text-yellow-500 md:text-sm lg:text-base xl:text-base">
                                                                            {formatPrice(item.price)}
                                                                        </span>
                                                                        <span className="text-sm hover:text-yellow-500 md:text-base lg:text-lg xl:text-xl">
                                                                            {formatPrice(item.price_sale)}
                                                                        </span>
                                                                    </>
                                                                ) : (
                                                                    <span className="text-sm hover:text-yellow-500 md:text-base lg:text-lg xl:text-xl">
                                                                        {formatPrice(item.price)}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                ) : currentProducts.length > 0 ? (
                                    <>
                                        {getSortedProducts(currentProducts).map((item) => (
                                            <div
                                                key={item.id}
                                                className="relative ml-1 mt-4 md:ml-2 lg:ml-3 xl:ml-0"
                                            >
                                                <div className="product-carousel grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-7">
                                                    <div className="group relative right-0 mb-4 ml-1 h-[60vw] w-[45vw] transition-all duration-500 ease-in-out md:h-[42vw] md:w-[30vw] lg:h-[28vw] lg:w-[17vw] xl:w-[18vw]">
                                                        <div className="mb-3 h-[90%] w-full overflow-hidden bg-slate-200 transition-transform duration-500 ease-in-out">
                                                            <img
                                                                src={`http://127.0.0.1:8000/storage/${item.image}`}
                                                                alt={item.name || "Product Image"}
                                                                className="h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                                                            />
                                                        </div>
                                                        <div className="relative">
                                                            <div className="absolute bottom-[25px] left-0 right-0 z-10 flex translate-y-10 transform justify-center space-x-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 xl:bottom-[30px] xl:space-x-4">
                                                                <Link
                                                                    to={`/productdetail/${item.id}/subcate/${item.sub_category_id}`}
                                                                    className="translate-y-[30px] transform rounded-full bg-white p-[6px] opacity-0 transition-all duration-[50] ease-out hover:bg-black hover:text-white group-hover:translate-y-0 group-hover:opacity-100 lg:p-[5px] xl:lg:p-2"
                                                                >
                                                                    <Eye
                                                                        color="currentColor"
                                                                        strokeWidth="1.5"
                                                                        className="h-[14px] w-[14px] sm:h-6 sm:w-6 md:h-5 md:w-5 lg:h-4 lg:w-4 xl:h-5 xl:w-5"
                                                                    />
                                                                </Link>
                                                                <div className="translate-y-[35px] transform rounded-full bg-white p-[6px] opacity-0 transition-all duration-500 ease-out hover:bg-black hover:text-white group-hover:translate-y-0 group-hover:opacity-100 lg:p-[5px] xl:lg:p-2">
                                                                    <ShoppingCart
                                                                        color="currentColor"
                                                                        strokeWidth="1.5"
                                                                        className="h-[14px] w-[14px] sm:h-6 sm:w-6 md:h-5 md:w-5 lg:h-4 lg:w-4 xl:h-5 xl:w-5"
                                                                        onClick={() =>
                                                                            openModal(item.id, item.sub_category_id)
                                                                        }
                                                                    />
                                                                </div>
                                                                <div className="translate-y-[35px] transform rounded-full bg-white p-[6px] opacity-0 transition-all duration-500 ease-out hover:bg-black hover:text-white group-hover:translate-y-0 group-hover:opacity-100 lg:p-[5px] xl:lg:p-2">
                                                                    <Heart
                                                                        color="currentColor"
                                                                        strokeWidth="1.5"
                                                                        className="h-[14px] w-[14px] sm:h-6 sm:w-6 md:h-5 md:w-5 lg:h-4 lg:w-4 xl:h-5 xl:w-5"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <a className="block overflow-hidden">
                                                            <div className="truncate text-center text-sm hover:text-yellow-500 md:text-base lg:text-base xl:text-base">
                                                                {item.name}
                                                            </div>
                                                            <div className="block text-center">
                                                                {item.price_sale !== null ? (
                                                                    <>
                                                                        <span className="mr-1 text-xs text-gray-500 line-through hover:text-yellow-500 md:text-sm lg:text-base xl:text-base">
                                                                            {formatPrice(item.price)}
                                                                        </span>
                                                                        <span className="text-sm hover:text-yellow-500 md:text-base lg:text-lg xl:text-xl">
                                                                            {formatPrice(item.price_sale)}
                                                                        </span>
                                                                    </>
                                                                ) : (
                                                                    <span className="text-sm hover:text-yellow-500 md:text-base lg:text-lg xl:text-xl">
                                                                        {formatPrice(item.price)}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                ) : currentProducts.length > 0 ? (
                                    <>
                                        {getSortedProducts(currentProducts).map((item) => (
                                            <div
                                                key={item.id}
                                                className="relative ml-1 mt-4 md:ml-2 lg:ml-3 xl:ml-0"
                                            >
                                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-7">
                                                    <div className="group relative right-0 mb-4 ml-1 h-[60vw] w-[45vw] transition-all duration-500 ease-in-out md:h-[42vw] md:w-[30vw] lg:h-[28vw] lg:w-[17vw] xl:h-[25vw] xl:w-[16vw]">
                                                        <div className="mb-3 h-[90%] w-full overflow-hidden bg-slate-200 transition-transform duration-500 ease-in-out">
                                                            <img
                                                                src={`http://127.0.0.1:8000/storage/${item.image}`}
                                                                alt={item.name || "Product Image"}
                                                                className="h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                                                            />
                                                        </div>
                                                        <div className="relative">
                                                            <div className="absolute bottom-[25px] left-0 right-0 z-10 flex translate-y-10 transform justify-center space-x-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 xl:bottom-[30px] xl:space-x-4">
                                                                <Link
                                                                    to={`/productdetail/${item.id}/subcate/${item.sub_category_id}`}
                                                                    className="translate-y-[30px] transform rounded-full bg-white p-[6px] opacity-0 transition-all duration-[50] ease-out hover:bg-black hover:text-white group-hover:translate-y-0 group-hover:opacity-100 lg:p-[5px] xl:lg:p-2"
                                                                >
                                                                    <Eye
                                                                        color="currentColor"
                                                                        strokeWidth="1.5"
                                                                        className="h-[14px] w-[14px] sm:h-6 sm:w-6 md:h-5 md:w-5 lg:h-4 lg:w-4 xl:h-5 xl:w-5"
                                                                    />
                                                                </Link>
                                                                <div className="translate-y-[35px] transform rounded-full bg-white p-[6px] opacity-0 transition-all duration-500 ease-out hover:bg-black hover:text-white group-hover:translate-y-0 group-hover:opacity-100 lg:p-[5px] xl:lg:p-2">
                                                                    <ShoppingCart
                                                                        color="currentColor"
                                                                        strokeWidth="1.5"
                                                                        className="h-[14px] w-[14px] sm:h-6 sm:w-6 md:h-5 md:w-5 lg:h-4 lg:w-4 xl:h-5 xl:w-5"
                                                                        onClick={() =>
                                                                            openModal(item.id, item.sub_category_id)
                                                                        }
                                                                    />
                                                                </div>
                                                                <div className="translate-y-[35px] transform rounded-full bg-white p-[6px] opacity-0 transition-all duration-500 ease-out hover:bg-black hover:text-white group-hover:translate-y-0 group-hover:opacity-100 lg:p-[5px] xl:lg:p-2">
                                                                    <Heart
                                                                        color="currentColor"
                                                                        strokeWidth="1.5"
                                                                        className="h-[14px] w-[14px] sm:h-6 sm:w-6 md:h-5 md:w-5 lg:h-4 lg:w-4 xl:h-5 xl:w-5"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <a className="block overflow-hidden">
                                                            <div className="truncate text-center text-sm hover:text-yellow-500 md:text-base lg:text-base xl:text-base">
                                                                {item.name}
                                                            </div>
                                                            <div className="block text-center">
                                                                {item.price_sale !== null ? (
                                                                    <>
                                                                        <span className="mr-1 text-xs text-gray-500 line-through hover:text-yellow-500 md:text-sm lg:text-base xl:text-base">
                                                                            {formatPrice(item.price)}
                                                                        </span>
                                                                        <span className="text-sm hover:text-yellow-500 md:text-base lg:text-lg xl:text-xl">
                                                                            {formatPrice(item.price_sale)}
                                                                        </span>
                                                                    </>
                                                                ) : (
                                                                    <span className="text-sm hover:text-yellow-500 md:text-base lg:text-lg xl:text-xl">
                                                                        {formatPrice(item.price)}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                ) : (
                                    <p className="text-center">Chưa có sản phẩm</p>
                                )
                            }
                        </div>

                        <div className="hidden w-full justify-center p-4 xl:flex">
                            {/* Nút Previous */}
                            <button
                                className="mx-1 rounded-md text-gray-700 hover:bg-yellow-300"
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                            >
                                <ChevronLeft strokeWidth={0.5} />
                            </button>
                            {/* Số trang */}

                            <span className="p-2 opacity-60">{` ${currentPage} / ${totalPages}`}</span>
                            {/* Nút Next */}
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="mx-1 rounded-md text-gray-700 hover:bg-yellow-300"
                            >
                                <ChevronRight strokeWidth={0.5} />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex w-full justify-center p-4 shadow-lg xl:hidden">
                    {/* Nút Previous */}
                    <button
                        className="mx-1 rounded-md text-gray-700 hover:bg-yellow-300"
                        onClick={() => handlePageChange(currentPage - 1)}
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
            <div>
                {/* Modal filter mobile */}
                {isFilterMobile && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="w-11/12 rounded-lg bg-white p-6 sm:w-2/3 md:w-1/2 lg:w-1/3">
                            {/* Nội dung modal */}

                            <div className="scrollable-content h-[500px] overflow-y-scroll md:h-[500px]">
                                <div className="mt-5 text-2xl sm:text-lg">Bộ lọc</div>
                                <div className="sm:w-full md:w-full lg:w-48 xl:w-64">
                                    {/* Header Collapse */}
                                    <div
                                        className="flex cursor-pointer items-center p-4 sm:p-2"
                                        onClick={toggleCollapseSex}
                                    >
                                        <h2 className="mr-2 text-base sm:text-sm">Giới tính</h2>
                                        <ChevronDown size={17} strokeWidth={1.5} />
                                    </div>

                                    {/* Nội dung Collapse */}
                                    <div
                                        className={`transition-max-height overflow-hidden duration-500 ease-in-out ${isOpenSex ? "max-h-40" : "max-h-0"
                                            }`}
                                    >
                                        <div className="p-4 sm:p-2">
                                            {categories.map((item, index) => (
                                                <label
                                                    key={index}
                                                    className="mb-2 block text-base sm:text-sm"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        className="mr-2 sm:h-4 sm:w-4"
                                                        onChange={(e) =>
                                                            handleCate(item.id,
                                                                item.name,
                                                                e.target.checked,)
                                                        }
                                                        checked={category?.id === item.id}
                                                        name="cate"
                                                    />
                                                    {item.name}
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                    <hr />
                                    <div>
                                        <div
                                            className="flex cursor-pointer items-center p-4"
                                            onClick={toggleCollapseShirt}
                                        >
                                            <h2 className="mr-2 text-base">Áo</h2>
                                            <ChevronDown size={17} strokeWidth={1.5} />
                                        </div>

                                        {/* Nội dung Collapse */}
                                        <div
                                            className={`transition-max-height overflow-hidden duration-500 ease-in-out ${isOpenShirt ? "max-h-auto" : "max-h-0"
                                                }`}
                                        >
                                            <div className="p-4">
                                                {subcates.map((item, index) => (
                                                    <label key={index} className="mb-2 block">
                                                        <input
                                                            type="checkbox"
                                                            value={item.name}
                                                            className="mr-2"
                                                            onChange={(e) =>
                                                                handleSubCate(
                                                                    item.id,
                                                                    item.name,
                                                                    e.target.checked,
                                                                )
                                                            }
                                                            checked={selectedSubcate?.id === item.id}
                                                        />
                                                        {item.name}
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                        <hr />
                                        <div>
                                            <div
                                                className="flex cursor-pointer items-center p-4 text-black"
                                                onClick={toggleCollapsePrice}
                                            >
                                                <h2 className="mr-2 text-base">Khoảng giá</h2>{" "}
                                                <ChevronDown size={17} strokeWidth={1.5} />
                                            </div>

                                            {/* Nội dung Collapse */}
                                            <div
                                                className={`transition-max-height overflow-hidden duration-500 ease-in-out ${isOpenPrice ? "max-h-40" : "max-h-0"
                                                    }`}
                                            >
                                                <div className="p-4">
                                                    <form>
                                                        <label className="mb-2 block">
                                                            <input
                                                                type="checkbox"
                                                                name="price-range"
                                                                className="mr-2"
                                                                onChange={(e) =>
                                                                    handlePriceChange(
                                                                        150000,
                                                                        350000,
                                                                        e.target.checked,
                                                                    )
                                                                }
                                                                checked={
                                                                    priceRange?.min === 150000 &&
                                                                    priceRange?.max === 350000
                                                                }
                                                            />
                                                            Từ 150.000 - 350.000
                                                        </label>
                                                        <label className="mb-2 block">
                                                            <input
                                                                type="checkbox"
                                                                name="price-range"
                                                                className="mr-2"
                                                                onChange={(e) =>
                                                                    handlePriceChange(
                                                                        350000,
                                                                        550000,
                                                                        e.target.checked,
                                                                    )
                                                                }
                                                                checked={
                                                                    priceRange?.min === 350000 &&
                                                                    priceRange?.max === 550000
                                                                }
                                                            />
                                                            Từ 350.000 - 550.000
                                                        </label>
                                                        <label className="mb-2 block">
                                                            <input
                                                                type="checkbox"
                                                                name="price-range"
                                                                className="mr-2"
                                                                onChange={(e) =>
                                                                    handlePriceChange(
                                                                        550000,
                                                                        Number.MAX_SAFE_INTEGER,
                                                                        e.target.checked,
                                                                    )
                                                                }
                                                                checked={
                                                                    priceRange?.min === 550000 &&
                                                                    priceRange?.max === Number.MAX_SAFE_INTEGER
                                                                }
                                                            />
                                                            Trên 550.000
                                                        </label>
                                                    </form>
                                                </div>
                                            </div>

                                            <hr />

                                            <div className="mb-2 mt-3 text-sm">
                                                <span>Màu Sắc: </span>
                                                <div className="mt-2 flex space-x-2">
                                                    {color.map((item, index) => (
                                                        <div
                                                            key={index}
                                                            className="inline-flex items-center"
                                                        >
                                                            <label className="relative flex cursor-pointer items-center">
                                                                <input
                                                                    type="checkbox"
                                                                    className="peer h-7 w-7 cursor-pointer appearance-none rounded-full border border-slate-300 shadow transition-all hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                                                                    onChange={(e) =>
                                                                        handleColor(
                                                                            item.id,
                                                                            item.name,
                                                                            e.target.checked,
                                                                        )
                                                                    }
                                                                    checked={selectedColor?.id === item.id}
                                                                    style={{
                                                                        backgroundColor: item.color_code,
                                                                    }}
                                                                />
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="mt-4">
                                                <h2 className="mb-2">Kích Thước</h2>
                                                <div className="inline-flex items-center">
                                                    {size.map((item, index) => (
                                                        <div key={index} className="mr-2 flex space-x-2">
                                                            <label className="relative flex cursor-pointer items-center">
                                                                <input
                                                                    type="checkbox"
                                                                    className="peer h-9 w-9 cursor-pointer appearance-none border border-slate-300 shadow transition-all checked:bg-yellow-300 hover:shadow-md"
                                                                    onChange={(e) =>
                                                                        handleSize(
                                                                            item.id,
                                                                            item.name,
                                                                            e.target.checked,
                                                                        )
                                                                    } // Gọi handleSize khi thay đổi
                                                                    checked={selectedSize?.id === item.id} // Kiểm tra nếu size_id trùng với item.id thì checkbox được chọn
                                                                />
                                                                <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-sm uppercase text-gray-500 opacity-100 transition-colors peer-checked:text-black peer-checked:opacity-100">
                                                                    {item.name}
                                                                </span>
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Nút đóng modal */}
                            <div className="flex justify-center">
                                <button
                                    onClick={closeFilterMobile}
                                    className="rounded bg-red-500 px-4 py-2 text-white"
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
    );
};

export default AllProducts;
