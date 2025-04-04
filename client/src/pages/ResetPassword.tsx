import React, { useState } from "react";
// import { useForm } from "react-hook-form";
import img from "../public/images/imglogin.jpg";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import modern from "../public/images/modern.png";


const ResetPassword = () => {
    const [password, setpassword] = useState('');
    const { token } = useParams();
    const nav = useNavigate()
    // console.log(token);

    const handleChange = (e) => {
        setpassword(e.target.value);
    };
    console.log(setpassword);

    const handleSend = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`/api/reset_password/${token}`, {
                password: password,
            });


            if (response.data.message) {
                toast.success(response.data.message)
                nav('/login')
            } else {

            }
        } catch (error) {
            console.error('Error during request:', error);

        }
    };

    return (
        <div className="xl:flex xl:justify-center  py-10   bgr ">
            <div className="xl:h-[600px] xl:w-[1000px] ">
                <div className="flex md:mx-[100px]  xl:mx-[10px] xl:h-full xl:w-full items-center rounded-lg bg-white shadow-2xl mx-3 ">
                    {/* Left Image Section */}
                    <div className="hidden xl:flex w-1/2 items-center justify-center bg-white ">
                        <img
                            src={img}
                            alt="Illustration"
                            className="object-cover"
                            style={{ width: "350px", height: "200px" }}
                        />
                    </div>

                    {/* Form Section */}

                    <div className="p-10 w-full h-full xl:w-[400px]  xl:h-auto rounded-lg  overflow-hidden ">
                        <div className="mb-3 flex items-center justify-center text-center">
                            <div className=" flex flex-col ">
                                <img src={modern} alt="" className="w-28 xl:w-44 " />
                                {/* <span className=" text-xl xl:text-3xl font-bold uppercase">odern  </span>
              <p className=" uppercase">men</p> */}
                            </div>
                        </div>
                        <h2 className="mb-2 text-center text-sm  xl:text-[22px] font-semibold text-gray-800">
                            Quên mật khẩu
                        </h2>
                        <p className=" px-10 xl:px-2 mb-2 xl:mb-6 animate-bounce-bottom text-center text-xs  xl:text-base ">
                            Trải nghiệm mua hàng thật tốt với Modern men.
                        </p>
                        <div className="md:flex md:justify-center xl:block ">

                            <form>
                                <div className="mb-6">
                                    <label className="mb-1 block text-gray-600 text-sm xl:text-base" htmlFor="email">
                                        Mật khẩu
                                    </label>
                                    <input
                                        type="password"
                                        onChange={handleChange} value={password}
                                        className="w-full md:w-[400px] xl:w-full text-sm  rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                       
                                    // {...register("password", { required: "Mật khẩu là bắt buộc" })}
                                    />
                                    {/* {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {String(errors.password.message)}
                </p>
              )} */}
                                </div>
                                <div className="mb-4">
                                    <button
                                        type="submit"
                                        onClick={handleSend}
                                        className="w-full rounded-md bg-yellow-400 px-4 py-2 font-semibold text-white hover:bg-yellow-500"
                                    >
                                        Gửi
                                    </button>
                                </div>

                                {/* Login Link */}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;