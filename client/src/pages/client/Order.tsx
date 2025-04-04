import React, { useState } from "react";
import axios from "axios";
import { useOder } from "../../hook/useOder";
import CancelMyOrder from "../../modalConfirm/CancelMyoOrder";
import Comment from "../../components/client/Comment/Comment";
import { toast } from "react-toastify";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useFormatPrice from "../../hook/useFormatPrice";
import ModalOrderDetail from "../../modalConfirm/ModalOrderDetail";
import { useForm } from "react-hook-form";

interface OrderItem {
    id: string;
    image: string;
    orderStatus: string;
    price: number;
    product_name: string;
    quantity: number;
    code_order: string;
    total_amount: string;
    vn_payId: number;
}

const Order: React.FC = () => {
    const { myOrder, setMyOrder, getMyOrder, searchOrder, search } = useOder();
    console.log(myOrder);

    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalComment, setModalComment] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [openDetailOrder, setOpenDetailOrder] = useState(false);
    const [OrderIdDetail, setOrderIdDetail] = useState<string | null>(null);
    const [valueSearch, setValueSearch] = useState();
    const openOderDetail = (id) => {
        setOrderIdDetail(id)
        setOpenDetailOrder(true)
    }


    const closeOderDetail = () => {
        setOpenDetailOrder(false)
    }
    const { formatPrice } = useFormatPrice();
    // Thêm state cho phân trang
    // const [currentPage, setCurrentPage] = useState(1);
    // const [ordersPerPage] = useState(2);

    // const totalPages = Math.ceil(myOrder.length / ordersPerPage);
    // const indexOfLastOrder = currentPage * ordersPerPage;
    // const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    // const currentOrders = myOrder.slice(indexOfFirstOrder, indexOfLastOrder);

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Đang chuẩn bị":
            case "Đã xác nhận":
                return "bg-yellow-300 rounded-full px-2";
            case "Đã giao hàng":
            case "Đang vận chuyển":
            case "Đã nhận hàng":
                return "bg-green-300 rounded-full px-2";
            case "Hủy hàng":
                return "bg-red-300 rounded-full px-2";
            case "Chờ xác nhận":
                return "bg-blue-300 rounded-full px-2";
            default:
                return "bg-gray-300";
        }
    };

    const handleCancelOrder = async (id: string, action: "confirm" | "cancel") => {
        try {
            const payload = action === "confirm" ? { da_nhan_hang: "1" } : { huy_don_hang: "1" };
            const response = await axios.put(`/api/donhangs/${id}/update`, payload);

            if (response.status === 200) {
                setMyOrder((prevOrders) =>
                    prevOrders.map((order) =>
                        order.id === id
                            ? { ...order, orderStatus: action === "confirm" ? "Đã nhận hàng" : "Hủy hàng" }
                            : order
                    )
                );
                getMyOrder();
            }
            if (response.data.message) {
                toast.success(response.data.message);
            } else {
                toast.error(response.data.error);
            }
        } catch (error) {
            console.error("Lỗi khi xử lý đơn hàng:", error);
        }
    };

    const openCancelModal = (orderId: string) => {
        setSelectedOrderId(orderId);
        setModalVisible(true);
    };
    const confirmCancelOrder = async () => {
        if (selectedOrderId) {
            await handleCancelOrder(selectedOrderId, "cancel");
        }
        setModalVisible(false);
    };

    const getStatusButton = (status: string, orderId: string, vn_payId: number) => {
        if (status === "Đang vận chuyển") {
            return (
                <button
                    className="rounded bg-green-300 px-3 py-2 text-white"
                    onClick={() => handleCancelOrder(orderId, "confirm")}
                >
                    Đã nhận hàng
                </button>
            );
        } else if (status === "Chờ xác nhận" || status === "Đã xác nhận" && vn_payId != null && vn_payId !== '') {
            return (
                <button
                    className={`px-4 py-2 rounded ${vn_payId === null || vn_payId === ""
                            ? "bg-red-500 text-white"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                    onClick={() => (vn_payId === null || vn_payId === "") && openCancelModal(orderId)}
                    disabled={vn_payId !== null && vn_payId !== ""}
                >
                    Hủy đơn
                </button>

            );
        } else {
            return null; // Không hiển thị nút nếu không thỏa mãn điều kiện
        }
    };

    // const getStatusTop = (status: string) => {
    //     if (status === "Đã nhận hàng") {
    //         return <span className="text-sm text-red-600">Hoàn thành</span>;
    //     }
    // };

    // Mở comment
    const openComment = (id) => {
        setSelectedProductId(id);
        setModalComment(true);
    };

    // Nhóm các đơn hàng theo id
    const groupedOrders = myOrder.reduce<Record<string, OrderItem[]>>((acc, item) => {
        if (!acc[item.id]) {
            acc[item.id] = [];
        }
        acc[item.id].push(item);
        return acc;
    }, {});

    const handleSearch = async (value?: string) => {
        const query = value || valueSearch; // Lấy giá trị từ input hoặc state
        await searchOrder(query)
    };
    console.log(search);

    return (
        <div className="col-span-4 ">
            <h1 className="text-2xl font-bold text-center mb-6">Danh Sách đơn hàng.</h1>
            <div className="overflow-hidden">
                <div className=" mx-auto  relative md:h-[550px]  h-[750px] overflow-y-scroll">
                    {/* Search Bar */}
                    {/* <div className="mb-4">
                        <input
                            onChange={(e) => setValueSearch(e.target.value)}
                            value={valueSearch}
                            type="text"
                            placeholder="Bạn có thể tìm kiếm theo ID đơn hàng hoặc Tên Sản phẩm"
                            className=" text-[15px] w-40 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button onClick={() => handleSearch()} >Gửi</button>
                    </div> */}
                    {myOrder.length === 0 ? (
                        <div className="text-center py-10 text-gray-500">
                            <p>Không có đơn hàng nào</p>
                        </div>
                    ) : (
                        Object.keys(groupedOrders).map((id) => (
                            <div key={id} className="border rounded-md p-4 mb-4 bg-white">
                                <div className="flex justify-between items-center mb-2">
                                    <div className="space-x-2 text-stone-500">
                                        <span>Code:</span>
                                        <span>{groupedOrders[id][0]?.code_order || "Không có mã"}</span>
                                    </div>
                                    <div className="flex space-x-2">
                                        <span
                                            className={`rounded text-sm text-white ${getStatusColor(groupedOrders[Number(id)][0].orderStatus)}`}
                                        >
                                            {groupedOrders[Number(id)][0].orderStatus}
                                        </span>
                                    </div>
                                </div>
                                <hr className="mb-2" />

                                {/* Render products within each group */}
                                {groupedOrders[Number(id)].map((item, index) => (
                                    <div key={index} className="flex mb-2">
                                        <img src={item.imageUrl} alt="Product Image" className="w-20 h-20 object-cover mr-4" />
                                        <div className="flex-1">
                                            <p className="text-gray-800">{item.product_name}</p>
                                            <div className="text-sm text-gray-500">Sl:x{item.quantity}</div>
                                        </div>
                                        {groupedOrders[Number(id)][0].orderStatus === "Đã nhận hàng" && (
                                            <button
                                                onClick={() => openComment(item.id_product)}
                                                className="px-4 xl:block py-2 h-10 text-gray-700 rounded border-2 hover:bg-gray-100 sm:px-2 sm:text-xs sm:h-auto md:px-3 md:text-sm"
                                            >
                                                Đánh Giá
                                            </button>
                                        )}
                                    </div>
                                ))}

                                <hr className="my-2" />
                                <div>
                                    <div className="flex justify-end">
                                        <p className="mr-2">Thành tiền:</p>
                                        <p className="text-xl text-red-600">
                                            {formatPrice(groupedOrders[Number(id)].reduce((total, item) => item.total_amount, 0))}
                                        </p>
                                    </div>
                                    <div className="flex space-x-2 mt-2 justify-end text-[15px]">
                                        {/* Render single "Chi tiết" button for the entire group */}
                                        <button
                                            onClick={() => openOderDetail(Number(id))}
                                            className="px-4 py-2 text-gray-700 rounded border-2 hover:bg-gray-100"
                                        >
                                            Chi tiết
                                        </button>
                                        {getStatusButton(groupedOrders[Number(id)][0].orderStatus, id, groupedOrders[Number(id)][0].vn_payId)}

                                    </div>
                                </div>
                            </div>
                        )))}

                    {/* Phân trang */}
                    {/* <div className="absolute bottom-0 flex w-full justify-center p-4 shadow-lg">
                       
                        <button
                            className="mx-1 rounded-md text-gray-700 hover:bg-yellow-300"
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            <ChevronLeft strokeWidth={0.5} />
                        </button>
                        <span className="p-2 opacity-60">{`${currentPage} / ${totalPages}`}</span>
                        <button
                            className="mx-1 rounded-md text-gray-700 hover:bg-yellow-300"
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        >
                            <ChevronRight strokeWidth={0.5} />
                        </button>
                    </div> */}
                </div>
                <CancelMyOrder
                    isVisible={isModalVisible}
                    onConfirm={confirmCancelOrder}
                    onCancel={() => setModalVisible(false)}
                />
                <Comment
                    isVisible={isModalComment}
                    onConfirm={confirmCancelOrder}
                    onCancel={() => setModalComment(false)}
                    productId={selectedProductId}
                />
                <ModalOrderDetail
                    openDetailOrder={openDetailOrder}
                    closeOderDetail={closeOderDetail}
                    OrderIdDetail={OrderIdDetail}

                />
            </div>
        </div>
    );
};

export default Order;
