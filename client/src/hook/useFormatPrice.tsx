import { useCallback } from "react";

const useFormatPrice = () => {
    const formatPrice = useCallback((price: number | undefined | null) => {
        // Default to 0 if price is null, undefined, or not a valid number
        const validPrice = price == null || isNaN(price) ? 0 : price;

        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
            minimumFractionDigits: 0,
        }).format(validPrice);
    }, []);

    return { formatPrice };
};

export default useFormatPrice;
