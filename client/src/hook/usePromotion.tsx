import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Promotion {
    id: string;
    code: string;
    discount: number;
    discount_type: string;
    minimum_spend: number;
    start_date: Date;
    end_date: Date;
    usage_limit: string;
}

export const usePromotion = () => {
    const [promotions, setPromotions] = useState<Promotion[]>([]);
    const [promotionsUser, setPromotionsUser] = useState<Promotion[]>([]);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchPromotions = async () => {
            try {
                const response = await axios.get(`/api/promotion`);
                setPromotions(response.data.data);
            } catch (err: any) {
                console.error("Error fetching promotions:", err);
                setError(err.message);
            }
        };

        fetchPromotions();
    }, []);

    const addPromotion = async (id: string) => {
        try {
            const res = await axios.post(`/api/addProdmotion`, { promotion_id: id });
            if (res.data.error) {
                toast.error(res.data.error)
            } else {
                toast.success(res.data.message)
            }
            // Refresh promotions after adding a new one
            const response = await axios.get(`/api/promotion`);
            setPromotions(response.data.data);

        } catch (err: any) {
            console.error("Error adding promotion:", err);
            setError(err.message);
        }
    };

    useEffect(() => {
        const fetchPromotionsUser = async () => {
            try {
                const response = await axios.get(`/api/promotionUser`);
                setPromotionsUser(response.data.promotions
                );
            } catch (err: any) {
                console.error("Error fetching promotions:", err);
                setError(err.message);
            }
        };

        fetchPromotionsUser();
    }, []);
    return { promotions, addPromotion, promotionsUser };
};
