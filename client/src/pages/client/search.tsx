import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Heart,
  ShoppingCart,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import "../../css/AllProduct.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const SearchProduct = () => {
  const [isOpenSex, setIsOpenSex] = useState(false);
  const [isOpenShirt, setIsOpenShirt] = useState(false);
  const [isOpenTrousers, setIsOpenTrousers] = useState(false);
  const [isOpenPrice, setIsOpenPrice] = useState(false);
  const [isOpenArrange, setIsOpenArrange] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  // console.log(searchResults);
  const navigate = useNavigate();
  const location = useLocation();
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
  const [value, setValue] = useState(50); // Giá trị ban đầu

  const handleChange = (e) => {
    setValue(e.target.value);
  };

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
      //   setError(null);
      console.log(searchTerm);
      const search = await axios.post(
        `http://127.0.0.1:8000/api/search?q=${searchTerm}`,
      );
      setSearchResults(search.data);
      //   console.log(search);

      if (!search.ok) {
        throw new Error("Không thể tải dữ liệu sản phẩm");
      }
    } catch (error) {
      // console.log(error);
    }
  };
  console.log(searchResults);

  return (
    <>
      <div className="mx-[200px]">
        <div className="sticky top-24 z-30">
          <div className="mb-5 text-gray-400">
            <a
              href="/"
              className="text-gray-500 hover:underline focus:outline-none"
            >
              Trang chủ
            </a>{" "}
            / <span className="text-gray-600">Checkout</span>
          </div>
        </div>
        <div className="flex">
          {/* BỘ LỌC */}
          <div className="mr-20">
            <div className="scrollable-content h-[700px] overflow-y-scroll">
              <div className="mt-5 text-2xl">Bộ lọc</div>
              <div className="w-64">
                {/* Header Collapse */}
                <div
                  className="flex cursor-pointer items-center p-4"
                  onClick={toggleCollapseSex}
                >
                  <h2 className="mr-2 text-base">Giới tính</h2>
                  <ChevronDown size={17} strokeWidth={1.5} />
                </div>

                {/* Nội dung Collapse */}
                <div
                  className={`transition-max-height overflow-hidden duration-500 ease-in-out ${
                    isOpenSex ? "max-h-40" : "max-h-0"
                  }`}
                >
                  <div className="p-4">
                    <form>
                      <label className="mb-2 block">
                        <input
                          type="checkbox"
                          value="option1"
                          className="mr-2"
                        />
                        Nam
                      </label>
                      <label className="mb-2 block">
                        <input
                          type="checkbox"
                          value="option2"
                          // checked={selectedOptions.includes('option2')}
                          // onChange={handleCheckboxChange}
                          className="mr-2"
                        />
                        Nữ
                      </label>
                    </form>
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
                    className={`transition-max-height overflow-hidden duration-500 ease-in-out ${
                      isOpenShirt ? "max-h-40" : "max-h-0"
                    }`}
                  >
                    <div className="p-4">
                      <form>
                        <label className="mb-2 block">
                          <input
                            type="checkbox"
                            value="option1"
                            // checked={selectedOptions.includes('option1')}
                            // onChange={handleCheckboxChange}
                            className="mr-2"
                          />
                          Áo Polo
                        </label>
                        <label className="mb-2 block">
                          <input
                            type="checkbox"
                            value="option2"
                            // checked={selectedOptions.includes('option2')}
                            // onChange={handleCheckboxChange}
                            className="mr-2"
                          />
                          Áo sơ mi
                        </label>
                        <label className="mb-2 block">
                          <input
                            type="checkbox"
                            value="option2"
                            // checked={selectedOptions.includes('option2')}
                            // onChange={handleCheckboxChange}
                            className="mr-2"
                          />
                          Áo phông
                        </label>
                      </form>
                    </div>
                  </div>
                </div>

                <hr className="bg-black" />

                <div>
                  <div
                    className="flex cursor-pointer items-center p-4 text-black"
                    onClick={toggleCollapseTrousers}
                  >
                    <h2 className="mr-2 text-base">Quần</h2>{" "}
                    <ChevronDown size={17} strokeWidth={1.5} />
                  </div>

                  {/* Nội dung Collapse */}
                  <div
                    className={`transition-max-height overflow-hidden duration-500 ease-in-out ${
                      isOpenTrousers ? "max-h-40" : "max-h-0"
                    }`}
                  >
                    <div className="p-4">
                      <form>
                        <label className="mb-2 block">
                          <input
                            type="checkbox"
                            value="option1"
                            // checked={selectedOptions.includes('option1')}
                            // onChange={handleCheckboxChange}
                            className="mr-2"
                          />
                          Quần Polo
                        </label>
                        <label className="mb-2 block">
                          <input
                            type="checkbox"
                            value="option2"
                            // checked={selectedOptions.includes('option2')}
                            // onChange={handleCheckboxChange}
                            className="mr-2"
                          />
                          Quần sơ mi
                        </label>
                        <label className="mb-2 block">
                          <input
                            type="checkbox"
                            value="option2"
                            // checked={selectedOptions.includes('option2')}
                            // onChange={handleCheckboxChange}
                            className="mr-2"
                          />
                          Quần phông
                        </label>
                      </form>
                    </div>
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
                    className={`transition-max-height overflow-hidden duration-500 ease-in-out ${
                      isOpenPrice ? "max-h-40" : "max-h-0"
                    }`}
                  >
                    <div className="p-4">
                      <form>
                        <label className="mb-2 block">
                          <input
                            type="checkbox"
                            value="option1"
                            // checked={selectedOptions.includes('option1')}
                            // onChange={handleCheckboxChange}
                            className="mr-2"
                          />
                          Dưới 350.000
                        </label>
                        <label className="mb-2 block">
                          <input
                            type="checkbox"
                            value="option2"
                            // checked={selectedOptions.includes('option2')}
                            // onChange={handleCheckboxChange}
                            className="mr-2"
                          />
                          Trên 750.000
                        </label>
                      </form>
                    </div>
                  </div>
                </div>
                <hr />

                <div className="mb-2 mt-3 text-sm">
                  <span>Màu Sắc: </span>
                  <div className="mt-2 flex space-x-2">
                    <div className="inline-flex items-center">
                      <label className="relative flex cursor-pointer items-center">
                        <input
                          type="radio"
                          className="peer h-7 w-7 cursor-pointer appearance-none rounded-full border border-slate-300 shadow transition-all hover:shadow-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                        />
                      </label>
                    </div>
                    <div className="inline-flex items-center">
                      <label className="relative flex cursor-pointer items-center">
                        <input
                          type="radio"
                          className="peer h-7 w-7 cursor-pointer appearance-none rounded-full border border-slate-300 bg-black shadow transition-all hover:shadow-md focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                        />
                      </label>
                    </div>
                    <div className="inline-flex items-center">
                      <label className="relative flex cursor-pointer items-center">
                        <input
                          type="radio"
                          className="peer h-7 w-7 cursor-pointer appearance-none rounded-full border border-slate-300 bg-yellow-400 shadow transition-all hover:shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                        />
                      </label>
                    </div>
                    <div className="inline-flex items-center">
                      <label className="relative flex cursor-pointer items-center">
                        <input
                          type="radio"
                          className="peer h-7 w-7 cursor-pointer appearance-none rounded-full border border-slate-300 bg-blue-500 shadow transition-all hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        />
                      </label>
                    </div>
                    <div className="inline-flex items-center">
                      <label className="relative flex cursor-pointer items-center">
                        <input
                          type="radio"
                          className="peer h-7 w-7 cursor-pointer appearance-none rounded-full border border-slate-300 bg-red-500 shadow transition-all hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <h2 className="mb-2">Kích Thước</h2>
                  <div className="inline-flex items-center">
                    <div className="mr-2 flex space-x-2">
                      <label className="relative flex cursor-pointer items-center">
                        <input
                          type="checkbox"
                          className="peer h-9 w-9 cursor-pointer appearance-none border border-slate-300 shadow transition-all checked:bg-yellow-300 hover:shadow-md"
                        />
                        <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-sm uppercase text-gray-500 opacity-100 transition-colors peer-checked:text-black peer-checked:opacity-100">
                          S
                        </span>
                      </label>
                    </div>
                    <div className="mr-2 flex space-x-2">
                      <label className="relative flex cursor-pointer items-center">
                        <input
                          type="checkbox"
                          className="peer h-9 w-9 cursor-pointer appearance-none border border-slate-300 shadow transition-all checked:bg-yellow-300 hover:shadow-md"
                        />
                        <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-sm uppercase text-gray-500 opacity-100 transition-colors peer-checked:text-black peer-checked:opacity-100">
                          M
                        </span>
                      </label>
                    </div>
                    <div className="mr-2 flex space-x-2">
                      <label className="relative flex cursor-pointer items-center">
                        <input
                          type="checkbox"
                          className="peer h-9 w-9 cursor-pointer appearance-none border border-slate-300 shadow transition-all checked:bg-yellow-300 hover:shadow-md"
                        />
                        <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-sm uppercase text-gray-500 opacity-100 transition-colors peer-checked:text-black peer-checked:opacity-100">
                          L
                        </span>
                      </label>
                    </div>
                    <div className="mr-2 flex space-x-2">
                      <label className="relative flex cursor-pointer items-center">
                        <input
                          type="checkbox"
                          className="peer h-9 w-9 cursor-pointer appearance-none border border-slate-300 shadow transition-all checked:bg-yellow-300 hover:shadow-md"
                        />
                        <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-sm uppercase text-gray-500 opacity-100 transition-colors peer-checked:text-black peer-checked:opacity-100">
                          XL
                        </span>
                      </label>
                    </div>
                    <div className="mr-2 flex space-x-2">
                      <label className="relative flex cursor-pointer items-center">
                        <input
                          type="checkbox"
                          className="peer h-9 w-9 cursor-pointer appearance-none border border-slate-300 shadow transition-all checked:bg-yellow-300 hover:shadow-md"
                        />
                        <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-sm uppercase text-gray-500 opacity-100 transition-colors peer-checked:text-black peer-checked:opacity-100">
                          2XL
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
                {/* // */}
              </div>
            </div>
          </div>

          {/* BOX PRODUCTS*/}
          <div className="">
            <div className="sticky top-[79px] z-40 bg-white pt-2">
              <div className="flex justify-between">
                <div>
                  <div className="mb-3 ml-4 inline-block pt-3">
                    Đang dùng bộ lọc:
                  </div>
                  <div className="ml-2 inline-flex w-20 items-center justify-center rounded-lg bg-slate-100">
                    S <X className="ml-1" size={17} strokeWidth={1} />
                  </div>
                  <div className="ml-2 inline-flex w-20 items-center justify-center rounded-lg bg-slate-100">
                    ĐỎ <X className="ml-1" size={17} strokeWidth={1} />
                  </div>
                </div>
                <div>
                  <div
                    className="flex w-48 cursor-pointer items-center justify-end text-black"
                    onClick={toggleCollapseArrange}
                  >
                    <h2 className="text-base">Sắp xếp theo</h2>{" "}
                    <ChevronDown size={17} strokeWidth={1.5} />
                  </div>

                  {/* Nội dung Collapse */}
                  <div
                    className={`transition-max-height absolute overflow-hidden duration-500 ease-in-out ${
                      isOpenArrange ? "max-h-40" : "max-h-0"
                    }`}
                  >
                    <div className="rounded border-2 bg-white p-4">
                      <form>
                        <label className="mb-2 block">
                          <input
                            type="checkbox"
                            value="option1"
                            // checked={selectedOptions.includes('option1')}
                            // onChange={handleCheckboxChange}
                            className="mr-2"
                          />
                          Mới nhất
                        </label>
                        <label className="mb-2 block">
                          <input
                            type="checkbox"
                            value="option2"
                            // checked={selectedOptions.includes('option2')}
                            // onChange={handleCheckboxChange}
                            className="mr-2"
                          />
                          Giá từ thấp đến cao
                        </label>
                        <label className="mb-2 block">
                          <input
                            type="checkbox"
                            value="option2"
                            // checked={selectedOptions.includes('option2')}
                            // onChange={handleCheckboxChange}
                            className="mr-2"
                          />
                          Giá từ cao đến thấp
                        </label>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3">
              {searchResults.map((searchResultss) => (
                <div className="relative ml-3.5 mt-4 md:ml-4 lg:ml-3">
                  <div className="product-carousel grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-7">
                    <div className="group relative right-0 mb-4 ml-1 h-[80vw] w-[45vw] transition-all duration-500 ease-in-out md:h-[60vw] md:w-[30vw] lg:h-[28vw] lg:w-[17vw] xl:w-[18vw]">
                      <div className="mb-3 h-[90%] w-full overflow-hidden bg-slate-200 transition-transform duration-500 ease-in-out">
                        <img
                          src="https://m.yodycdn.com/fit-in/filters:format(webp)/100/438/408/products/ao-ba-lo-nu-bln6030-bee-cvn5148-nan-5-yodyvn-f885bf48-c73c-4fa7-b848-8105fb3cde79.jpg?v=1681107396047"
                          alt=""
                          className="h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                        />
                      </div>
                      <div className="relative">
                        <div className="absolute bottom-[30px] left-0 right-0 z-10 flex translate-y-10 transform justify-center space-x-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                          <a className="rounded-full bg-white p-2 hover:bg-black hover:text-white">
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
                            />
                          </div>
                          <div className="rounded-full bg-white p-2 hover:bg-black hover:text-white">
                            <Heart
                              color="currentColor"
                              strokeWidth="1.5"
                              className="h-4 w-4 sm:h-8 sm:w-8 md:h-7 md:w-7 lg:h-7 lg:w-7 xl:h-6 xl:w-6"
                            />
                          </div>
                        </div>
                      </div>
                      <a className="block overflow-hidden">
                        <div className="truncate text-center text-sm hover:text-yellow-500 md:text-base lg:text-base xl:text-base">
                          {searchResultss.name.slice(0, 5)}
                        </div>
                        <div className="block text-center">
                          <span className="mr-1 text-xs text-gray-500 line-through hover:text-yellow-500 md:text-sm lg:text-base xl:text-base">
                            {searchResultss.price}
                          </span>
                          <span className="text-sm hover:text-yellow-500 md:text-base lg:text-lg xl:text-xl">
                            .000đ
                          </span>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchProduct;
