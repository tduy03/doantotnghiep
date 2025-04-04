import React, { useEffect, useState } from "react";
import { usePromotion } from "../../hook/usePromotion";
type VoucherProps = {
    handleCloseVoucher: () => void;
    openVoucher: boolean;
    promotions: Promotion[];
};
interface Promotion {
    id: string;
    code: string;
    discount: number;
    discount_type: string;
    minimum_spend: number;
    start_date: Date;
    end_date: Date;
    usage_limit: string;
}
const ModalVoucher = ({
    handleCloseVoucher,
    openVoucher,
    promotions,
}: VoucherProps) => {
    const { addPromotion } = usePromotion();
    const [isAnimation, setIsAnimation] = useState(false);
    useEffect(() => {
        if (openVoucher) {
            setTimeout(() => {
                setIsAnimation(true);
            }, 100); // Delay để đảm bảo hiệu ứng mở diễn ra mượt mà
        } else {
            setIsAnimation(false);
        }
    }, [openVoucher]);
    const formatPrice = (price) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
            minimumFractionDigits: 0,
        }).format(price);
    };
    const handleAddPromotion = (id: string) => {
        addPromotion(id);
    };
    return (
        <>
            {openVoucher && (
                <div
                    onClick={handleCloseVoucher}
                    className={`fixed inset-0 top-0 lg:flex lg:items-center lg:justify-center z-50 h-screen w-screen bg-black bg-opacity-50 backdrop-blur-sm transition-all duration-700 ease-in-out ${isAnimation ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
                >
                    <div className=" absolute top-1/3 lg:top-auto h-2/3 w-screen bg-white p-6 lg:h-auto max-h-[90%]  lg:w-auto rounded-lg">
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="w-[500px] h-full lg:p-5 "
                        >
                            <h1 className="text-center text-2xl mb-3">Voucher và khuyến mãi</h1>
                            {promotions.map((item) => (
                                <div
                                    key={item.id}
                                    className="mt-2 flex items-center justify-between rounded-lg bg-yellow-100 p-2 px-5 "
                                >
                                    <div>
                                        <div>Giảm {formatPrice(item.discount)}</div>
                                        <p className="text-[14px] opacity-50">
                                            Hết hạn sau:
                                            {new Date(item.end_date).toLocaleDateString("vi-VN")}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => handleAddPromotion(item.id)}
                                        className="rounded-lg bg-red-500 px-3 py-1 text-[13px] text-white"
                                    >
                                        Nhận
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ModalVoucher;
