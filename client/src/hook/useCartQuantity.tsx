import { useState } from "react";
import axios from "axios";
import { Cart_detail } from "../interfaces/Cart"; // Assuming this interface already exists

export const useQuantity = () => {
    const [error, setError] = useState<string | null>(null);

    const updateQuantityInDB = async (id: number, quantity: number) => {
        try {
            await axios.put(`/api/cart/${id}/update`, { quantity });
        } catch (error) {
            console.error("Failed to update quantity", error);
            setError("Failed to update quantity in the database.");
        }
    };

    const increaseQuantity = (item: Cart_detail, setProductCart: React.Dispatch<React.SetStateAction<Cart_detail[]>>) => {
        const newQuantity = item.quantity + 1;
        updateQuantityInDB(item.id, newQuantity);
        // Update local cart state
        setProductCart((prevCart) =>
            prevCart.map((cartItem) =>
                cartItem.id === item.id ? { ...cartItem, quantity: newQuantity } : cartItem
            )
        );
    };

    const decreaseQuantity = (item: Cart_detail, setProductCart: React.Dispatch<React.SetStateAction<Cart_detail[]>>) => {
        if (item.quantity > 1) {
            const newQuantity = item.quantity - 1;
            updateQuantityInDB(item.id, newQuantity);
            // Update local cart state
            setProductCart((prevCart) =>
                prevCart.map((cartItem) =>
                    cartItem.id === item.id ? { ...cartItem, quantity: newQuantity } : cartItem
                )
            );
        }
    };

    return { increaseQuantity, decreaseQuantity, error };
};
