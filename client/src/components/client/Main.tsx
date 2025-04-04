import { Eye, Heart, ShoppingCart } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import yourImage from "../../public/images/z5798016468804_8e0562bdb8cf6d307970a5c3643d142d.jpg";
const Main = () => {
  return (
    <div className="containerr">
      <div className="mb-28 mt-4 grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-4">
        {/* <div className=" p-4 md:p-4 lg:p-10  overflow-hidden border boder-2 border-slate-300 bg-slate-100 relative hover:shadow-xl group" >

                    <div className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold z-20">
                        - 50%
                    </div>
                    <div className='mb-4 overflow-hidden '>
                        <img src="https://product.hstatic.net/200000255805/product/z4473710787586_dd16ee0e88eafe7b9f63a6bbb58a10ac_fe0467cf864e4ad4ad20d8c1a87b30e3_master.jpg" alt=""
                            className='transition-transform duration-300 ease-in-out transform hover:scale-125'
                        />
                    </div>

                    <div className='mb-11 relative'>
                        <div className='flex justify-center space-x-4 absolute bottom-[-30px] left-0 right-0 transform translate-y-10 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 z-10'>
                            <div className='bg-white p-2 rounded-full hover:bg-black hover:text-white'>
                                <Eye color='currentColor' strokeWidth='1.5' size={20} />
                            </div>
                            <div className='bg-white p-2 rounded-full hover:bg-black hover:text-white'>
                                <ShoppingCart color='currentColor' strokeWidth='1.5' size={20} />
                            </div>
                            <div className='bg-white p-2 rounded-full hover:bg-black hover:text-white'>
                                <Heart color='currentColor' strokeWidth='1.5' size={20} />
                            </div>
                        </div>
                    </div>
                    <div className='relative z-0'>
                        <Link to={'/'} className='text-sm md:text-base lg:text-lg font-light text-slate-600 hover:text-slate-950'>Sản phẩm A</Link>
                        <Link to={'/'} className="flex items-center space-x-2 flex-wrap">
                            <span className="text-gray-500 line-through text-sm md:text-base lg:text-lg font-light min-w-[80px] max-w-full truncate hover:text-slate-500">
                                1,000,000₫
                            </span>
                            <span className="font-bold text-sm md:text-base lg:text-lg min-w-[80px] max-w-full truncate hover:text-slate-500">
                                800,000₫
                            </span>
                        </Link>
                    </div>


                </div>
                <div className=" p-4 md:p-4 lg:p-10  overflow-hidden border boder-2 border-slate-300 bg-slate-100 relative hover:shadow-xl group" >

                    <div className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold z-20">
                        - 50%
                    </div>
                    <div className='mb-4 overflow-hidden '>
                        <img src="https://bizweb.dktcdn.net/thumb/1024x1024/100/467/909/products/o1cn01qeydxa1uame6ibkg4-29376760-31360b92-84a2-4181-a2d3-608fdf53eae7.jpg?v=1723368389190" alt=""
                            className='transition-transform duration-300 ease-in-out transform hover:scale-125'
                        />
                    </div>

                    <div className='mb-11 relative'>
                        <div className='flex justify-center space-x-4 absolute bottom-[-30px] left-0 right-0 transform translate-y-10 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 z-10'>
                            <div className='bg-white p-2 rounded-full hover:bg-black hover:text-white'>
                                <Eye color='currentColor' strokeWidth='1.5' size={20} />
                            </div>
                            <div className='bg-white p-2 rounded-full hover:bg-black hover:text-white'>
                                <ShoppingCart color='currentColor' strokeWidth='1.5' size={20} />
                            </div>
                            <div className='bg-white p-2 rounded-full hover:bg-black hover:text-white'>
                                <Heart color='currentColor' strokeWidth='1.5' size={20} />
                            </div>
                        </div>
                    </div>
                    <div className='relative z-0'>
                        <Link to={'/'} className='text-sm md:text-base lg:text-lg font-light text-slate-600 hover:text-slate-950'>Sản phẩm A</Link>
                        <Link to={'/'} className="flex items-center space-x-2 flex-wrap">
                            <span className="text-gray-500 line-through text-sm md:text-base lg:text-lg font-light min-w-[80px] max-w-full truncate hover:text-slate-500">
                                1,000,000₫
                            </span>
                            <span className="font-bold text-sm md:text-base lg:text-lg min-w-[80px] max-w-full truncate hover:text-slate-500">
                                800,000₫
                            </span>
                        </Link>
                    </div>


                </div> */}
        <div className="boder-2 group relative w-full overflow-hidden border border-slate-300 bg-slate-100 p-4 hover:shadow-xl md:p-4 lg:p-10">
          <div className="absolute right-1 top-1 z-20 rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">
            - 50%
          </div>
          <div className="mb-4 overflow-hidden">
            <img
              src="https://cdn.gumac.vn/image/ao-phong-va-chan-vay070820201347499966.jpg"
              alt=""
              className="h-[300px] w-full transform object-cover transition-transform duration-300 ease-in-out hover:scale-125"
            />
          </div>
          <div className="relative mb-11">
            <div className="absolute bottom-[-30px] left-0 right-0 z-10 flex translate-y-10 transform justify-center space-x-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <div className="rounded-full bg-white p-2 hover:bg-black hover:text-white">
                <Eye color="currentColor" strokeWidth="1.5" size={20} />
              </div>
              <div className="rounded-full bg-white p-2 hover:bg-black hover:text-white">
                <ShoppingCart
                  color="currentColor"
                  strokeWidth="1.5"
                  size={20}
                />
              </div>
              <div className="rounded-full bg-white p-2 hover:bg-black hover:text-white">
                <Heart color="currentColor" strokeWidth="1.5" size={20} />
              </div>
            </div>
          </div>
          <div className="relative z-0">
            <Link
              to={"/"}
              className="text-sm font-light text-slate-600 hover:text-slate-950 md:text-base lg:text-lg"
            >
              A
            </Link>
            <Link to={"/"} className="flex flex-wrap items-center space-x-2">
              <span className="min-w-[80px] max-w-full truncate text-sm font-light text-gray-500 line-through hover:text-slate-500 md:text-base lg:text-lg">
                1,000,000₫
              </span>
              <span className="min-w-[80px] max-w-full truncate text-sm font-bold hover:text-slate-500 md:text-base lg:text-lg">
                800,000₫
              </span>
            </Link>
          </div>
        </div>
        <div className="boder-2 group relative w-full overflow-hidden border border-slate-300 bg-slate-100 p-4 hover:shadow-xl md:p-4 lg:p-10">
          <div className="absolute right-1 top-1 z-20 rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">
            - 50%
          </div>
          <div className="mb-4 overflow-hidden">
            <img
              src="https://cdn.gumac.vn/image/ao-phong-va-chan-vay070820201347499966.jpg"
              alt=""
              className="h-[300px] w-full transform object-cover transition-transform duration-300 ease-in-out hover:scale-125"
            />
          </div>

          <div className="relative mb-11">
            <div className="absolute bottom-[-30px] left-0 right-0 z-10 flex translate-y-10 transform justify-center space-x-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <div className="rounded-full bg-white p-2 hover:bg-black hover:text-white">
                <Eye color="currentColor" strokeWidth="1.5" size={20} />
              </div>
              <div className="rounded-full bg-white p-2 hover:bg-black hover:text-white">
                <ShoppingCart
                  color="currentColor"
                  strokeWidth="1.5"
                  size={20}
                />
              </div>
              <div className="rounded-full bg-white p-2 hover:bg-black hover:text-white">
                <Heart color="currentColor" strokeWidth="1.5" size={20} />
              </div>
            </div>
          </div>
          <div className="relative z-0">
            <Link
              to={"/"}
              className="text-sm font-light text-slate-600 hover:text-slate-950 md:text-base lg:text-lg"
            >
              Sản phẩm A
            </Link>
            <Link to={"/"} className="flex flex-wrap items-center space-x-2">
              <span className="min-w-[80px] max-w-full truncate text-sm font-light text-gray-500 line-through hover:text-slate-500 md:text-base lg:text-lg">
                1,000,000₫
              </span>
              <span className="min-w-[80px] max-w-full truncate text-sm font-bold hover:text-slate-500 md:text-base lg:text-lg">
                800,000₫
              </span>
            </Link>
          </div>
        </div>
        <div className="boder-2 group relative w-full overflow-hidden border border-slate-300 bg-slate-100 p-4 hover:shadow-xl md:p-4 lg:p-10">
          <div className="absolute right-1 top-1 z-20 rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">
            - 50%
          </div>
          <div className="mb-4 overflow-hidden">
            <img
              src="https://product.hstatic.net/200000255805/product/z4473710787586_dd16ee0e88eafe7b9f63a6bbb58a10ac_fe0467cf864e4ad4ad20d8c1a87b30e3_master.jpg"
              alt=""
              className="transform object-cover transition-transform duration-300 ease-in-out hover:scale-125"
            />
          </div>

          <div className="relative mb-11">
            <div className="absolute bottom-[-30px] left-0 right-0 z-10 flex translate-y-10 transform justify-center space-x-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <div className="rounded-full bg-white p-2 hover:bg-black hover:text-white">
                <Eye color="currentColor" strokeWidth="1.5" size={20} />
              </div>
              <div className="rounded-full bg-white p-2 hover:bg-black hover:text-white">
                <ShoppingCart
                  color="currentColor"
                  strokeWidth="1.5"
                  size={20}
                />
              </div>
              <div className="rounded-full bg-white p-2 hover:bg-black hover:text-white">
                <Heart color="currentColor" strokeWidth="1.5" size={20} />
              </div>
            </div>
          </div>
          <div className="relative z-0">
            <Link
              to={"/"}
              className="text-sm font-light text-slate-600 hover:text-slate-950 md:text-base lg:text-lg"
            >
              Sản phẩm A
            </Link>
            <Link to={"/"} className="flex flex-wrap items-center space-x-2">
              <span className="min-w-[80px] max-w-full truncate text-sm font-light text-gray-500 line-through hover:text-slate-500 md:text-base lg:text-lg">
                1,000,000₫
              </span>
              <span className="min-w-[80px] max-w-full truncate text-sm font-bold hover:text-slate-500 md:text-base lg:text-lg">
                800,000₫
              </span>
            </Link>
          </div>
        </div>
        <div className="boder-2 group relative w-full overflow-hidden border border-slate-300 bg-slate-100 p-4 hover:shadow-xl md:p-4 lg:p-10">
          <div className="absolute right-1 top-1 z-20 rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">
            - 50%
          </div>
          <div className="mb-4 overflow-hidden">
            <img
              src="https://product.hstatic.net/200000255805/product/z4473710787586_dd16ee0e88eafe7b9f63a6bbb58a10ac_fe0467cf864e4ad4ad20d8c1a87b30e3_master.jpg"
              alt=""
              className="h-[300px] w-full transform object-cover transition-transform duration-300 ease-in-out hover:scale-125"
            />
          </div>

          <div className="relative mb-11">
            <div className="absolute bottom-[-30px] left-0 right-0 z-10 flex translate-y-10 transform justify-center space-x-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <div className="rounded-full bg-white p-2 hover:bg-black hover:text-white">
                <Eye color="currentColor" strokeWidth="1.5" size={20} />
              </div>
              <div className="rounded-full bg-white p-2 hover:bg-black hover:text-white">
                <ShoppingCart
                  color="currentColor"
                  strokeWidth="1.5"
                  size={20}
                />
              </div>
              <div className="rounded-full bg-white p-2 hover:bg-black hover:text-white">
                <Heart color="currentColor" strokeWidth="1.5" size={20} />
              </div>
            </div>
          </div>
          <div className="relative z-0">
            <Link
              to={"/"}
              className="text-sm font-light text-slate-600 hover:text-slate-950 md:text-base lg:text-lg"
            >
              Sản phẩm A
            </Link>
            <Link to={"/"} className="flex flex-wrap items-center space-x-2">
              <span className="min-w-[80px] max-w-full truncate text-sm font-light text-gray-500 line-through hover:text-slate-500 md:text-base lg:text-lg">
                1,000,000₫
              </span>
              <span className="min-w-[80px] max-w-full truncate text-sm font-bold hover:text-slate-500 md:text-base lg:text-lg">
                800,000₫
              </span>
            </Link>
          </div>
        </div>
        <div className="boder-2 group relative w-full overflow-hidden border border-slate-300 bg-slate-100 p-4 hover:shadow-xl md:p-4 lg:p-10">
          <div className="absolute right-1 top-1 z-20 rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">
            - 50%
          </div>
          <div className="mb-4 overflow-hidden">
            <img
              src="https://cdn.gumac.vn/image/ao-phong-va-chan-vay070820201347499966.jpg"
              alt=""
              className="h-[300px] w-full transform object-cover transition-transform duration-300 ease-in-out hover:scale-125"
            />
          </div>

          <div className="relative mb-11">
            <div className="absolute bottom-[-30px] left-0 right-0 z-10 flex translate-y-10 transform justify-center space-x-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <div className="rounded-full bg-white p-2 hover:bg-black hover:text-white">
                <Eye color="currentColor" strokeWidth="1.5" size={20} />
              </div>
              <div className="rounded-full bg-white p-2 hover:bg-black hover:text-white">
                <ShoppingCart
                  color="currentColor"
                  strokeWidth="1.5"
                  size={20}
                />
              </div>
              <div className="rounded-full bg-white p-2 hover:bg-black hover:text-white">
                <Heart color="currentColor" strokeWidth="1.5" size={20} />
              </div>
            </div>
          </div>
          <div className="relative z-0">
            <Link
              to={"/"}
              className="text-sm font-light text-slate-600 hover:text-slate-950 md:text-base lg:text-lg"
            >
              Sản phẩm A
            </Link>
            <Link to={"/"} className="flex flex-wrap items-center space-x-2">
              <span className="min-w-[80px] max-w-full truncate text-sm font-light text-gray-500 line-through hover:text-slate-500 md:text-base lg:text-lg">
                1,000,000₫
              </span>
              <span className="min-w-[80px] max-w-full truncate text-sm font-bold hover:text-slate-500 md:text-base lg:text-lg">
                800,000₫
              </span>
            </Link>
          </div>
        </div>
        <div className="boder-2 group relative w-full overflow-hidden border border-slate-300 bg-slate-100 p-4 hover:shadow-xl md:p-4 lg:p-10">
          <div className="absolute right-1 top-1 z-20 rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">
            - 50%
          </div>
          <div className="mb-4 overflow-hidden">
            <img
              src="https://cdn.gumac.vn/image/ao-phong-va-chan-vay070820201347499966.jpg"
              alt=""
              className="h-[300px] w-full transform object-cover transition-transform duration-300 ease-in-out hover:scale-125"
            />
          </div>

          <div className="relative mb-11">
            <div className="absolute bottom-[-30px] left-0 right-0 z-10 flex translate-y-10 transform justify-center space-x-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <div className="rounded-full bg-white p-2 hover:bg-black hover:text-white">
                <Eye color="currentColor" strokeWidth="1.5" size={20} />
              </div>
              <div className="rounded-full bg-white p-2 hover:bg-black hover:text-white">
                <ShoppingCart
                  color="currentColor"
                  strokeWidth="1.5"
                  size={20}
                />
              </div>
              <div className="rounded-full bg-white p-2 hover:bg-black hover:text-white">
                <Heart color="currentColor" strokeWidth="1.5" size={20} />
              </div>
            </div>
          </div>
          <div className="relative z-0">
            <Link
              to={"/"}
              className="text-sm font-light text-slate-600 hover:text-slate-950 md:text-base lg:text-lg"
            >
              Sản phẩm A
            </Link>
            <Link to={"/"} className="flex flex-wrap items-center space-x-2">
              <span className="min-w-[80px] max-w-full truncate text-sm font-light text-gray-500 line-through hover:text-slate-500 md:text-base lg:text-lg">
                1,000,000₫
              </span>
              <span className="min-w-[80px] max-w-full truncate text-sm font-bold hover:text-slate-500 md:text-base lg:text-lg">
                800,000₫
              </span>
            </Link>
          </div>
        </div>
        <div className="boder-2 group relative w-full overflow-hidden border border-slate-300 bg-slate-100 p-4 hover:shadow-xl md:p-4 lg:p-10">
          <div className="absolute right-1 top-1 z-20 rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">
            - 50%
          </div>
          <div className="mb-4 overflow-hidden">
            <img
              src="https://cdn.gumac.vn/image/ao-phong-va-chan-vay070820201347499966.jpg"
              alt=""
              className="h-[300px] w-full transform object-cover transition-transform duration-300 ease-in-out hover:scale-125"
            />
          </div>

          <div className="relative mb-11">
            <div className="absolute bottom-[-30px] left-0 right-0 z-10 flex translate-y-10 transform justify-center space-x-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <div className="rounded-full bg-white p-2 hover:bg-black hover:text-white">
                <Eye color="currentColor" strokeWidth="1.5" size={20} />
              </div>
              <div className="rounded-full bg-white p-2 hover:bg-black hover:text-white">
                <ShoppingCart
                  color="currentColor"
                  strokeWidth="1.5"
                  size={20}
                />
              </div>
              <div className="rounded-full bg-white p-2 hover:bg-black hover:text-white">
                <Heart color="currentColor" strokeWidth="1.5" size={20} />
              </div>
            </div>
          </div>
          <div className="relative z-0">
            <Link
              to={"/"}
              className="text-sm font-light text-slate-600 hover:text-slate-950 md:text-base lg:text-lg"
            >
              Sản phẩm A
            </Link>
            <Link to={"/"} className="flex flex-wrap items-center space-x-2">
              <span className="min-w-[80px] max-w-full truncate text-sm font-light text-gray-500 line-through hover:text-slate-500 md:text-base lg:text-lg">
                1,000,000₫
              </span>
              <span className="min-w-[80px] max-w-full truncate text-sm font-bold hover:text-slate-500 md:text-base lg:text-lg">
                800,000₫
              </span>
            </Link>
          </div>
        </div>

        {/* <div className="bg-gray-200 p-4">Item 2</div>
                <div className="bg-gray-200 p-4">Item 3</div>
                <div className="bg-gray-200 p-4">Item 4</div> */}
      </div>
    </div>
  );
};

export default Main;
