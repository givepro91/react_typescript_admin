import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import * as tokenUtils from "../modules/tokenInfo";

const apiUrl = `${process.env.REACT_APP_API_URL}`;

export default class Api {
  private instance: AxiosInstance;

  constructor(baseURL = apiUrl, timeout = 30000) {
    this.instance = axios.create({
      baseURL: baseURL,
      timeout: timeout,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    this.instance.interceptors.request.use(
      (config) => {
        const accessToken = sessionStorage.getItem("accessToken");
        const refreshToken = sessionStorage.getItem("refreshToken");

        if (!accessToken) {
          config.headers.accessToken = null;
          config.headers.refreshToken = null;
          return config;
        }

        if (config.headers && accessToken) {
          config.headers.authorization = `Bearer ${accessToken}`;
          config.headers.refreshToken = `Bearer ${refreshToken}`;
          return config;
        }

        return config;
      },
      (error) => {
        console.log({ error });
        return Promise.reject(error);
      }
    );

    this.instance.interceptors.response.use(
      (response) => {
        console.log("get response", { response });
        return response;
      },
      (error) => {
        const {
          config,
          response: { status },
        } = error;

        if (status === 401) {
          console.log(error);
          const originalRequest = config;

          this.instance
            .put(`${process.env.REACT_APP_API_URL}/auth/refresh`)
            .then(function (res) {
              const user = res.data as { token: string };

              if (user.token) {
                const tokenInfo = tokenUtils.getTokenInfo(user.token);

                if (tokenInfo?.roles.includes("ROLE_ADMIN")) {
                  originalRequest.headers.authorization = `Bearer ${user.token}`;

                  sessionStorage.setItem("accessToken", user.token);
                  sessionStorage.setItem("refreshToken", user.token);
                  const formattedExpirationTime = tokenUtils
                    .convertToKST(tokenInfo.exp)
                    .toLocaleString("en-US");
                  sessionStorage.setItem("expireAt", formattedExpirationTime);
  
                  return axios(originalRequest);
                }
              }
            });
        }

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
      }
    );
  }

  protected async get<T>(url: string, params?: any) {
    return await this.instance.get<T>(url, { params });
  }

  protected async post<T>(url: string, data: any, config?: AxiosRequestConfig) {
    return await this.instance.post<T>(url, data, config);
  }

  protected async put<T>(url: string, data?: any) {
    return await this.instance.put<T>(url, data);
  }
}
