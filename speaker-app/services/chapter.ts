import {axiosInstance} from "@/services/instance";

export const getChapters = async (token:string, lang:string = "en") => {
    return (await axiosInstance.get(`chapter?lang=${lang}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })).data
}