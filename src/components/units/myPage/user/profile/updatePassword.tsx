import axios from 'axios';
import ContainedButton01 from 'components/commons/button/contained/ContainedButton01';
import Input01 from 'components/commons/inputs/Input01';
import { ChangeEvent, FormEvent, MouseEvent, useState } from 'react';
import store from 'storejs';

export default function UpdatePassword() {
  const accessToken = store.get('accessToken');

  const [inputs, setInputs] = useState({
    currentpassword: '',
    updatepassword: '',
    checkpassword: '',
  });

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.id]: e.target.value, //대괄호 안에 있는걸로 객체 key를 만듦
    });
  };

  const onClickUpdate = () => {
    axios
      .put('https://earth-mas.shop/mypage/updatepassword', inputs, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(res => {
        console.log(res);
        alert('비밀번호 변경이 완료되었습니다.');
      })
      .catch(error => {
        alert(error.response.data.message);
      });
  };

  return (
    <section className="userPassword">
      <h2>비밀번호 변경하기</h2>
      <form>
        <Input01
          id="currentpassword"
          type="password"
          placeholder="현재 비밀번호"
          autoComplete="false"
          margin={10}
          onChange={onChangePassword}
        />
        <Input01
          id="updatepassword"
          type="password"
          placeholder="새로운 비밀번호"
          autoComplete="false"
          margin={10}
          onChange={onChangePassword}
        />
        <Input01
          id="checkpassword"
          type="password"
          placeholder="비밀번호 확인"
          autoComplete="false"
          margin={10}
          onChange={onChangePassword}
        />
      </form>
      <ContainedButton01
        onClick={onClickUpdate}
        type="button"
        content="비밀번호 변경하기"
        color="sub"
      />
    </section>
  );
}
