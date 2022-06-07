import { ChangeEvent, FormEvent, MouseEvent, useState } from 'react';
import axios from 'axios';
import { GoogleIcon, KaKaoIcon } from 'assets/svgs';
import { InputWrapper, SignUpWrapper } from './SignUp.styles';
import Input01 from 'components/commons/inputs/Input01';
import ContainedButton01 from 'components/commons/button/contained/ContainedButton01';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [addressnumber, setAddressnumber] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const onChangePhone = (e: ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };
  const onChangeAddressnumber = (e: ChangeEvent<HTMLInputElement>) => {
    setAddressnumber(e.target.value);
  };
  const onChangeAddress1 = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress1(e.target.value);
  };
  const onChangeAddress2 = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress2(e.target.value);
  };
  const onClickSignUp = (
    e: MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    const data = {
      name,
      email,
      password,
      phone,
      addressnumber,
      address1,
      address2,
    };
    axios
      .post('http://34.64.224.198:3000/user', data)
      .then(res => console.log(res));
  };

  return (
    <SignUpWrapper>
      <h1>회원가입</h1>
      <div className="socialSignUp">
        <p>SNS계정으로 간편하게 가입하기</p>
        <section>
          <button>
            <GoogleIcon />
          </button>
          <button>
            <KaKaoIcon />
          </button>
        </section>
      </div>
      <form onSubmit={onClickSignUp}>
        <Input01 type="text" onChange={onChangeEmail} placeholder="이메일" />
        <button type="button" className="defaultButton">
          중복 확인하기
        </button>
        <Input01
          type="password"
          onChange={onChangePassword}
          placeholder="비밀번호"
          autoComplete="false"
        />
        <Input01
          type="password"
          onChange={onChangePassword}
          placeholder="비밀번호 확인"
          autoComplete="false"
        />
        <Input01 type="text" onChange={onChangeName} placeholder="이름" />
        <InputWrapper>
          <Input01
            type="tel"
            onChange={onChangePhone}
            placeholder="010-0000-0000"
          />
          <button
            type="button"
            className="defaultButton"
            style={{ width: 250, marginLeft: 10 }}
          >
            인증번호 발송
          </button>
        </InputWrapper>
        <Input01
          type="text"
          onChange={onChangePhone}
          placeholder="인증번호를 입력해주세요."
        />
        <InputWrapper>
          <Input01
            type="text"
            onChange={onChangeAddressnumber}
            placeholder="우편번호 검색"
          />
          <button
            type="button"
            className="defaultButton "
            style={{ width: 250, marginLeft: 10 }}
          >
            우편번호 검색
          </button>
        </InputWrapper>
        <Input01
          type="text"
          onChange={onChangeAddress1}
          placeholder="우편번호를 검색해주세요."
          disabled
        />
        <Input01
          type="text"
          onChange={onChangeAddress2}
          placeholder="상세주소를 입력해주세요."
        />
        <ContainedButton01
          color="main"
          content="회원가입하기"
          onClick={onClickSignUp}
        />
      </form>
    </SignUpWrapper>
  );
}
