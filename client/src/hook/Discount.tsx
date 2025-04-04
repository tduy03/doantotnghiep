import { useEffect, useState } from "react";
import { Discount } from "../interfaces/Product";
import axios from "axios";

export const useDiscount = () =>{
    const [discounts, setDiscount] = useState<Discount[]>([]);

    const getDiscount = async () =>{
        try {
            const {data} = await axios.get('/api/discount')
            console.log(data);
            
            setDiscount(data.data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        getDiscount()
    },[])
    return {discounts, getDiscount}
}
