import {axiosInstance} from "@/services/instance";

export const getUserData = async (token:string) => {
    return(
        await axiosInstance.get('/user',{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
    ).data
}

export const saveProgress = async (topicId: string, token: string) => {
    return (
        await axiosInstance.post('/user/progress', { topicId }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    ).data
}