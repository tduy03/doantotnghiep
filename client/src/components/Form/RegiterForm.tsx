import React, { useState } from "react";
import { useForm } from "react-hook-form";
import img from "../../public/images/imglogin.jpg";
import logo from "../../public/images/logofix2.png";
import modern from "../../public/images/modern.png";
import { Eye, EyeOff } from "lucide-react";
type AuthFormProps = {
  onSubmit: (data: any) => void;
};
const RegisterForm = ({ onSubmit }: AuthFormProps) => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showCfPassword, setShowCfPassword] = useState(false);
  const password = watch("password");

  return (
    <div className="xl:h-[600px] xl:w-[1000px] ">
      <div className="flex md:mx-[100px]  xl:mx-[0px] xl:h-full xl:w-full items-center rounded-lg bg-white shadow-2xl mx-3 ">
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
        <div className="p-10 w-full h-full xl:w-[400px]  xl:h-auto rounded-lg  ">
          <div className="mb-3 flex items-center justify-center text-center">
            <div className=" flex flex-col ">
              <img src={modern} alt="" className="w-28 xl:w-44 " />
              {/* <span className=" text-xl xl:text-3xl font-bold uppercase">odern  </span>
              <p className=" uppercase">men</p> */}
            </div>
          </div>
          <h2 className="mb-2 text-center text-sm  xl:text-[22px] font-semibold text-gray-800">
            Đăng Ký
          </h2>
          <p className=" px-10 xl:px-2 mb-2 xl:mb-6 animate-bounce-bottom text-center text-xs  xl:text-base ">
            Trải nghiệm mua hàng thật tốt với Modern men.
          </p>
          <div className="md:flex md:justify-center xl:block ">
            <form onSubmit={handleSubmit(onSubmit)} >
              {/* Username Field */}
              <div className="xl:flex xl:gap-3">
                <div className="mb-4 ">
                  <label className="mb-1 block text-gray-600 text-sm xl:text-base">
                    Tên
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full md:w-[400px] xl:w-full text-sm  rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"

                    {...register("name", {
                      required: "Username là bắt buộc",
                      minLength: {
                        value: 3,
                        message: "Username không ít hơn 3 ký tự",
                      },
                    })}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">
                      {String(errors.name.message)}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div className="mb-4 xl:w-full">
                  <label className="mb-1 block text-gray-600 text-sm xl:text-base" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    className="w-full md:w-[400px] xl:w-full text-sm  rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    {...register("email", {
                      required: "Vui lòng nhập email!",
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "Email không hợp lệ!",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="mt-1 ml-2 text-xs xl:text-sm text-red-500">
                      {String(errors.email.message)}
                    </p>
                  )}
                </div>
              </div>
              {/* Password Field */}
              <div className="mb-6">
                <label
                  className="mb-1 block text-gray-600 text-sm xl:text-base"
                  htmlFor="password"
                >
                  Mật khẩu
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="w-full  md:w-[400px] xl:w-full text-sm rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"

                    {...register("password", {
                      required: "Vui lòng nhập mật khẩu!",
                      minLength: {
                        value: 8,
                        message: "Mật khẩu phải có ít nhất 8 ký tự!",
                      },
                    })}
                  />
                  {/* Nút toggle ẩn/hiện mật khẩu */}
                  <button
                    type="button"
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {/* Hiển thị lỗi nếu có */}
                {errors.password && (
                  <p className="mt-1 ml-2 text-xs xl:text-sm text-red-500">
                    {String(errors.password.message)}
                  </p>
                )}
              </div>


              {/* Confirm Password Field */}
              <div className="mt-4">
                <label htmlFor="confirmPassword" className="mb-1 block text-gray-600 text-sm xl:text-base">Nhập lại mật khẩu</label>
                <div className="relative">
                  <input
                    type={showCfPassword ? "text" : "password"}
                    id="confirmPassword"
                    {...register("confirmPassword", {
                      required: "Vui lòng xác nhận mật khẩu!",
                      validate: (value) => value === password || "Mật khẩu không khớp!",
                    })}
                    className="w-full md:w-[400px] xl:w-full text-sm  rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"

                  />
                  {/* Nút toggle ẩn/hiện mật khẩu */}
                  <button
                    type="button"
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                    onClick={() => setShowCfPassword(!showCfPassword)}
                  >
                    {showCfPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                  {errors.confirmPassword && (
                    <p className="mt-1 ml-2 text-xs xl:text-sm text-red-500">
                      {String(errors.confirmPassword.message)}
                    </p>
                  )}
                </div>
              </div>
              {/* Submit Button */}
              <div className="mb-4 flex justify-center">
                <button
                  type="submit"
                  className="w-40 mt-5 xl:w-full text-sm xl:text-base rounded-md bg-yellow-400 px-4 py-2  text-white hover:bg-yellow-500"
                >
                  Đăng Ký
                </button>
              </div>

              {/* Login Link */}
              <div className="text-center">
                <a
                  href="login"
                  className="text-xs xl:text-sm text-blue-500 hover:underline"
                >
                  Bạn chưa có tài khoản? Đăng Ký
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div >
  );
};

export default RegisterForm;
