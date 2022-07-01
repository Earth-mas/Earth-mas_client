import store from 'storejs';
import { useSetRecoilState } from 'recoil';
import { userState } from 'recoil/user';
import axiosApiInstance from 'commons/utils/axiosInstance';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useSetUser() {
  const navigate = useNavigate();
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
          if (res.data.addressnumber.legnth === 0) {
            navigate('/moreinfo');
          }
        })
        .catch(error => {
          console.log(error.response.data.message);
        });
    }
  }, []);
}
