import axios from "axios";
import { useState } from "react";
import { useLoading } from "../context/Loading";

export const usePayment = () => {
  const { loading, setLoading } = useLoading();
  const [shippingInfo, setShippingInfo] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Xử lý thanh toán
  const handlePayment = async (orderInfo: string) => {
    if (!shippingInfo) {
      setError('Thiếu thông tin giao hàng.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { total, shippingCost } = shippingInfo;
      const totalAmount = (total?.subtotal ?? 0) + shippingCost;

      // Lưu orderInfo và amount vào localStorage
      localStorage.setItem('orderInfo', JSON.stringify(orderInfo));
      localStorage.setItem('amount', JSON.stringify(totalAmount));

      // Kiểm tra giá trị
      console.log("Total Amount:", totalAmount);
      console.log("Shipping Info:", shippingInfo);

      const response = await axios.post('http://127.0.0.1:8000/api/payment/momo', {
        orderInfo,
        amount: totalAmount,
      });

      const { payUrl } = response.data;
      window.location.href = payUrl;
    } catch (error) {
      setError('Đã xảy ra lỗi thanh toán. Vui lòng thử lại.');
      console.error('Lỗi thanh toán:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    handlePayment,
    loading,
    error,
  };
};