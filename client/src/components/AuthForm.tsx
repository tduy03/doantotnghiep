import React from 'react'
import { useForm } from 'react-hook-form';
import { UserInput } from '../interfaces/auth';

type AuthFormProps = {
    onSubmit: (data: UserInput) => void
}
const AuthForm = ({ onSubmit }: AuthFormProps) => {
    const { handleSubmit, register } = useForm<UserInput>();


    return (

        <form onSubmit={handleSubmit(onSubmit)} >

            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    type="email"
                    id="email"
                    {...register('email')}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                />

            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mật khẩu</label>
                <input
                    type="password"


                    {...register('password')}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                />

            </div>

            <button
                type="submit"
                className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Đăng Ký
            </button>
        </form>
    )
}

export default AuthForm