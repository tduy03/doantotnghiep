import axios from "axios";
import { useEffect, useState } from "react";
import { Colors, Sizes } from "../interfaces/Product";


export const useColor = () => {
    const [color, setColor] = useState<Colors[]>([])


    const [size, setSize] = useState<Sizes[]>([])
    const [selectedColor, setSelectedColors] = useState<string | null>(null);
    // const [selectColor, setSelectColor] = useState("")
    // const [selectedSize, setSelectedSize] = useState("")

    const getColor = async () => {
        try {
            const { data } = await axios.get(`/api/color`)
            setColor(data.productColor)
        } catch (error) {
            console.log(error);

        }
    }
    const getSize = async () => {
        try {
            const { data } = await axios.get(`/api/size`)
            setSize(data.productSize)
        } catch (error) {
            console.log(error);


   
    }
    }
    const handleChangeColors = (colorName: string) => {
        if (selectedColor === colorName) {
            setSelectedColors('');  // Nếu màu đã được chọn, bỏ chọn
        } else {
            setSelectedColors(colorName);  // Nếu chưa chọn, cập nhật màu mới
        }
    };
    useEffect(() => {
        getColor()
    }, [])
    useEffect(() => {
        getSize()
    }, [])
    return {
        color, getColor, size, getSize, selectedColor,
        handleChangeColors,
    }
}
   