import React, { createContext, useContext, useState, ReactNode } from 'react';

// Định nghĩa kiểu dữ liệu cho context
interface ShipContextType {
    shippingCost: number;
    setShippingCost: (value: number) => void;
}

// Tạo context
const ShipContext = createContext<ShipContextType | undefined>(undefined);

// Tạo Provider để bao bọc ứng dụng
export const ShipProvider = ({ children }: { children: ReactNode }) => {
    const [shippingCost, setShippingCost] = useState<number>(0); // Giá trị mặc định

    return (
        <ShipContext.Provider value={{ shippingCost, setShippingCost }}>
            {children}
        </ShipContext.Provider>
    );
};

// Hook để sử dụng context
export const useShipContext = () => {
    const context = useContext(ShipContext);
    if (!context) {
        throw new Error('useShipContext must be used within a ShipProvider');
    }
    return context;
};
