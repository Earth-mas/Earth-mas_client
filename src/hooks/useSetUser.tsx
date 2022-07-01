import store from 'storejs';
import { useSetRecoilState } from 'recoil';
import { userState } from 'recoil/user';
import axiosApiInstance from 'commons/utils/axiosInstance';
import { useEffect } from 'react';

export default function useSetUser() {
  const setUser = useSetRecoilState(userState);
  const accessToken = store.get('accessToken');
  useEffect(() => {
    if (accessToken) {
      axiosApiInstance
        .get('user/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(res => {
          setUser({
            id: res.data.id,
            name: res.data.name,
            email: res.data.email,
            url: res.data.url,
            addressnumber: res.data.addressnumber,
            address1: res.data.address1,
            address2: res.data.address2,
            phone: res.data.phone,
          });
        })
        .catch(error => {
          console.log(error.response.data.message);
        });
    }
  }, []);
}
