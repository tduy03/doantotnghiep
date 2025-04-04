import React, { useState, useEffect } from 'react';
import { faCheck, faSpinner, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

interface ConfirmModalProps {
    isVisible: boolean;
    onCancel: () => void;
    modalIcon1: 'loading' | 'success' | 'error';
}

const ThankPayMentOder: React.FC<ConfirmModalProps> = ({ isVisible, modalIcon1, onCancel }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (isVisible) {
            // Simulate loading process
            const timer = setTimeout(() => setIsLoading(false), 4000);
            return () => clearTimeout(timer); // Cleanup on unmount
        }
    }, [isVisible]);

    if (!isVisible) return null;

    const getIcon = () => {
        if (modalIcon1 === "loading") {
            return <FontAwesomeIcon icon={faSpinner} className="text-green-500 text-3xl animate-spin" />;
        }
        if (modalIcon1 === "success") {
            return <FontAwesomeIcon icon={faCheck} className="text-green-500 text-3xl animate-bounce" />;
        }
        return <FontAwesomeIcon icon={faX} className="text-red-500 text-3xl" />;
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
            <div className="flex flex-col items-center justify-center h-[600px] w-[900px] bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-white p-6 w-2/3 sm:w-1/2 lg:w-2/3 text-center">
                    {/* <X onClick={onCancel} className='absolute top-20 right-[350px]' /> */}
                    <div className="bg-green-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                        {getIcon()}
                    </div>
                    {modalIcon1 === "loading" ? (
                        <h2 className="text-2xl font-bold text-blue-800 mb-2">Đang thanh toán...</h2>
                    ) : modalIcon1 === "success" ? (
                        <h2 className="text-2xl font-bold text-blue-800 mb-2">Đặt hàng thành công!</h2>
                    ) : (
                        <h2 className="text-2xl font-bold text-red-800 mb-2">Thanh toán thất bại!</h2>
                    )}
                    <p className="text-lg text-gray-700 mb-6">
                        Cảm ơn bạn đã đặt hàng, bộ phận chăm sóc khách hàng sẽ liên hệ với bạn trong vòng 24h để xác nhận, hãy để ý điện thoại bạn nhé!
                    </p>
                    <div className="flex justify-center gap-4">
                        {modalIcon1 === "loading" ? (
                            <div></div>
                        ) : modalIcon1 === "success" ? (
                            <>
                                <Link to="/" className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-400 transition duration-200">
                                    Quay về trang chủ
                                </Link>
                                <Link to="/profile/order" className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition duration-200">
                                    Đơn hàng của bạn
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to="/" className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-400 transition duration-200">
                                    Quay về trang chủ
                                </Link>
                                <Link to="/profile/order" className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition duration-200">
                                    Đơn hàng của bạn
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThankPayMentOder;
