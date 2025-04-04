import React, { useEffect, useState } from "react";

import homefeed2 from "../../public/images/CV1_720x.webp";
import homefeed3 from "../../public/images/CV2_720x.webp";
import homefeed4 from "../../public/images/CV3_720x.webp";
import { useProduct } from "../../hook/Product";
import ProductCarousel from "../../components/client/Home/ProductCaurousel";
import { useBanner } from "../../hook/useBanner";
import Slider from "react-slick";
import ListCategory from "../../components/client/Home/Category/ListCategory";
import { Flame, ZapIcon } from "lucide-react";

const Home = () => {
    const { productsHots, productsSale, expiresTimeProducts } = useProduct();
    const { banner } = useBanner();
    const timeSale = expiresTimeProducts;
    const [remainingTime, setRemainingTime] = useState<{
        hours: number;
        minutes: number;
        seconds: number;
    }>({
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    useEffect(() => {
        const expires_time = new Date(timeSale);
        const updateRemaningTime = () => {
            const currentTime = new Date();
            const timeDifference = expires_time.getTime() - currentTime.getTime();

            if (timeDifference <= 0) {
                setRemainingTime({ hours: 0, minutes: 0, seconds: 0 }); // Nếu thời gian hết hạn, đặt về 0
                console.log("Thời gian đã hết!");
            } else {
                const hoursLeft = Math.floor(timeDifference / (1000 * 60 * 60));
                const minutesLeft = Math.floor(
                    (timeDifference % (1000 * 60 * 60)) / (1000 * 60),
                );
                const secondsLeft = Math.floor((timeDifference % (1000 * 60)) / 1000);

                setRemainingTime({
                    hours: hoursLeft,
                    minutes: minutesLeft,
                    seconds: secondsLeft,
                });
            }
        };

        const timer = setInterval(updateRemaningTime, 1000);

        return () => clearInterval(timer);
    }, [timeSale]);
    const settings = {
        dots: true,
        // infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arow: true,
    };

    return (
        <>
            <div className="mt-2 overflow-hidden md:mt-5 lg:mt-1 mx-1">
                {/* BANNER  */}
                <Slider {...settings}>
                    {banner.map((item) => (
                        <div key={item.id}>
                            <img
                                src={`http://127.0.0.1:8000/storage/${item.image}`}
                                alt="banner"
                                className=" lg:h-[600px] w-full object-cover"
                            />
                        </div>
                    ))}
                </Slider>

                {/* SP hot */}
                <div className="mt-14 lg:mx-[90px] xl:mx-[150px]">
                    <h1 className="mb-4 mt-8 flex items-center justify-center text-center md:text-xl lg:text-2xl uppercase ">
                        SẢN PHẨM HOT
                        <Flame
                            className="fill-red-600"
                            fill="currentColor"
                            strokeWidth={1}
                            color="#ff0000"
                            size={30}
                        />
                    </h1>
                    <hr />
                    <ProductCarousel productsHot={productsHots} />
                </div>
                {/* CATEGOTY */}
                <div>
                    <h1 className="mb-3 text-center md:text-xl lg:text-2xl uppercase">Danh mục sản phẩm</h1>
                    <hr className="mx-[150px] mb-5" />
                    <ListCategory />
                </div>

                {/* SP SALE */}
                <div className=" lg:mx-[90px] xl:mx-[150px]">
                    <div className="mt-4 grid xl:grid-cols-4  ">
                        <div className="col-span-1"></div>
                        <div className="col-span-2">

                            <p className="flex items-center justify-center text-center text-base md:text-xl lg:text-2xl">
                                Săn ưu đãi hot
                                <ZapIcon
                                    className="fill-red-600"
                                    fill="currentColor"
                                    strokeWidth={1}
                                    color="#ff0000"
                                    size={30}
                                />
                            </p>
                        </div>
                        <div className="col-span-1 flex lg:flex lg:items-end lg:mb-3 xl:items-center ">
                            {/* <p className=" mr-4 xl:text-lg  text-black">
                                Kết thúc sau
                            </p> */}
                            {/* <div className="flex gap-2 justify-center">
                                <div className="rounded-md bg-red-500  px-1 py-1  xl:px-3 xl:py-2 text-[13px] xl:text-base text-white">
                                    {remainingTime.hours.toString().padStart(2, "0")}
                                </div>
                                <span className="font-bold text-black">:</span>
                                <div className="rounded-md bg-red-500  px-1 py-1 xl:px-3 xl:py-2 text-[13px] xl:text-base  text-white">
                                    {remainingTime.minutes.toString().padStart(2, "0")}:
                                </div>
                                <span className="font-bold text-black">:</span>
                                <div className="rounded-md bg-red-500  px-1 py-1 xl:px-3 xl:py-2 text-[13px] xl:text-base text-white">
                                    {remainingTime.seconds.toString().padStart(2, "0")}
                                </div>
                            </div> */}
                        </div>
                    </div>
                    <ProductCarousel productsHot={productsSale} />
                </div>


                <div className=" lg:flex lg:justify-center gap-4 ">
                    <div className="flex flex-col items-start  lg:gap-7 lg:mb-5 md:mb-14">

                        <img
                            src={homefeed2}
                            alt=""
                            className="md:w-full rounded-3xl lg:w-[333px] lg:h-[222px] xl:h-[370px] xl:w-[480px] object-cover transition-transform duration-300 ease-in-out transform hover:scale-105 z-10 "
                        />
                        <div className="flex lg:w-[333px] lg:h-[308px] xl:h-[320px] xl:w-[480px] flex-col items-center justify-center bg-gray-100 px-4">
                            <p className="pb-2 uppercase opacity-60 t">
                                COURTSIDE COLLECTION Với 3 màu sắc chủ đạo, Jade Green mang tinh
                                thần thể thao, Cinnamon Brown của sự tinh tế và Midnight Black
                                của sự thanh lịch
                            </p>
                            <button> MUA NGAY</button>
                        </div>
                    </div>

                    <div className="md:mb-14">
                        <img
                            src={homefeed3}
                            alt=""
                            className="rounded-3xl md:w-full lg:w-[363px] lg:h-[560px] xl:h-[720px] xl:w-[480px]   mb-5 object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
                        />
                    </div>

                    <div className="flex flex-col items-start  lg:gap-7  ">
                        <div className="flex lg:w-[333px] lg:h-[308px] xl:h-[320px] xl:w-[480px] flex-col items-center justify-center bg-gray-100 px-4 " >
                            <p className="pb-2 uppercase  opacity-60 ">
                                COURTSIDE COLLECTION Với 3 màu sắc chủ đạo, Jade Green mang tinh
                                thần thể thao, Cinnamon Brown của sự tinh tế và Midnight Black
                                của sự thanh lịch
                            </p>
                            <button> MUA NGAY</button>
                        </div>
                        <div className=" md:w-full lg:w-[333px] lg:h-[222px] xl:h-[370px] xl:w-[480px] ">
                            <img
                                src={homefeed4}
                                alt=""
                                className="h-full w-full rounded-3xl object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-center gap-1 lg:gap-4 bg-white py-2 lg:p-4">
                    {/* Banner 1 */}
                    <div className="flex items-center overflow-hidden rounded-md border border-black px-2">
                        <div className="flex items-center justify-center ">
                            <div className=" text-sm lg:text-3xl font-bold text-red-500">%</div>
                        </div>
                        <div className="flex flex-col items-start justify-center p-4">
                            <p className=" text-sm  lg:text-lg font-bold text-red-500">Giảm Đến</p>
                            <p className="text-sm lg:text-2xl font-bold text-black">200K</p>
                        </div>
                    </div>

                    {/* Banner 2 */}
                    <div className="flex items-center overflow-hidden rounded-md border border-black px-2" >
                        <div className="flex items-center justify-center ">
                            <div className="text-sm lg:text-lg font-bold text-red-500">FREE</div>
                        </div>
                        <div className="flex flex-col items-start justify-center p-4">
                            <p className=" text-sm lg:text-lg font-bold text-black">
                                MIỄN PHÍ VẬN CHUYỂN
                            </p>
                            <p className="text-xs lg:text-sm text-gray-500">ĐƠN HÀNG TỪ 498K →</p>
                        </div>
                    </div>

                    {/* Banner 3 */}
                    <div className="flex items-center overflow-hidden rounded-md border border-black">
                        <div className="flex items-center justify-center ">
                            <div className=" text-sm lg:text-3xl font-bold text-red-500">📦</div>
                        </div>
                        <div className="flex flex-col items-start justify-center p-4">
                            <p className=" text-sm  lg:text-lg font-bold text-red-500">ĐỔI TRẢ</p>
                            <p className="text-sm lg:text-2xl font-bold text-black">15 NGÀY →</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
