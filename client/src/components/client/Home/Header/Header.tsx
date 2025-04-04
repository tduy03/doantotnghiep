import React, { useEffect, useState } from "react";
import yourImage from "../../../../public/images/e46fd43976ade19f2b8baa48b95073e6.jpg";
import { AlignJustify, Heart, Search, ShoppingCart, User } from "lucide-react";
import "../../../../css/tableHeader.css";

import DropdownMenu from "./DropdowUser";
import { Link, useNavigate } from "react-router-dom";
import { useCategory } from "../../../../hook/useCategory";

import { useLoading } from "../../../../context/Loading";

import { useCart } from "../../../../context/Cart";
import { Badge } from "@mui/material";

import MenuHeader from "./Menu/MenuHeaderDesktop";
import MenuMobile from "./Menu/MenuMobile";
// import { useLoading } from "../../../../context/Loading";


interface HeaderProps {
  isMobile: boolean;
}

const Header: React.FC<HeaderProps> = ({ isMobile }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [isOpenUser, setIsOpenUser] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { totalQuantity } = useCart();
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);
  const navigate = useNavigate();

  const [isAnimaton, setIsAnimaton] = useState(false);




  const handleOpenCart = () => {
    setsOpenCart(true);
  };
  const handleCloseCart = () => {

    setsOpenCart(false);
  };


  //     setsOpenCart(false)
  //   }
  // Thêm state để quản lý số lượng sản phẩm trong giỏ hàng
  const handleMenu = () => {
    if (openMenu) {
      // Khi đóng menu, bắt đầu hiệu ứng
      setIsAnimaton(false);
      setTimeout(() => {
        setOpenMenu(false); // Thực sự đóng menu sau khi hiệu ứng hoàn tất
      }, 700);
    } else {
      // Khi mở menu
      setOpenMenu(true);
      setTimeout(() => setIsAnimaton(true), 100); // Bắt đầu hiệu ứng mở
    }
  };
  const handleMouseEnter = (id: number) => {
    setIsOpen(true);
    setActiveCategoryId(id); // Lưu lại id của category khi hover vào
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
    setActiveCategoryId(null); // Đặt lại id khi rời khỏi
  };
  const token = localStorage.getItem("token");

  //CHỨC NĂNG TÌM KIẾM SẢN PHẨM
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // kiểm tra điều kiện trước khi điều hướng
    navigate(`/allproducts/?q=${searchTerm}`);
  };

  const { categories } = useCategory();

  // Hàm lấy dữ liệu giỏ hàng từ AP

  useEffect(() => {
    if (openMenu) {
      setTimeout(() => {
        setIsAnimaton(true);
      }, 100); // Delay để đảm bảo hiệu ứng mở diễn ra mượt mà
    } else {
      setIsAnimaton(false);
    }
  }, [openMenu]);



  return (
    <div
      className={`sticky top-0 z-50 w-full bg-white p-[1px] px-[6px] lg:p-2`}
    >
      <div>
        <div className="relative mt-2 flex items-center justify-between md:mx-[0px] md:mt-0 lg:mx-[100px] xl:mx-[150px]">
          {/* Logo */}
          <div className="z-50 hidden md:block">
            <a
              href="/"
              className="flex items-center justify-center md:justify-start"
            >
              <div className="w-10 md:w-16">
                <img src={yourImage} alt="Logo" className="h-auto w-full" />
              </div>
              {/* <h1 className="hidden text-[24px] font-bold xl:block">
                DTDUY
              </h1> */}
            </a>
          </div>

          {/* Menu cho màn hình desktop */}
          <div className="hidden flex-grow text-sm md:flex lg:ml-1 xl:ml-10">
            <ul className="flex space-x-5" style={{ margin: "0 75px" }}>
              <li className="hovermenuNav relative">
                <a href="/allproducts" className="hover:text-slate-600">
                  TẤT CẢ SẢN PHẨM
                </a>
              </li>

              {categories.map((category) => (
                <li
                  key={category.id}
                  className={`hovermenuNav ${isOpen && activeCategoryId === category.id ? "text-yellow-500" : ""}`}
                  onMouseEnter={() => handleMouseEnter(category.id)} // Truyền id khi hover vào
                  onMouseLeave={handleMouseLeave}
                >
                  <a className="hover:text-slate-600">
                    {category.name}
                  </a>
                </li>
              ))}

              <li className="hovermenuNav">
                <a href="news" className="hover:text-slate-600">
                  TIN TỨC
                </a>
              </li>
              <li className="hovermenuNav">
                <a href="contact" className="hover:text-slate-600">
                  LIÊN HỆ
                </a>
              </li>
            </ul>
          </div>

          {/* Menu di động */}

          <MenuMobile
            openMenu={openMenu}
            isMobile={isMobile}
            handleMenu={handleMenu}
            isAnimaton={isAnimaton}
          />

          {/* Biểu tượng menu */}
          {/* Nút mở/đóng menu di động */}
          <div className="flex items-center">
            {isMobile && (
              <div className="mt-[-15x]">
                {/* Nút mở menu */}
                {!openMenu && (
                  <AlignJustify
                    size={25}
                    onClick={handleMenu}
                    className="cursor-pointer text-slate-500 hover:text-black"
                  />
                )}
              </div>
            )}

            <div className="mr-2 flex rounded-full md:px-2 md:py-2 lg:border-2">
              <form
                action=""
                onSubmit={handleSearch}
                className="flex items-center"
              >
                <input
                  type="text"
                  placeholder="Tìm kiếm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="hidden outline-none lg:block lg:w-24 xl:w-36"
                />
                <button type="submit" className="ml-2">
                  <Search
                    size={25}
                    className="cursor-pointer text-slate-500 hover:text-black"
                  />
                </button>
              </form>
            </div>
          </div>
          {/* Logo mobile  */}
          <div className="block md:hidden">
            <a
              href="/"
              className="flex items-center justify-center md:justify-start"
            >
              <div className="w-10 md:w-16">
                <img src={yourImage} alt="Logo" className="h-auto w-full" />
              </div>
              <h1 className="hidden text-[24px] font-bold lg:block">
                Modern Men
              </h1>
            </a>
          </div>
          <div className="mr-1 flex space-x-2">
            <a href="/wishlist">
              <Heart
                className="hidden w-6 cursor-pointer text-slate-500 hover:text-black md:block lg:w-full"
                size={30}
              />
            </a>
            {token ? (
              // Nếu có token, không có route
              <Link
                to="/"
                onMouseEnter={() => setIsOpenUser(true)}
                onMouseLeave={() => setIsOpenUser(false)}
                className="cursor-pointer text-slate-500 hover:text-black"
              >
                <User
                  size={30}
                  className="w-6 cursor-pointer text-slate-500 hover:text-black md:block lg:w-full"
                />
              </Link>
            ) : (
              // Nếu không có token, hiển thị route
              <Link
                to="/login"
                onMouseEnter={() => setIsOpenUser(true)}
                onMouseLeave={() => setIsOpenUser(false)}
                className="cursor-pointer text-slate-500 hover:text-black"
              >
                <User
                  size={30}
                  className="w-6 cursor-pointer text-slate-500 hover:text-black md:block lg:w-full"
                />
              </Link>
            )}

            {token ? (
              <DropdownMenu
                isOpenUser={isOpenUser}
                setIsOpenUser={setIsOpenUser}
              />
            ) : null}
            <div

            >
              <Badge badgeContent={totalQuantity} color="primary">
                <a href="/cart">
                  <ShoppingCart
                    size={30}
                    className="w-6 cursor-pointer text-slate-500 hover:text-black lg:w-full"
                  />
                </a>
              </Badge>
            </div>
          </div>
        </div>
        {isOpen && activeCategoryId !== null && (
          <MenuHeader
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            isOpen={isOpen}
            categoryId={activeCategoryId} // Truyền id của category đang hover vào
          />
        )}


      </div>
    </div>
  );
};

export default Header;
