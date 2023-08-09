import axios, { AxiosRequestConfig } from "axios";

export interface FetchResponse<T> {
    // [x: string]: SetStateAction<LikedGame[] | null>;
    results: T[],
}

const axiosInstance = axios.create({
    // baseURL: 'http://localhost:3000/api',
    baseURL: 'http://localhost:3000/api/v1'
    // withCredentials: true, // Add this line
});

class APIClientUser<T> {
    endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    getOne = (id: string) => {
        return axiosInstance
            .get<FetchResponse<T>>(`${this.endpoint}/${id}`)
            .then(res => res);
    }

    getAll = () => {
        const createdBy = localStorage.getItem('token');
        const config = {
            headers: {
                'Authorization': `Bearer ${createdBy}`
            }
        };

        return axiosInstance
            .get<FetchResponse<T>>(this.endpoint, config)
            .then(res => res);
    };



    // getAll = () => {
    //     return axiosInstance
    //         .get<FetchResponse<T>>(this.endpoint)
    //         .then(res => res);
    // };




    postOne = (newData: T) => {
        return axiosInstance
            .post<FetchResponse<T>>(this.endpoint, newData)
            .then(res => res);
    };

    updateOne = (newData: T) => {
        return axiosInstance
            .put<FetchResponse<T>>(this.endpoint, newData)
            .then(res => res);
    }

    deleteOne = (newData: any) => {
        console.log(newData.id);
        return axiosInstance
            .delete<String>(`${this.endpoint}/${newData.id}`, { data: { createdBy: newData.createdBy } })
            .then(res => res);
    }

    // deleteOne = (id: String) => {
    //     return axiosInstance
    //         .delete<String>(`${this.endpoint}/${id}`)
    //         .then(res => res);
    // }
}

export default APIClientUser;
