import { Eye, Heart, LockKeyhole, PenLine, ShoppingBag, Ticket } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

const Profile = () => {
    const [name, setName] = useState<string>("");

    useEffect(() => {
        const userJson = localStorage.getItem("user");
        if (userJson) {
            const user = JSON.parse(userJson);
            setName(user.name ?? "Anonymous");
        }
    }, []);

    return (
        <div className="bg-slate-100">
            <div className="flex flex-col min-h-screen mx-2 xl:mx-[150px]  ">
                <div className="flex-1 mb-16">
                    {/* Header */}
                    <div className=" py-3 pl-4 lg:py-1 pt-1 xl:mt-3 bg-white xl:py-5">
                        <div>
                            <h1 className="text-xl font-bold text-gray-600 xl:text-2xl">Tài khoản của tôi.</h1>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="grid grid-cols-1 gap-4 md:gap-0 lg:gap-4 md:grid-cols-4 lg:grid-cols-5 mt-3">
                        {/* Sidebar */}
                        <aside className="col-span-1 h-80 bg-white border  rounded-lg p-4">
                            <div className="flex flex-col   md:items-start lg:items-center gap-4 mb-6">
                                <img
                                    className="w-16 h-16 rounded-full object-cover"
                                    src="https://inkythuatso.com/uploads/thumbnails/800/2023/03/9-anh-dai-dien-trang-inkythuatso-03-15-27-03.jpg"
                                    alt="Profile"
                                />
                                <div className="text-center md:text-left">
                                    <p className="text-base font-semibold">{name}</p>
                                    <Link
                                        to="/profile"
                                        className="flex items-center text-sm text-gray-500 hover:text-blue-500 mt-2 gap-1"
                                    >
                                        <PenLine size={15} />
                                        Sửa hồ sơ
                                    </Link>
                                </div>
                            </div>

                            <ul className="space-y-4 text-sm">
                                <li className="flex items-center gap-3">
                                    <Heart color="#0046d1" size={20} strokeWidth={1.5} />
                                    <Link to="/wishlist" className="hover:text-yellow-500">
                                        Sản phẩm yêu thích
                                    </Link>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Eye color="#0046d1" size={20} strokeWidth={1.5} />
                                    <Link to="/profile/productview" className="hover:text-yellow-500">
                                        Sản phẩm đã xem
                                    </Link>
                                </li>
                                <li className="flex items-center gap-3">
                                    <ShoppingBag color="#0046d1" size={20} strokeWidth={1.5} />
                                    <Link to="/profile/order" className="hover:text-yellow-500">
                                        Đơn hàng
                                    </Link>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Ticket color="#0046d1" size={20} strokeWidth={1.5} />
                                    <Link to="/profile/promotion" className="hover:text-yellow-500">
                                        Mã khuyến mại
                                    </Link>
                                </li>
                            </ul>
                        </aside>

                        {/* Main Content */}
                        <main className="col-span-1 md:col-span-3 lg:col-span-4">
                            <Outlet />
                        </main>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
