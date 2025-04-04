import React, { useState } from "react";
import { useForm } from "react-hook-form";
import img from "../../public/images/imglogin.jpg";
import logo from "../../public/images/logofix2.png";
import modern from "../../public/images/modern.png";
import { Eye, EyeOff } from "lucide-react";
type AuthFormProps = {
  onSubmit: (data: any) => void;
};
const LoginForm = ({ onSubmit }: AuthFormProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  return (
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
            Đăng Nhập
          </h2>
          <p className=" px-10 xl:px-2 mb-2 xl:mb-6 animate-bounce-bottom text-center text-xs  xl:text-base ">
            Trải nghiệm mua hàng thật tốt với Modern men.
          </p>
          <div className="md:flex md:justify-center xl:block ">
            <form onSubmit={handleSubmit(onSubmit)} >
              {/* Username Field */}

              {/* Email Field */}
              <div className="mb-4">
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

              {/* Submit Button */}
              <div className="mb-4 flex justify-center">
                <button
                  type="submit"
                  className="w-40 xl:w-full text-sm xl:text-base rounded-md bg-yellow-400 px-4 py-2  text-white hover:bg-yellow-500"
                >
                  Đăng Nhập
                </button>
              </div>

              {/* Login Link */}
              <div className="text-center">
                <a
                  href="/register"
                  className="text-xs xl:text-sm text-blue-500 hover:underline"
                >
                  Bạn chưa có tài khoản? Đăng Ký
                </a>
              </div>
              <br />
              <a
                href="/forgotpassword"
                className="text-sm text-blue-500 hover:underline"
              >
               Bạn đã quên mật khẩu ?
              </a>
            </form>
          </div>
        </div>
      </div>
    </div >
  );
};

export default LoginForm;
