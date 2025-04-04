import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Account, User } from '../interfaces/User';
import { useNavigate } from 'react-router-dom';

const useAccountUpdate = () => {
    const nav = useNavigate();
    const [user, setUser] = useState<Account>({
        id: '',
        name: '',
        email: '',
        phone: '',
        address: ''
    });

    // Lấy thông tin tài khoản hiện tại
    useEffect(() => {
        axios.get('/api/user', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            const { name, email, phone, address } = response.data;
            setUser({ id: response.data.id, name, email, phone, address });
        })
        .catch(err => console.error(err));
    }, []);

    // Hàm xử lý thay đổi input
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Hàm cập nhật tài khoản
    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Gửi dữ liệu cập nhật tài khoản
            const response = await axios.put(`/api/userEdit/${user.id}`, user, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.status === 200) {
                toast.success('Cập nhật thành công');
                nav('/');
            } else {
                toast.error('Cập nhật không thành công');
            }
        } catch (err) {
            toast.error('Cập nhật không thành công');
            console.error(err);
        }
    };

    return {
        user,
        handleChange,
        handleUpdate
    };
};

export default useAccountUpdate;
