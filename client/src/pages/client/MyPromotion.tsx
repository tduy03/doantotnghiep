import React from 'react'
import { usePromotion } from '../../hook/usePromotion'
import useFormatPrice from '../../hook/useFormatPrice';

const MyPromotion = () => {
    const { promotions } = usePromotion();
    const { formatPrice } = useFormatPrice();
    return (
        <div>
            <div className=" mx-auto  relative md:h-[550px]  h-[750px] overflow-y-scroll">
                <div className='bg-white mb-3 py-2'>
                    <h1 className="text-2xl font-bold text-center ">Danh Sách Mã Khuyến Mãi</h1>
                </div>
                {/* Kiểm tra nếu danh sách trống */}
                {promotions.length === 0 ? (
                    <p className="text-center text-gray-600">Hiện không có mã khuyến mãi nào.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {promotions.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white border border-gray-200 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
                            >
                                <h2 className="text-lg font-semibold text-gray-800">
                                    Mã: <span className="text-blue-500">{item.code}</span>
                                </h2>
                                <p className="text-gray-600 mt-2">{formatPrice(item.discount)}</p>
                                <p className="text-sm text-gray-500 mt-1">
                                    {new Date(item.end_date).toLocaleDateString("vi-VN")}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>

    )
}

export default MyPromotion