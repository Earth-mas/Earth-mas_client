import axios from 'axios';
import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from 'react';

import Input01 from 'components/commons/inputs/Input01';
import ContainedButton01 from 'components/commons/button/contained/ContainedButton01';

import { GoogleIcon, KaKaoIcon } from 'assets/svgs';
import { InputWrapper, SignUpWrapper } from './SignUp.styles';

export default function SignUp() {
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    addressnumber: '',
    address1: '',
    address2: '',
  });

  const onChangeInputs = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.id]: e.target.value, //대괄호 안에 있는걸로 객체 key를 만듦
    });
  };

  const emailRegex =
    /^[a-zA-Z0-9.!#$%&’+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)$/;
  const passwordRegex = /^(?=.[A-Za-z])(?=.\d)[A-Za-z\d]{8,}$/;
  const phoneRegex = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/;
  const nameRegex = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,20}$/;

  const onClickSignUp = (
    e: MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    axios
      .post('http://34.64.224.198:3000/user', inputs)
      .then(res => console.log(res))
      .catch(error => {
        console.log(error);
      });
  };

  // 지혜에게시작

  const [file, setFile] = useState();
  const onChangeFile = (e: any) => {
    setFile(e.target.files?.[0]);
  };

  const onClickUpload = (
    e: MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    axios
      .post('user/upload', file)
      .then(res => console.log(res))
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <SignUpWrapper>
      <h1>회원가입</h1>
      <div className="socialSignUp">
        <input type="file" onChange={onChangeFile} />
        <button onClick={onClickUpload}>이미지업로드</button>
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
        <Input01
          type="text"
          onChange={onChangeInputs}
          placeholder="이메일"
          id="email"
        />
        <button type="button" className="defaultButton">
          중복 확인하기
        </button>
        <Input01
          id="password"
          type="password"
          onChange={onChangeInputs}
          placeholder="비밀번호"
          autoComplete="false"
        />
        <Input01
          type="password"
          placeholder="비밀번호 확인"
          autoComplete="false"
        />
        <Input01
          id="name"
          type="text"
          onChange={onChangeInputs}
          placeholder="이름"
        />
        <InputWrapper>
          <Input01
            id="phone"
            type="tel"
            onChange={onChangeInputs}
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
        <Input01 type="text" placeholder="인증번호를 입력해주세요." />
        <InputWrapper>
          <Input01
            type="text"
            id="addressnumber"
            onChange={onChangeInputs}
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
          id="address1"
          onChange={onChangeInputs}
          placeholder="우편번호를 검색해주세요."
          disabled
        />
        <Input01
          type="text"
          id="address2"
          onChange={onChangeInputs}
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
