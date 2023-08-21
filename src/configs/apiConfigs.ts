import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const apiUrl = `${process.env.REACT_APP_API_URL}`

export default class Api {
    private instance: AxiosInstance;

    constructor(baseURL = apiUrl, timeout = 30000) {
        this.instance = axios.create({
            baseURL,
            timeout,
        });

        this.instance.interceptors.request.use(
            (config) => {
                // const ssn = infoUtil.getSsn()

                // if (ssn !== null) {
                //     config.headers = {
                //         ssn
                //     }
                // }

                return config;
            },
            (error) => {
                console.log({ error });
                return Promise.reject(error);
            },
        );

        this.instance.interceptors.response.use(
            (response) => {
                console.log({ response });
                return response;
            },
            (error) => {
                console.log({ error });
                return new Promise((res) => {
                    res({
                        data: {
                            result: {
                                msg: error.message,
                                code: -1,
                            },
                        },
                    });
                });
            },
        );
    }

    protected async get<T>(url: string, params?: any) {
        return await this.instance.get<T>(url, { params });
    }

    protected async post<T>(url: string, data: any, config?: AxiosRequestConfig) {
        return await this.instance.post<T>(url, data, config);
    }
}
