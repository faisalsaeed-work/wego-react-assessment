import axios, { AxiosResponse } from "axios"

const HttpClient = {
    get: async (url:string): Promise<AxiosResponse> => {
        return axios.get(url).then(res => res.data)
    }
}

export default HttpClient