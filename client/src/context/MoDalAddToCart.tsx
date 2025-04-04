// LoadingContext.tsx
import React, { createContext, useState, ReactNode, useContext } from 'react';

interface ModalAddCartContextProps {
    isOpenModalAddToCart: boolean;
    setIsOpenModalAddToCart: (loading: boolean) => void;
}

const ModalAddCartContext = createContext<ModalAddCartContextProps | undefined>(undefined);

export const ModalAddCartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isOpenModalAddToCart, setIsOpenModalAddToCart] = useState(false);

    return (
        <ModalAddCartContext.Provider value={{ isOpenModalAddToCart, setIsOpenModalAddToCart }}>
            {children}
        </ModalAddCartContext.Provider>
    );
};

export const useModalAddCartProvider = (): ModalAddCartContextProps => {
    const context = useContext(ModalAddCartContext);
    if (context === undefined) {
        throw new Error('useLoading must be used within a LoadingProvider');
    }
    return context;
};
