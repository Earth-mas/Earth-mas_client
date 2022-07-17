import axios from 'axios';
import { useEffect } from 'react';
import store from 'storejs';

const axiosApiInstance = axios.create({
  baseURL: 'https://earth-mas.shop/server/',
  withCredentials: true,
});
/* eslint-disable @typescript-eslint/no-explicit-any */
const AxiosInterceptor = ({ children }: any) => {
  useEffect(() => {
    const reqInterceptor = (config: any) => {
      const accessToken = store.get('accessToken');
      if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    };

    const interceptor =
      axiosApiInstance.interceptors.request.use(reqInterceptor);
    return () => {
      axiosApiInstance.interceptors.request.eject(interceptor);
    };
  }, []);

  useEffect(() => {
    const resInterceptor = (response: any) => {
      return response;
    };

    const errInterceptor = async (error: any) => {
      if (error.response.status === 401) {
        // 기존의 originalRequest를 auth/restore 으로 전달해 토큰을 재발급
        try {
          const originalRequest = error.config;
          const data = await axiosApiInstance.post('auth/restore');
          // 토큰이 재발급 됐으면
          if (data) {
            // 재발급 받은 토큰은 다시 저장을 하고
            const accessToken = data.data;
            store.set('accessToken', accessToken);
            // 헤더 부분에서 토큰 정보를 변경하고 다시 originalRequest를 보냄.
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return await axiosApiInstance.request(originalRequest);
          }
        } catch (error) {
          alert(error);
        }
      }
      return Promise.reject(error);
    };

    const interceptor = axiosApiInstance.interceptors.response.use(
      resInterceptor,
      errInterceptor,
    );

    return () => axiosApiInstance.interceptors.response.eject(interceptor);
  }, []);

  return children;
};

export default axiosApiInstance;
export { AxiosInterceptor };
