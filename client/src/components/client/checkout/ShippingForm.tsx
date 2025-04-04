import React from 'react';
import { TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Alert } from '@mui/material';
import { useShipping } from '../../../hook/useShipping';
import { Order } from '../../../interfaces/oder';

interface ShippingFormProps {
    shippingInfo: Omit<Order, 'commodity_money' | 'total_amount' | 'shipping_id' | 'code_order'> & {
        shippingMethod: string;
    };
    handleShippingChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error: { [key: string]: string | null }; // Updated error prop to handle specific field errors
}

const ShippingForm: React.FC<ShippingFormProps> = ({
    shippingInfo,
    handleShippingChange,
    error
}) => {
    const { shippings } = useShipping();

    return (
        <div>
            <TextField
                label="Họ và tên"
                name="username"
                value={shippingInfo.username}
                onChange={handleShippingChange}
                fullWidth
                margin="normal"
                error={!!error.username} // Check if there's an error for this field
                helperText={error.username} // Display the error message for this field
            />
            <TextField
                label="Địa chỉ"
                name="address"
                value={shippingInfo.address}
                onChange={handleShippingChange}
                fullWidth
                margin="normal"
                error={!!error.address} // Check if there's an error for this field
                helperText={error.address} // Display the error message for this field
            />
            <TextField
                label="Email"
                name="email"
                value={shippingInfo.email}
                onChange={handleShippingChange}
                fullWidth
                margin="normal"
                error={!!error.email} // Check if there's an error for this field
                helperText={error.email} // Display the error message for this field
            />
            <TextField
                label="Số điện thoại"
                name="phone"
                value={shippingInfo.phone}
                onChange={handleShippingChange}
                fullWidth
                margin="normal"
                error={!!error.phone} // Check if there's an error for this field
                helperText={error.phone} // Display the error message for this field
            />
            <TextField
                label="Ghi chú"
                multiline
                rows={4}
                name="note"
                variant="outlined"
                fullWidth
                value={shippingInfo.note}
                onChange={handleShippingChange}
            />

            <FormControl component="fieldset" style={{ marginTop: '20px' }}>
                <FormLabel component="legend">Phương thức vận chuyển</FormLabel>
                <RadioGroup
                    aria-label="shipping-method"
                    name="shippingMethod"
                    value={shippingInfo.shippingMethod}
                    onChange={handleShippingChange}
                >
                    {shippings.map((shipp) => (
                        <FormControlLabel
                            key={shipp.id}
                            value={`${shipp.id}`}
                            control={<Radio />}
                            label={shipp.name}
                        />
                    ))}
                </RadioGroup>
                {error.shippingMethod && (
                    <Alert severity="error">{error.shippingMethod}</Alert> // Display error for shipping method
                )}
            </FormControl>
        </div>
    );
};

export default ShippingForm;
