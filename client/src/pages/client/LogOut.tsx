import React, { useState } from "react";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@chakra-ui/alert";

const LogoutInterface = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      setError("");

      // Lấy token từ localStorage
      const token = localStorage.getItem("token");
      // console.log(token);

      if (!token) {
        // Nếu không có token, chuyển về trang login
        localStorage.removeItem("user");
        navigate("/login");
        return;
      }

      // Gọi API đăng xuất
      const response = await fetch("http://127.0.0.1:8000/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Nếu tokenkhông hợp lệ, xóa local và chuyển về login
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
          return;
        }
        throw new Error("Đăng xuất thất bại");
      }

      // Xóa token sau khi đăng xuất thành công
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Chuyển hướng về trang đăng nhập
      navigate("/login");
    } catch (err) {
      setError(err.message || "Có lỗi xảy ra khi đăng xuất");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(-1); // Quay lại trang trước đó
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <LogOut className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="mb-2 text-2xl font-bold text-gray-900">Đăng xuất</h2>
          <p className="text-gray-600">
            Bạn có chắc chắn muốn đăng xuất khỏi hệ thống?
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleLogout}
            disabled={isLoading}
            className={`flex w-full items-center justify-center rounded-md bg-red-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-red-700 ${isLoading ? "cursor-not-allowed opacity-50" : ""}`}
          >
            {isLoading ? (
<div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
            ) : (
              <LogOut className="mr-2 h-5 w-5" />
            )}
            {isLoading ? "Đang đăng xuất..." : "Đăng xuất"}
          </button>

          <button
            onClick={handleCancel}
            disabled={isLoading}
            className="w-full rounded-md bg-gray-100 px-4 py-2 text-gray-700 transition-colors duration-200 hover:bg-gray-200"
          >
            Hủy
          </button>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Bạn sẽ cần đăng nhập lại để truy cập hệ thống</p>
        </div>
      </div>
    </div>
  );
};

export default LogoutInterface;