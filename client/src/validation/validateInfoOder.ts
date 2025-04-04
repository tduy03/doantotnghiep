export const validateShippingInfo = (shippingInfo: {
    username: string;
    address: string;
    email: string;
    phone: string;
    shippingMethod: string;
}): { [key: string]: string | null } => {
    const { username, address, email, phone, shippingMethod } = shippingInfo;
    const errors: { [key: string]: string | null } = {};

    // Kiểm tra các trường thông tin bắt buộc
    if (!username) {
        errors.username = "Vui lòng điền họ và tên.";
    }
    if (!address) {
        errors.address = "Vui lòng điền địa chỉ.";
    }
    if (!email) {
        errors.email = "Vui lòng điền email.";
    }
    if (!phone) {
        errors.phone = "Vui lòng điền số điện thoại.";
    }
    if (!shippingMethod) {
        errors.shippingMethod = "Vui lòng chọn phương thức vận chuyển.";
    }


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
        errors.email = "Email không hợp lệ.";
    }


    const phoneRegex = /^[0-9]{10,15}$/;
    if (phone && !phoneRegex.test(phone)) {
        errors.phone = "Số điện thoại không hợp lệ.";
    }

    return errors; // Trả về lỗi cho từng trường
};
