import React, { useState } from 'react';

interface ConfirmModalProps {
    isVisible: boolean;
    onCancel: () => void;
    onConfirm: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isVisible, onCancel, onConfirm }) => {
    if (!isVisible) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold">Bạn có chắc chắn muốn tiếp tục?</h2>
                <div className="mt-4 flex justify-center">
                    <button
                        onClick={onCancel}
                        className="mr-2 px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-400 transition"
                    >
                        Xác nhận
                    </button>
                </div>
            </div>
        </div>
    );
};
export default ConfirmModal