import { useState, useEffect } from 'react';
import { Product } from '../interfaces/Product';// Interface Product
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const useFavorites = () => {
    const [userId, setUserId] = useState<number | null>(null);
    const [favorites, setFavorites] = useState<Product[]>([]);
    const navigate = useNavigate()
    const [message, setMessage] = useState('')
    // Lấy danh sách sản phẩm yêu thích từ API Laravel khi component được mount

    const checkUser = localStorage.getItem('user');

    useEffect(() => {
        if (checkUser) {
            try {
                const userID = JSON.parse(checkUser);
                if (userID && userID.id) {
                    setUserId(userID.id);
                }
            } catch (error) {
                console.error("Failed to parse the token:", error);
            }
        }
    }, [checkUser]);
    const fetchFavorites = async () => {
        if (userId === null) {

            return;
        }

        try {
            const response = await axios.post('/api/wishlist', { user_id: userId });
            setFavorites(response.data);
        } catch (error) {
            console.error('Error fetching favorites:', error);
        }
    };


    useEffect(() => {
        if (userId !== null) {
            fetchFavorites();
        }
    }, [userId]);  // Fetch favorites when userId is updated


    const addToFavorites = async (productId: string) => {
        try {
            const responAdd = await axios.post('/api/wishlist/add', { product_id: productId, user_id: userId });
            // const response = await axios.post('/api/wishlist', { user_id: userId });
            // setFavorites(response.data);
            // console.log(responAdd);

            if (responAdd.data.message) {
                toast.success(responAdd.data.message);

            } else {
                toast.warning(responAdd.data.error);
            }
            // navigate('/wishlist');
        } catch (error: any) {
            if (error.response?.status === 409) {
                toast.warning('Sản phẩm đã có trong danh sách yêu thích!');
            } else {
                toast.error((error as AxiosError)?.message);

            }
        }
    };

    // Xóa sản phẩm khỏi danh sách yêu thích
    const removeFromFavorites = async (productId: string) => {
        try {
            await axios.delete(`/api/wishlist/remove/${productId}`);
            // Cập nhật danh sách yêu thích sau khi xóa
            const updatedFavorites = favorites.filter(product => product.id !== productId);
            setFavorites(updatedFavorites);
        } catch (error) {
            console.error('Lỗi khi xóa sản phẩm khỏi yêu thích:', error);
        }
    };
    return {
        favorites,
        addToFavorites,
        removeFromFavorites
    };
};

export default useFavorites;