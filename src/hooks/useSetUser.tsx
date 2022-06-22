import store from 'storejs';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { userState } from 'recoil/user';
import axiosApiInstance from 'commons/utils/axiosInstance';

export default function useSetUser() {
  const setUser = useSetRecoilState(userState);
  const accessToken = store.get('accessToken');

  // if 부분은 배포시 지워야 함.
  if (accessToken) {
    axiosApiInstance
      .get('user/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      // axios
      //   .get('https://earth-mas.shop/server/user/me', {
      //     headers: {
      //       Authorization: `Bearer ${accessToken}`,
      //     },
      //   })
      .then(res => {
        setUser({
          id: res.data.id,
          name: res.data.name,
          email: res.data.email,
          url: res.data.url,
          addressnumber: res.data.addressnumber,
          address1: res.data.address1,
          address2: res.data.address2,
        });
      })
      .catch(error => {
        alert(error.response.data.message);
      });
  }
}
