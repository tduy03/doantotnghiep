import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCategory } from "../../../../../hook/useCategory";

type Menu = {
    handleMouseEnter: (data: any) => void;
    handleMouseLeave: (data: any) => void;
    isOpen: boolean;
    categoryId: number;
};

const MenuHeader = ({
    handleMouseEnter,
    handleMouseLeave,
    isOpen,
    categoryId,
}: Menu) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [categoryData, setCategoryData] = useState<any>(null);
    const { categories } = useCategory();
    const imageMap: Record<number, string> = {
        1: "https://m.yodycdn.com/fit-in/filters:format(webp)/products/media/categories/menu_man.webp", // URL ảnh cho danh mục 1
        2: "https://m.yodycdn.com/fit-in/filters:format(webp)/products/media/categories/menu_woman.webp", // URL ảnh cho danh mục 2
        3: "https://m.yodycdn.com/fit-in/filters:format(webp)/products/media/categories/2023-06-12-08-48-19_a5b00606-d7c0-4ba0-9611-33867680f45b.jpg", // URL ảnh cho danh mục 3
    };
    useEffect(() => {
        if (categoryId) {
            const category = categories.find((cat: any) => cat.id === categoryId);
            if (category) {
                setCategoryData(category);
            }
        }
    }, [categoryId, categories]);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                setIsAnimating(true);
            }, 10);
        } else {
            setIsAnimating(false);
        }
    }, [isOpen]);

    return (
        <div
            className={`absolute left-0 top-5 z-40 mt-[26px] w-full transform overflow-hidden bg-white pb-9 pt-6 shadow-lg transition-all duration-700 ease-in-out  ${isOpen && isAnimating ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="flex h-full justify-between border-t-2 pt-5 md:mx-3 lg:mx-[100px]  xl:mx-[150px] lg:flex">
                <div className="grid grid-rows-4 gap-4 opacity-70 md:grid-cols-5 lg:grid-cols-5  xl:grid-cols-7 text-[14px] lg:text-base">
                    {categoryData &&
                        categoryData.sub_categories &&
                        categoryData.sub_categories.length > 0 ? (
                        categoryData.sub_categories.map(
                            (subcategory: any, index: number) => (
                                <div key={index}>
                                    <Link
                                        to={`/products/cate/${subcategory.id}/${subcategory.name}`}
                                    >
                                        {subcategory.name}
                                    </Link>
                                </div>
                            ),
                        )
                    ) : (
                        <div>Hết hàng...</div>
                    )}
                </div>
                <div className="md:h-36 md:w-52 lg:h-36 lg:w-52">
                    <img
                        src={imageMap[categoryId] || "https://via.placeholder.com/300x400"} // Ảnh mặc định nếu không tìm thấy
                        alt="category"
                        className="h-full w-full object-cover"
                    />
                </div>
            </div>
        </div>
    );
};

export default MenuHeader;
