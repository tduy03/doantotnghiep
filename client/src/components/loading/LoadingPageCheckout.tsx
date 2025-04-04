import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
// type LoadingProps = {
//     isShow: boolean;
// };

const LoadingPageCheckout: FC = () => {
    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-md flex items-center justify-center z-[100]">
                <div className="flex flex-col items-center justify-center h-[600px] w-[900px]  rounded-lg  overflow-hidden">
                    {/* Main Content */}
                    <div className=" p-6 w-2/3 sm:w-1/2 lg:w-2/3 text-center">
                        {/* <div className="text-center text-3xl mb-5 font-bold text-[#356fee] ">Xin vui lòng chờ...</div> */}
                        <FontAwesomeIcon icon={faSpinner} className="text-[#356fee] text-5xl animate-spin" />
                    </div>
                </div>
            </div>


        </>
    );
};

export default LoadingPageCheckout;
