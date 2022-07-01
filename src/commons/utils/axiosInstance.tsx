import axios from 'axios';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { accessTokenState } from 'recoil/user';
import store from 'storejs';

const axiosApiInstance = axios.create({
  baseURL: 'https://earth-mas.shop/server/',
});

/* eslint-disable @typescript-eslint/no-explicit-any */
const AxiosInterceptor = ({ children }: any) => {
  const [, setAccessTokenAtom] = useRecoilState(accessTokenState);

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
            // 재발급 받은 토큰은 다시 atom 저장을 하고
            const { accessToken } = data.data;
            store.set('accessToken', accessToken);
            setAccessTokenAtom(accessToken);
            // 헤더 부분에서 토큰 정보를 변경하고 다시 originalRequest를 보냄.
            originalRequest.headers['accessToken'] = 'Bearer ' + accessToken;
            return await axiosApiInstance.request(originalRequest);
          }
        } catch (error) {
          console.log(error);
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
