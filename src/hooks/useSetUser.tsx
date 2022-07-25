import store from 'storejs';
import { useSetRecoilState } from 'recoil';
import { userState } from 'recoil/user';
import axiosApiInstance from 'commons/utils/axiosInstance';
import { useEffect } from 'react';
import { useQuery } from 'react-query';

export default function useSetUser() {
  const setUser = useSetRecoilState(userState);
  const accessToken = store.get('accessToken');

  const getUser = async () => {
    const result = await axiosApiInstance.get('user/me');
    return result.data;
  };

  const { refetch } = useQuery('getUser', getUser, {
    enabled: false,
    onSuccess: data => {
      setUser({
        id: data.id,
        name: data.name,
        email: data.email,
        url: data.url,
        addressnumber: data.addressnumber,
        address1: data.address1,
        address2: data.address2,
        phone: data.phone,
      });
    },
  });

  useEffect(() => {
    if (accessToken) {
      refetch();
    }
  }, []);
}
