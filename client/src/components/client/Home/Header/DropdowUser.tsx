import React from 'react';

interface DropdownMenuProps {
    isOpenUser: boolean;
    setIsOpenUser: (isOpen: boolean) => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ isOpenUser, setIsOpenUser }) => {
    const token = localStorage.getItem('token');
    const btnLogout = () => {
        if (token) {
            return (
                <div
                    className="absolute top-[39px] right-0 w-44 bg-white shadow-lg rounded-lg p-2 transition-transform transform origin-top duration-300 ease-in-out"
                    onMouseEnter={() => setIsOpenUser(true)}
                    onMouseLeave={() => setIsOpenUser(false)}
                >
                    <a
                        href="/profile"
                        className="block px-4 py-2 text-slate-500 hover:text-black hover:bg-gray-100"
                    >
                        Tài khoản của tôi
                    </a>
                    <a
                        href="/logout"
                        className="block px-4 py-2 text-slate-500 hover:text-black hover:bg-gray-100"
                    >
                        Đăng xuất
                    </a>
                </div>
            )
        }
    }
    return (
        isOpenUser && (
            btnLogout()
        )
    );
};

export default DropdownMenu;
