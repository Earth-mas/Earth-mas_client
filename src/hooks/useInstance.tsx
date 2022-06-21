import axios from 'axios';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { accessTokenState } from 'recoil/user';

// 요청 보내는 baseURL 설정
const axiosApiInstance = axios.create({
  baseURL: 'https://earth-mas.shop/server/',
});

// request를 보낼 때 atom의 accessToken 정보를 헤더에 저장
/* eslint-disable @typescript-eslint/no-explicit-any */
const accessToken = useRecoilValue(accessTokenState);
axiosApiInstance.interceptors.request.use(function (config: any) {
  config.headers['accessToken'] = 'Bearer ' + accessToken;
  return config;
});

// response를 받았을 때
axiosApiInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  // error가 발생했고 해당 error의 status가 401이라면
  async function (error) {
    if (error.response && error.response.status === 401) {
      // 기존의 originalRequest를 auth/refreshtoken 으로 전달해 토큰을 재발급
      try {
        const originalRequest = error.config;
        const data = await axiosApiInstance.get('auth/restoretoken');
        // 토큰이 재발급 됐으면
        if (data) {
          console.log('토큰 재발급');
          // 재발급 받은 토큰은 다시 atom 저장을 하고
          const { accessToken } = data.data;
          const setAccessTokenState = useSetRecoilState(accessTokenState);
          setAccessTokenState(accessToken);
          // 헤더 부분에서 토큰 정보를 변경하고 다시 originalRequest를 보냄.
          originalRequest.headers['accessToken'] = 'Bearer ' + accessToken;
          return await axiosApiInstance.request(originalRequest);
        }
      } catch (error) {
        console.log(error);
      }
      return Promise.reject(error);
    }
    // 403 이외의 오류가 들어온다면 토큰 재발급에 실패한것으로 처리
    return Promise.reject(error);
  },
);

export default axiosApiInstance;
