import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAccountUpdate from '../../hook/useAccountUpdate';

const AccountUpdate = () => {
    const { user, handleChange, handleUpdate } = useAccountUpdate();

    const validateForm = () => {
        if (!user.name || !user.email || !user.phone || !user.address) {
            toast.error('Vui lòng điền đầy đủ thông tin vào tất cả các trường');
            return false;
        }
        return true;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            handleUpdate(e);
        }
    };

    return (

        <div className='col-span-4'>
            <div className=' bg-white ml-3 rounded-lg border-2 p-6 flex flex-col items-center'>
                <h2 className='text-2xl font-semibold text-center'>Cập nhật tài khoản</h2>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-1/2 mx-auto mt-4 p-4'>
                    <div>
                        <label>Tên:</label>
                        <input
                            type="text"
                            name="name"

                            className='w-full p-2 border border-gray-300 rounded-md'
                            value={user.name ?? ""}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"

                            className='w-full p-2 border border-gray-300 rounded-md'
                            value={user.email ?? ""}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Số điện thoại:</label>
                        <input
                            type="text"
                            name="phone"

                            className='w-full p-2 border border-gray-300 rounded-md'
                            value={user.phone ?? ""}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Địa chỉ:</label>
                        <input
                            type="text"
                            name="address"

                            className='w-full p-2 border border-gray-300 rounded-md'
                            value={user.address ?? ""}
                            onChange={handleChange}
                        /></div>
                    <button className='bg-yellow-300 text-white px-4 py-2 rounded' type="submit">Cập nhật</button>
                </form>
            </div>

        </div>
    );
};

export default AccountUpdate;