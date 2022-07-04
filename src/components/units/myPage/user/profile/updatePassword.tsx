import axiosApiInstance from 'commons/utils/axiosInstance';
import ContainedButton01 from 'components/commons/button/contained/ContainedButton01';
import Input01 from 'components/commons/inputs/Input01';
import { ChangeEvent, useState } from 'react';

export default function UpdatePassword() {
  const [inputs, setInputs] = useState({
    currentpassword: '',
    updatepassword: '',
    passwordcheck: '',
  });

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.id]: e.target.value, //대괄호 안에 있는걸로 객체 key를 만듦
    });
  };

  const onClickUpdate = () => {
    axiosApiInstance
      .put('mypage/updatepassword', inputs)
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
          id="passwordcheck"
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
