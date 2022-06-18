import axios from 'axios';
import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from 'react';

import Input01 from 'components/commons/inputs/Input01';
import ContainedButton01 from 'components/commons/button/contained/ContainedButton01';

import { GoogleIcon, KaKaoIcon } from 'assets/svgs';
import { ErrorMsg, InputWrapper, Label, SignUpWrapper } from './SignUp.styles';
import Blank from 'components/commons/blank/Blank';
import PostCode from 'components/commons/daumpostcode';
import { useNavigate } from 'react-router-dom';
import store from 'storejs';

export interface IPostCodeData {
  zonecode: string;
  address: string;
}
export default function SignUp() {
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    phone: '',
    addressnumber: '',
    address1: '',
    address2: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const emailRegex =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  const passwordRegex = /^[A-Za-z0-9]{6,12}$/;
  // const phoneRegex = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/;
  const nameRegex = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,20}$/;

  const [emailErrMsg, setEmailErrMsg] = useState<string | null>('');
  const [passwordErrMsg, setPasswordErrMsg] = useState<string | null>('');
  const [passwordErrMsg2, setPasswordErrMsg2] = useState<string | null>('');
  const [nameErrMsg, setNameErrMsg] = useState<string | null>('');

  const navigate = useNavigate();

  // 로그인한 유저가 회원가입페이지 접근시에 홈화면으로 redirect
  const accessToken = store.get('accessToken');

  if (accessToken) {
    useEffect(() => {
      navigate('/');
    }, []);
    alert('이미 가입된 회원입니다.');
    return <></>;
  }

  const handleComplete = (data: IPostCodeData) => {
    setInputs({
      ...inputs,
      addressnumber: data.zonecode,
      address1: data.address,
    });
  };

  const onChangeInputs = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.id.length > 0) {
      switch (e.target.id) {
        case 'email':
          if (!emailRegex.test(e.target.value)) {
            setEmailErrMsg('이메일 형식이 올바르지 않습니다.');
          } else setEmailErrMsg(null);
          break;
        case 'password':
          if (!passwordRegex.test(e.target.value)) {
            setPasswordErrMsg(
              '비밀번호는 문자와 숫자 포함 6자 이상 12자 이내로 설정해주세요.',
            );
          } else setPasswordErrMsg(null);
          break;
        case 'password2':
          if (e.target.value !== inputs.password) {
            setPasswordErrMsg2('비밀번호가 일치하지 않습니다');
          } else setPasswordErrMsg2(null);
          break;
        case 'name':
          if (!nameRegex.test(e.target.value)) {
            setNameErrMsg('이름은 2글자 이상 20자 이내의 문자로 입력해주세요.');
          } else setNameErrMsg(null);
          break;
      }
    }
    setInputs({
      ...inputs,
      [e.target.id]: e.target.value, //대괄호 안에 있는걸로 객체 key를 만듦
    });
  };

  const onClickSignUp = (
    e: MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    if (
      emailErrMsg !== null ||
      passwordErrMsg !== null ||
      passwordErrMsg2 !== null ||
      nameErrMsg !== null
    ) {
      alert('입력 정보를 다시 확인해주세요.');
      return;
    }
    axios
      .post('https://earth-mas.shop/server/user', inputs)
      .then(res => {
        console.log(res);
        alert('회원가입이 완료되었습니다.');
        navigate('/');
      })
      .catch(error => {
        alert(error.response.data.message);
      });
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
        <Label> 이메일</Label>
        <Input01
          type="text"
          onChange={onChangeInputs}
          placeholder="이메일"
          id="email"
        />
        <ErrorMsg>{emailErrMsg}</ErrorMsg>
        <Label>비밀번호</Label>
        <Input01
          id="password"
          type="password"
          onChange={onChangeInputs}
          placeholder="비밀번호"
          autoComplete="false"
        />
        <Input01
          id="password2"
          type="password"
          onChange={onChangeInputs}
          placeholder="비밀번호 확인"
          autoComplete="false"
        />
        <ErrorMsg>
          <div>{passwordErrMsg}</div>
          <div>{passwordErrMsg2}</div>
        </ErrorMsg>
        <Label>이름</Label>
        <Input01
          id="name"
          type="text"
          onChange={onChangeInputs}
          placeholder="이름"
        />
        <ErrorMsg>{nameErrMsg}</ErrorMsg>
        <Label>전화번호</Label>
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
        <Label>주소</Label>
        <InputWrapper>
          <Input01
            type="text"
            id="addressnumber"
            placeholder="우편번호 검색"
            defaultValue={inputs.addressnumber}
            disabled
          />
          <button
            type="button"
            className="defaultButton "
            style={{ width: 250, marginLeft: 10 }}
            onClick={() => setIsModalOpen(prev => !prev)}
          >
            우편번호 검색
          </button>
        </InputWrapper>
        {isModalOpen && (
          <div>
            <PostCode handleComplete={handleComplete} />
          </div>
        )}
        <Input01
          type="text"
          id="address1"
          defaultValue={inputs.address1}
          placeholder="우편번호를 검색해주세요."
          disabled
        />
        <Input01
          type="text"
          id="address2"
          onChange={onChangeInputs}
          placeholder="상세주소를 입력해주세요."
        />
        <Blank height={15} />
        <label>
          <input type="checkbox" /> 이용약관과 개인정보 수집 및 이용에
          동의합니다.
        </label>
        <Blank height={20} />
        <ContainedButton01
          color="main"
          content="회원가입하기"
          onClick={onClickSignUp}
        />
      </form>
    </SignUpWrapper>
  );
}
