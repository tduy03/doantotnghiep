import React from 'react';

interface ConfirmModalProps {
    isVisible: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

const CancelMyOrder: React.FC<ConfirmModalProps> = ({ isVisible, onConfirm, onCancel }) => {
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
            <div className={`bg-white p-6 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>

                <h2 className="text-lg font-semibold">Hủy đơn hàng</h2>
                <p className="mt-2">Bạn có chắc chắn hủy đơn hàng không ?</p>
                <div className="mt-4 flex justify-end">
                    <button onClick={onCancel} className="mr-2 px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition">Hủy</button>
                    <button onClick={onConfirm} className="px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-200 transition">Xác nhận</button>
                </div>
            </div>
        </div>
    );
};

export default CancelMyOrder;
