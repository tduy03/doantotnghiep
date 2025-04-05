import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import ConfirmModal from "../../../modalConfirm/ThankPayMent";

interface PaymentFormProps {
  paymentMethod: string;
  setPaymentMethod: (value: string) => void;
  totalPayment: number;
  handleNext: () => void;  // Không cần giá trị "value" nữa
  // Nhận tổng tiền thanh toán từ Checkout

}

const PaymentForm: React.FC<PaymentFormProps> = ({
  setPaymentMethod,
  totalPayment,
  handleNext, shippingInfoo, total, shippingCost, handleSubmitOrder, setIsConfirmOrder
}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const showModal = () => {
    setModalVisible(true);
  };

  // Hàm để đóng modal khi người dùng hủy
  const handleCancel = () => {
    setModalVisible(false);
  };

  // Hàm để xác nhận và gọi handleSubmitOrder
  const handleConfirm = () => {
    setModalVisible(false);
    handleSubmitOrder(shippingInfoo, total, shippingCost, totalPayment, setIsConfirmOrder);
  };
  console.log(totalPayment);

  const [selectedOption, setSelectedOption] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [cartQuantity, setCartQuantity] = useState([]);
  const [productQuantity, setProductQuantity] = useState([]);
  const [tensanpham, settensanpham] = useState("");
  const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedMethod = event.target.value;
    setPaymentMethod(selectedMethod);
  };
  useEffect(() => {
    const fetchCartQuantity = async () => {
      try {
        const responseCart = await axios.get("/api/cart");
        // console.log(responseCart.data.cart);

        const soluongtong = responseCart.data.cart.map(item => item.product_detail.quantity); // Số lượng có sẵn
        const soluongcart = responseCart.data.cart.map(item => item.quantity); // Số lượng trong giỏ
        const tensanpham = responseCart.data.cart.map(item => item.NameProduct); // Tên sản phẩm

        // Lưu vào state
        setCartQuantity(soluongcart);
        setProductQuantity(soluongtong);
        settensanpham(tensanpham);

        // console.log(soluongtong); // In số lượng có sẵn
        // console.log(soluongcart); // In số lượng trong giỏ

      } catch (error) {
        toast.error("Không thể lấy số lượng giỏ hàng.");
      }
    };
    fetchCartQuantity();
  }, []);

  const handlePayment = async () => {
    if (isNaN(totalPayment) || totalPayment <= 0) {
      toast.error("Tổng tiền thanh toán không hợp lệ.");
      return;
    }
    for (let i = 0; i < cartQuantity.length; i++) {
      if (cartQuantity[i] > productQuantity[i]) {
        toast.error(`Không đủ số lượng sản phẩm "${tensanpham[i]}".`);
        return; // Nếu có sản phẩm không đủ số lượng thì dừng việc thanh toán
      }
    }
    try {
      let response;
      if (selectedOption === "momo") {
        response = await axios.post("http://127.0.0.1:8000/api/payment/momo", {
          orderInfo: "Thông tin đơn hàng",
          amount: totalPayment,
        });
      } else if (selectedOption === "vnpay") {
        response = await axios.post("http://127.0.0.1:8000/api/vnpay/payment", {
          orderInfo: "Thông tin đơn hàng",
          amount: totalPayment,
        });
      }

      const payUrl = response?.data?.payUrl || response?.data?.data;
      if (payUrl) {
        window.location.href = payUrl;
      } else {
        toast.error("URL thanh toán không được trả về.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại.");
    }
  };
  const handleStepChange = () => {
    if (selectedOption === "cod") {
      handleNext(); // Thực hiện chuyển bước tiếp theo
    }
  };
  return (
    <div className="mt-4 bg-white rounded-md max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">Thanh toán</h2>
      <p className="text-sm text-gray-500 mb-4">Toàn bộ các giao dịch được bảo mật và mã hóa.</p>

      {/* Error message */}
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

      {/* Option 1: Momo */}
      <div
        onClick={() => setSelectedOption("momo")}
        className={`border rounded-lg p-4 mb-4 cursor-pointer ${selectedOption === "momo" ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              name="payment"
              checked={selectedOption === "momo"}
              readOnly
              className="form-radio h-5 w-5 text-blue-600"
              value="Momo"
            />
            <span className="font-semibold">Momo</span>
          </div>
          <div className="flex space-x-1">
            <img src="https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.vi/assets/visa.sxIq5Dot.svg" alt="Visa" className="w-6 h-6" />
            <img src="https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.vi/assets/master.CzeoQWmc.svg" alt="MasterCard" className="w-6 h-6" />
          </div>
        </div>
        <div className={`overflow-hidden transition-all duration-300 ${selectedOption === "momo" ? "max-h-96" : "max-h-0"}`}>
          <div className="mt-4 text-sm text-gray-600">
            <div className=' w-80 h-auto m-auto mb-5'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="-252.3 356.1 163 80.9" className="zjrzY"><path fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1" d="M-108.9 404.1v30c0 1.1-.9 2-2 2H-231c-1.1 0-2-.9-2-2v-75c0-1.1.9-2 2-2h120.1c1.1 0 2 .9 2 2v37m-124.1-29h124.1"></path><circle cx="-227.8" cy="361.9" r="1.8" fill="currentColor"></circle><circle cx="-222.2" cy="361.9" r="1.8" fill="currentColor"></circle><circle cx="-216.6" cy="361.9" r="1.8" fill="currentColor"></circle><path fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="2" d="M-128.7 400.1H-92m-3.6-4.1 4 4.1-4 4.1"></path></svg>
            </div>
            <p>Sau khi nhấp vào “Thanh toán ngay”, bạn sẽ được chuyển hướng đến Mua trước trả sau qua Momo để hoàn tất việc mua hàng một cách an toàn.</p>
          </div>
        </div>
      </div>

      {/* Option 2: VNPAY */}
      <div
        onClick={() => setSelectedOption("vnpay")}
        className={`border rounded-lg p-4 mb-4 cursor-pointer ${selectedOption === "vnpay" ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              name="payment"
              checked={selectedOption === "vnpay"}
              readOnly
              className="form-radio h-5 w-5 text-blue-600"
              value="VNPAY"
            />
            <span className="font-semibold">VNPAY</span>
          </div>
          <div className="flex space-x-1">
            <img src="https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.vi/assets/visa.sxIq5Dot.svg" alt="Visa" className="w-6 h-6" />
            <img src="https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.vi/assets/master.CzeoQWmc.svg" alt="MasterCard" className="w-6 h-6" />
          </div>
        </div>
        <div className={`overflow-hidden transition-all duration-300 ${selectedOption === "vnpay" ? "max-h-96" : "max-h-0"}`}>
          <div className="mt-4 text-sm text-gray-600">
            <div className=' w-80 h-auto m-auto mb-5'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="-252.3 356.1 163 80.9" className="zjrzY"><path fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1" d="M-108.9 404.1v30c0 1.1-.9 2-2 2H-231c-1.1 0-2-.9-2-2v-75c0-1.1.9-2 2-2h120.1c1.1 0 2 .9 2 2v37m-124.1-29h124.1"></path><circle cx="-227.8" cy="361.9" r="1.8" fill="currentColor"></circle><circle cx="-222.2" cy="361.9" r="1.8" fill="currentColor"></circle><circle cx="-216.6" cy="361.9" r="1.8" fill="currentColor"></circle><path fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="2" d="M-128.7 400.1H-92m-3.6-4.1 4 4.1-4 4.1"></path></svg>
            </div>
            <p>Sau khi nhấp vào “Thanh toán ngay”, bạn sẽ được chuyển hướng đến Mua trước trả sau qua VNPAY để hoàn tất việc mua hàng một cách an toàn.</p><p className="text-red-500 text-lg">Lưu ý nếu thanh toán online sẽ không thể hủy đơn hàng. </p>
          </div>
        </div>
      </div>

      {/* Option 3: COD */}
      <div
        onClick={() => setSelectedOption("cod")}
        className={`border rounded-lg p-4 mb-4 cursor-pointer ${selectedOption === "cod" ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              name="payment"
              checked={selectedOption === "cod"}
              readOnly
              className="form-radio h-5 w-5 text-blue-600"
            />
            <span className="font-semibold">Thanh toán khi nhận hàng (COD)</span>
          </div>
        </div>
        <div className={`overflow-hidden transition-all duration-300 ${selectedOption === "cod" ? "max-h-40" : "max-h-0"}`}>
          <div className="mt-4 text-sm text-gray-600">
            <p>Nhận, kiểm tra rồi thanh toán</p>
          </div>
        </div>
      </div>

      {/* Payment Button */}
      <div>
        {/* Nút Thanh toán cho momo hoặc vnpay */}
        {(selectedOption === "momo" || selectedOption === "vnpay") && (
          <button
            onClick={handlePayment}
            className="mt-4 w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-400 transition duration-200"
          >
            Thanh toán
          </button>
        )}

        {/* Nút Tiếp theo cho cod */}
        {selectedOption === "cod" && (
          <div>
            <button
              onClick={showModal}
              className="mt-4 w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-400 transition duration-200"
            >
              Tiếp theo
            </button>

            {/* Modal xác nhận */}
            <ConfirmModal isVisible={isModalVisible} onCancel={handleCancel} onConfirm={handleConfirm} />
          </div>
        )}
      </div>

    </div>
  );
};

export default PaymentForm;
