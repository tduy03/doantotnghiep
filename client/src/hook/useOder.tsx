import axios from "axios";
import { useEffect, useState } from "react";
import { OderProducts, OderTotal, Order } from "../interfaces/oder";
import { useLoading } from "../context/Loading";
import { toast } from "react-toastify";
import { useLocation, useParams } from "react-router-dom";
import { useCart } from "../context/Cart";
// import ConfirmModal from "../components/ConfirmModal"; // Đảm bảo đường dẫn đúng tới component modal
interface DataType {
    id: string;
    order_id: string;
    product_name: string;
    image: string;
    quantity: number;
    price: number;
    orderStatus: string;
}
export const useOder = () => {
    const { fetchCartItems } = useCart();
    const [oders, serOders] = useState<OderProducts[]>([]);
    const [total, serTotal] = useState<OderTotal>();
    const { loading, setLoading } = useLoading();
    const [apply, setApply] = useState();
    const [myOrder, setMyOrder] = useState<DataType[]>([]);
    const [isThankPayment, setThankPayment] = useState(false);
    const [modalIcon1, setModalIcon1] = useState("loading");
    const [search, setSearch] = useState();
    const getAllOder = async () => {
        try {
            setLoading(true);
            const resposive = await axios.get("/api/donhangs/create");
            serOders(resposive.data.cart);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getAllOder();
    }, []);

    const getTotal = async () => {
        try {
            setLoading(true);
            const resposive = await axios.get("/api/donhangs/create");
            serTotal(resposive.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getTotal();
    }, []);

    const promotion_id = localStorage.getItem("promotion_id");
    if (promotion_id == undefined) {
        promotion_id == null;
    }

    const handleSubmitOrder = async (
        info: any,
        totalPayment: number,
        shippingCost: number,
        setActiveStep: number
    ) => {
        try {
            const orderData: Order = {
                username: info.username,
                phone: info.phone,
                address: info.address,
                email: info.email,
                note: info.note,
                commodity_money: total?.subtotal || 0,
                total_amount: (total?.subtotal ?? 0) + shippingCost,
                shipping_id: info.shippingMethod,
                vnp_TxnReff: null,
                promotion_id: promotion_id,
            };
            setLoading(true);
            const response = await axios.post("/api/donhangs/store", orderData);
            // localStorage.removeItem('activeStep');
            // localStorage.removeItem('shippingInfo');
            // localStorage.removeItem('promotion_id');
            setModalIcon1("success");
            if (response.data.success) {
                localStorage.removeItem("activeStep");
                localStorage.removeItem("shippingInfo");
                localStorage.removeItem("promotion_id");
                setThankPayment(true);
                fetchCartItems()


            } else {
                toast.error(response.data.error);
            }
        } catch (error) {
            setModalIcon1("error");
            console.error("Error submitting order:", error);
        } finally {
            setLoading(false);
        }
    };
    const applyDiscount = async (value: any) => {
        try {
            await axios.post("/api/applyPromotion", value);
        } catch (error) {
            console.log(error);
        }
    };
    const getMyOrder = async () => {
        try {
            const response = await axios.get("/api/donhangs");
            setMyOrder(response.data.chitietDonHang);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getMyOrder();
    }, []);


    const searchOrder = async (search) => {
        try {
            const response = await axios.post(`/api/code_order/?q=${search}`);
            setSearch(response.data);
        } catch (error) {
            console.log(error);
        }
    }


    return {
        oders,
        total,
        handleSubmitOrder,
        loading,
        apply,
        applyDiscount,
        myOrder,
        setMyOrder,
        getMyOrder,
        isThankPayment,
        setThankPayment,
        modalIcon1,
        searchOrder,
        search
    };
};
