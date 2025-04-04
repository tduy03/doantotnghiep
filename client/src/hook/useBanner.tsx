import { useQuery } from "@tanstack/react-query"
import axios from "axios"
interface Banner {
    id: string
    image: string
    title: string
}
export const useBanner = () => {
    const { data: banner = [] } = useQuery<Banner[]>({
        queryKey: ["banner"],
        queryFn: async () => {
            const response = await axios.get(`/api/banner`);
            return response.data.data
        }
    })
    return { banner }
}