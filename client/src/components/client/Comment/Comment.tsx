import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ArrowLeft, Camera, Video, X } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import useFormatPrice from '../../../hook/useFormatPrice';

interface ConfirmModalProps {
    isVisible: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    productId: string;
    orderId: string | null;

}

const Comment: React.FC<ConfirmModalProps> = ({ isVisible, onConfirm, onCancel, productId, orderId }) => {
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);
    const [product, setProduct] = useState();
    const { formatPrice } = useFormatPrice();
    const nav = useNavigate();
    const getproduct = async () => {
        try {
            const res = await axios.get(`/api/ProdductOrder/${productId}`);
            setProduct(res.data.product)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getproduct();
    }, [productId])

    // Xử lý sự kiện chọn sao
    const handleClick = (index: number) => {
        setRating(rating === index ? 0 : index); // Nếu sao đã chọn, bỏ chọn, nếu chưa chọn thì chọn
    };

    if (!isVisible) return null;

    // Xử lý sự kiện thay đổi nhận xét
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.target.value);
    }


    // Gửi đánh giá lên server
    const handleSend = async () => {
        if (!comment.trim() || rating === 0) {
            toast.error("Vui lòng nhập đánh giá và chọn số sao.");
            return;
        }

        try {
            const response = await axios.post(`/api/comment/${productId}`, {
                comment: comment,
                rating: rating,
                orderId: orderId, // Thêm orderId vào payload
            });
            console.log(response.data);
            onCancel();
            setTimeout(() => {
                window.location.reload();
            }, 3000);

            if (response.data.message) {
                toast.success(response.data.message);
            } else {
                toast.error(response.data.error);
            }
        } catch (error) {
            console.error("Lỗi khi gửi đánh giá:", error);
            toast.error("Có lỗi xảy ra, vui lòng thử lại sau.");
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
            <div className={`bg-white p-6 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out w-2/4 h-3/4 overflow-hidden ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
                <section>
                    <div className='flex justify-start mb-2'>
                        <button onClick={onCancel} className='mr-2'>
                            <ArrowLeft />
                        </button>
                        <div>Đánh giá sản phẩm</div>
                    </div>
                    <hr className='mb-5' />
                    <div>
                        <div className="border border-gray-300 rounded-md p-4 mb-4">
                            {product && (
                                <div className="flex mb-4">
                                    <img
                                        src={`http://127.0.0.1:8000/storage/${product.image}`}
                                        alt="Product Image"
                                        className="w-20 h-20 object-cover mr-4"
                                    />
                                    <div className="flex-1">
                                        <p className="text-gray-800">{product.name}</p>
                                        <div className="text-sm text-gray-500">Giá:  {formatPrice(product.price)}</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className='flex items-center gap-2 mb-4 text-[15px]'>
                        <div>Chất lượng sản phẩm</div>
                        <div>
                            {[1, 2, 3, 4, 5].map((index) => (
                                <FontAwesomeIcon
                                    key={index}
                                    icon={index <= rating ? faStarSolid : faStarRegular}
                                    onClick={() => handleClick(index)}
                                    className={index <= rating ? 'text-yellow-500 cursor-pointer' : 'text-gray-400 cursor-pointer'}
                                />
                            ))}
                        </div>
                    </div>

                    <div className='flex justify-center'>
                        <textarea
                            onChange={handleChange}
                            value={comment}
                            className='outline-none border-2 focus:border-red-300 w-5/6 h-20 mt-5 rounded pl-6 pt-2 text-[15px]'
                            placeholder='Viết đánh giá của bạn về sản phẩm...'
                        ></textarea>
                    </div>
                </section>

                <div className="mt-4 flex justify-end">
                    <button onClick={handleSend} className="px-4 py-2 bg-yellow-400 text-gray-700 rounded hover:bg-yellow-200 transition">Gửi đánh giá</button>
                </div>
            </div>
        </div>
    );
};

export default Comment;