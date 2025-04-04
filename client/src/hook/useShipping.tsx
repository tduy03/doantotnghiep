import axios from "axios";
import { useEffect, useState } from "react";
import { Shipping } from "../interfaces/Shipping";

export const useShipping = () => {
    const [shippings, setShippings] = useState<Shipping[]>([]);
    const getAllShipping = async () => {
        try {
            const response = await axios.get("/api/Shipping");
            setShippings(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getAllShipping();
    }, []);

    return { shippings };

}