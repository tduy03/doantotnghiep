import axios, { AxiosError } from 'axios';
import { CommentInput, ContactsInput, UserInput } from '../interfaces/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState } from 'react';


export const UseAuth = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const Register = async (value: UserInput) => {
        try {
            const { data } = await axios.post('/api/register', value)
            setMessage(data.message);
            toast.success(data.message);
            navigate('/login')

        } catch (message) {
            toast.error(( message as AxiosError)?.message);

        }
    };

   const Login = async (value: UserInput) => {
        try {
            const { data } = await axios.post('/api/login', value)
            localStorage.setItem('token', data.token)
            localStorage.setItem('user', JSON.stringify(data.user))
            console.log(data);
            navigate('/')
            toast.success("Đăng nhập thành công")
        } catch (error) {
            console.error(error); // Log lỗi để dễ dàng gỡ lỗi
            toast.error("Lỗi đăng nhập");
        }
    };
    const Comment = async ( value: CommentInput) => {
        try {
            const { data } = await axios.post('/api/comment/add', value)
            setMessage(data.message);
            toast.success(data.message);  // Hiển thị thông qua toast
            // console.log(data);
        } catch (message) {
            toast.error(( message as AxiosError)?.message);
        }
    }
    
    const Contacts = async (value: ContactsInput)=>{
        try {
            const { data } = await axios.post('/api/contas', value)
            setMessage(data.message);
            toast.success(data.message);
            navigate('/')
            console.log(data);
            
        } catch (error) {
            toast.error((error as AxiosError)?.message);
        }
    }

    return { Register, Login, Comment, Contacts };
};