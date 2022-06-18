import store from 'storejs';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { userState } from 'recoil/user';

export default function useSetUser() {
  const setUser = useSetRecoilState(userState);
  const accessToken = store.get('accessToken');

  if (accessToken) {
    axios
      .get('https://earth-mas.shop/server/user/me', {
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
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
}
