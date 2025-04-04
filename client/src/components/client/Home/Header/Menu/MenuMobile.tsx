import { ChevronDown, ChevronRight, X } from "lucide-react";
import React, { useState } from "react";
import { useCategory } from "../../../../../hook/useCategory";
import yourImage from "../../../../../public/images/logofix2.png";
import { Link } from "react-router-dom";

type MenuMobileProsp = {
    openMenu: boolean;
    handleMenu: () => void;
    isMobile: boolean;
    isAnimaton: boolean;
};

const MenuMobile = ({
    openMenu,
    handleMenu,
    isMobile,
    isAnimaton,
}: MenuMobileProsp) => {
    const { categories } = useCategory();
    const [openSubmenuId, setOpenSubmenuId] = useState<number | null>(null);

    const toggleSubmenu = (id: string) => {
        setOpenSubmenuId((prev) => (prev === parseInt(id) ? null : parseInt(id)));
    };

    return (
        <>
            {openMenu && isMobile && (
                <div
                    className={`fixed inset-0 z-50 h-screen w-1/2 transform overflow-hidden bg-white p-2 text-sm transition-all duration-700 ease-in-out ${isAnimaton ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}`}
                >
                    {/* Nút đóng menu */}
                    {openMenu && (
                        <div className="mb-3 flex justify-between">
                            <div></div>
                            <img src={yourImage} alt="Logo" className="w-7" />
                            <X
                                size={20}
                                onClick={handleMenu}
                                className="cursor-pointer text-slate-500 hover:text-black"
                            />
                        </div>
                    )}

                    <ul className="ml-2 space-y-4 overflow-y-scroll scrollable-content text-[13px] uppercase text-slate-600">
                        <li>
                            <Link to="/" className="hover:text-yellow-500">
                                Trang chủ
                            </Link>
                            <hr />
                        </li>
                        <li>
                            <Link to="/allproducts" className="hover:text-yellow-500">
                                Tất cả sản phẩm
                            </Link>
                            <hr />
                        </li>

                        {/* Danh mục */}
                        {categories.map((category) => (
                            <li key={category.id} className="relative mb-2">
                                {/* Danh mục chính */}
                                <div
                                    onClick={() => toggleSubmenu(category.id)}
                                    className="flex cursor-pointer items-center justify-between hover:text-yellow-500"
                                >
                                    <span>{category.name}</span>
                                    <ChevronRight
                                        size={18}
                                        strokeWidth={1}
                                        className={`transform transition-transform duration-300 ${openSubmenuId === category.id ? "rotate-90" : "rotate-0"
                                            }`}
                                    />
                                </div>
                                <hr />
                                {/* Submenu */}
                                {category.sub_categories && (
                                    <ul
                                        className={`mt-2 overflow-hidden pl-4 transition-all duration-300 ${openSubmenuId === category.id
                                            ? "max-h-96 opacity-100"
                                            : "max-h-0 opacity-0"
                                            }`}
                                    >
                                        {category.sub_categories.map((sub) => (
                                            <li
                                                key={sub.id}
                                                className="py-2 text-[10px] text-sm hover:text-yellow-500"
                                            >
                                                <Link to={`/products/cate/${sub.id}/${sub.name}`}>
                                                    {sub.name}
                                                </Link>
                                                <hr />
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}

                        {/* Liên kết bổ sung */}
                        <li>
                            <Link to="#" className="hover:text-yellow-500">
                                Tin tức
                            </Link>
                            <hr />
                        </li>
                        <li>
                            <Link to="#" className="hover:text-yellow-500">
                                Liên hệ
                            </Link>
                            <hr />
                        </li>
                        <li>
                            <Link to="/wishlist" className="hover:text-yellow-500">
                                Sản phẩm yêu thích
                            </Link>
                            <hr />
                        </li>
                    </ul>
                </div>
            )}
        </>
    );
};

export default MenuMobile;
