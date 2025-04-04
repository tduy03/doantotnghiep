import React, { useEffect, useState } from "react";

import Footer from "../components/client/Footer";


import { Outlet } from "react-router-dom";
import Loading from "../components/loading/Loading";
import { useLoading } from "../context/Loading";
import Header from "../components/client/Home/Header/Header";
import { PhoneCall } from "lucide-react";
import LoadingPage from "../components/loading/LoadingPage";

const LayoutClient: React.FC = () => {
  const { loading, loadingPage } = useLoading()
  const [windowSize, setWindowSize] = useState<{
    width?: number;
    height?: number;
  }>({
    width: undefined,
    height: undefined,
  });
  const [isMobile, setMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleSize);
    handleSize();

    return () => window.removeEventListener("resize", handleSize);
  }, []);

  useEffect(() => {
    if (windowSize.width !== undefined && windowSize.width < 770) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }, [windowSize]);

  return (
    <>
      <LoadingPage isShow={loading} />
      <div className="min-h-screen flex flex-col">
        {/* Thông tin hỗ trợ khách hàng */}
        <div className="flex items-center ml-1 lg:mx-[100px] xl:mx-[150px] gap-2 text-[14px] mb-2">
          <PhoneCall strokeWidth={1} className="w-5 md:w-10" />
          <div>Hỗ trợ khách hàng:</div>
          <div className="text-yellow-500">1900 1000</div>
        </div>
        <hr className="md:mb-2 lg:mb-[0px]" />

        {/* Header */}
        <Header isMobile={isMobile} />

        {/* Nội dung chính */}
        <div className="flex-grow">
          <Outlet />
        </div>

        {/* Footer */}
        <Footer className="mt-auto" />
      </div>
    </>
  );

};

export default LayoutClient;
