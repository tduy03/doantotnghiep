import axios from "axios";
import { useEffect, useState } from "react";
import useFormatPrice from "../hook/useFormatPrice";

type ModalOrderDetailProps = {
    openDetailOrder: boolean;
    closeOderDetail: () => void;
    OrderIdDetail: string;
}

interface Infor {
    username: string;
    email: string;
    phone: string;
    address: string;
    total_amount: number;
    commodity_money: number;
}
interface ProductOrder {
    product_detail: ProductOrderDetailProps[];
}

interface ProductOrderDetailProps {
    product_id: number;
    product_name: string;
    product_price: number;
    product_quantity: number;
    product_image: string;
}
const ModalOrderDetail = ({ openDetailOrder, closeOderDetail, OrderIdDetail }: ModalOrderDetailProps) => {
    const [animate, setAnimate] = useState(false)
    const [infor, setInfor] = useState<Infor>()
    const [product, setProduct] = useState<ProductOrder[]>([]);
    const [status, setStatus] = useState("");
    const [statusValue, setStatusValue] = useState("");
    const { formatPrice } = useFormatPrice();

    useEffect(() => {
        if (openDetailOrder) {
            setTimeout(() => {
                setAnimate(true);
            });
        } else {
            setAnimate(false);
        }
    }, [openDetailOrder]);

    const getOrderDetailId = async () => {
        try {
            const res = await axios.get(`/api/donhangs/show/${OrderIdDetail}`);
            const orderInfo = res.data.donhang;
            const statusKey = orderInfo.order_status;
            setInfor(orderInfo);
            setProduct(orderInfo.order_detail);
            setStatus(statusKey);
            setStatusValue(res.data.trangthaidonhang[statusKey]);
        } catch (error) {
            console.error("Error fetching order details:", error);
        }
    };

    useEffect(() => {
        if (OrderIdDetail) {
            getOrderDetailId();
        }
    }, [OrderIdDetail]);


    return (
        <>
            {openDetailOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className={` bg-white rounded-lg shadow-lg w-full max-w-md p-6 transition-all duration-1000 ${animate ? 'translate-y-0 opacity-100' : '-translate-y-96 opacity-0'} `}>
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">Chi tiết đơn hàng</h2>

                        <div className="space-y-3">
                            {/* Thông tin người mua */}
                            {infor && (
                                <div>
                                    <h3 className="font-semibold text-gray-600">Thông tin người mua:</h3>
                                    <p className="text-gray-700">Họ tên: {infor.username}</p>
                                    <p className="text-gray-700">Email: {infor.email}</p>
                                    <p className="text-gray-700">Số điện thoại: {infor.phone}</p>
                                    <p className="text-gray-700">Địa chỉ: {infor.address}</p>
                                </div>
                            )}
                            {/* Thông tin sản phẩm */}

                            <div  >
                                <h3 className="font-semibold text-gray-600">Thông tin sản phẩm:</h3>
                                {product.map((item) => (
                                    <ul className="space-y-2">
                                        <li className="flex justify-between text-gray-700">
                                            <span className="w-72">{item.product_detail.product.name},</span>
                                            <span>{item.product_detail.product_color.name},{item.product_detail.product_size.name}   <span>Sl:{item.quantity}</span></span>
                                        </li>

                                    </ul>

                                ))}
                            </div>




                            {/* Chi tiết thanh toán */}
                            {infor && (
                                <div className="border-t border-gray-200 pt-3">

                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Tiền hàng:</span>
                                        <span className="font-medium text-gray-800">{formatPrice(infor.commodity_money)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Tổng tiền:</span>
                                        <span className="font-bold text-lg text-red-500">{formatPrice(infor.total_amount)}</span>
                                    </div>
                                    <div className="flex justify-between mt-2">
                                        <span className="text-gray-600">Trạng thái:</span>
                                        <span className="font-medium text-blue-500">{statusValue}</span>
                                    </div>

                                </div>
                            )}
                        </div>

                        {/* Nút đóng */}
                        <div className="mt-6 text-center">
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                                onClick={closeOderDetail}
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div >
            )}
        </>
    )
}

export default ModalOrderDetail