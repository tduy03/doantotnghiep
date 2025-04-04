import { useEffect, useState } from 'react';
import { Product } from '../interfaces/Product';
import { useSwipeable } from 'react-swipeable';
export const useProductPagination = (products: Product[]) => {
    const [startIndex, setStartIndex] = useState(0);
    const [productsPerPage, setProductsPerPage] = useState(4);

    // Điều chỉnh số sản phẩm khi thay đổi kích thước màn hình
    useEffect(() => {
        const updateProductsPerPage = () => {
            if (window.innerWidth <= 768) {
                // Di động
                setProductsPerPage(2);
            } else if (window.innerWidth <= 1024) {
                // Tablet
                setProductsPerPage(3);
            } else {
                // Desktop
                setProductsPerPage(4);
            }
        };

        window.addEventListener('resize', updateProductsPerPage);
        updateProductsPerPage();

        return () => {
            window.removeEventListener('resize', updateProductsPerPage);
        };
    }, []);
    const currentProducts = [...products, ...products].slice(
        startIndex,
        startIndex + productsPerPage,
    );

    const handleNext = () => {
        setStartIndex((prevIndex) => {
            return (prevIndex + 1) % products.length;
        });
    };

    const handlePrev = () => {
        setStartIndex((prevIndex) => {
            return (prevIndex - 1 + products.length) % products.length;
        });
    };

    return { currentProducts, handleNext, handlePrev };
};
export const useProductSwipe = (handleNext: () => void, handlePrev: () => void) => {
    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => {
            console.log('Swiped left'); // Debug log
            handleNext();
        },
        onSwipedRight: () => {
            console.log('Swiped right'); // Debug log
            handlePrev();
        },
        trackMouse: true, // Bật theo dõi chuột cho sự kiện vuốt trên desktop
    });

    return swipeHandlers;
};