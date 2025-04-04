import React from 'react';
import { Typography } from '@mui/material';
import { Order } from '../../../interfaces/oder';

interface ConfirmationProps {
    shippingInfo: Omit<Order, 'commodity_money' | 'total_amount' | 'shipping_id' | 'code_order'> & {
        shippingMethod: string;
    };
    paymentMethod: string;
    shippings: { id: number; name: string; cost: number }[];
}

const Confirmation: React.FC<ConfirmationProps> = ({ shippingInfo, shippings }) => {
    const shippingId = parseInt(shippingInfo.shippingMethod, 10); // Chuyển đổi thành number
    const selectedShipping = shippings.find(shipp => shipp.id === shippingId);

    return (
        <div className='ml-9'>
            <p className='my-3 text-lg font-bold ml-3' >Xác nhận thông tin</p>
            <p className='my-2 text-lg ml-3'><strong>Họ và tên:</strong> {shippingInfo.username}</p>
            <p className='my-2 text-lg ml-3'><strong>Địa chỉ:</strong> {shippingInfo.address}</p>
            <p className='my-2 text-lg ml-3'><strong>Email:</strong> {shippingInfo.email}</p>
            <p className='my-2 text-lg ml-3'><strong>Số điện thoại:</strong> {shippingInfo.phone}</p>
            <p className='my-2 text-lg ml-3'><strong>Ghi chú:</strong> {shippingInfo.note}</p>
            <p className='my-2 text-lg ml-3'><strong>Phương thức vận chuyển:</strong> {selectedShipping ? selectedShipping.name : 'Chưa chọn'}</p>

        </div>
    );
};


export default Confirmation;
