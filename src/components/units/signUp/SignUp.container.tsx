import { ChangeEvent, FormEvent, MouseEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useInterval from 'hooks/useInterval';
import { emailRegex, nameRegex, passwordRegex } from './regex';
import SignUpUI from './SignUp.presenter';
import axiosApiInstance from 'commons/utils/axiosInstance';

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
  const [emailErrMsg, setEmailErrMsg] = useState<string | null>('');
  const [passwordErrMsg, setPasswordErrMsg] = useState<string | null>('');
  const [passwordErrMsg2, setPasswordErrMsg2] = useState<string | null>('');
  const [nameErrMsg, setNameErrMsg] = useState<string | null>('');

  const [phoneToken, setPhoneToken] = useState('');
  const [isTokenSend, setIsTokenSend] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [time, setTime] = useState(180);
  const min = Math.floor(time / 60);
  const sec = time - min * 60;

  const navigate = useNavigate();

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
      [e.target.id]: e.target.value,
    });
  };

  const onClickPhoneNumber = () => {
    axios
      .post('https://earth-mas.shop/server/user/phone', { phone: inputs.phone })
      .then(() => {
        setIsTokenSend(true);
        setTime(180);
      });
  };

  useInterval(() => {
    if (time > 0 && isTokenSend) {
      setTime(prev => prev - 1);
    }
  }, 1000);

  const onChangeToken = (e: ChangeEvent<HTMLInputElement>) => {
    setPhoneToken(e.target.value);
  };

  const onClickTokenCheck = () => {
    axios
      .post('https://earth-mas.shop/server/user/check', {
        phone: inputs.phone,
        token: phoneToken,
      })
      .then(res => {
        if (!res.data) {
          alert('인증번호가 일치하지 않습니다. 다시 전송해주세요.');
          setTime(0);
          setIsTokenSend(false);
          return;
        }
        setIsTokenValid(res.data);
        setTime(0);
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
      nameErrMsg !== null ||
      !isTokenValid
    ) {
      alert('입력 정보를 다시 확인해주세요.');
      return;
    }
    axiosApiInstance
      .post('user', inputs)
      .then(() => {
        alert('회원가입이 완료되었습니다.');
        navigate('/');
      })
      .catch(error => {
        alert(error.response.data.message);
      });
  };

  return (
    <SignUpUI
      onClickSignUp={onClickSignUp}
      onChangeInputs={onChangeInputs}
      onChangeToken={onChangeToken}
      onClickTokenCheck={onClickTokenCheck}
      onClickPhoneNumber={onClickPhoneNumber}
      setIsModalOpen={setIsModalOpen}
      handleComplete={handleComplete}
      emailErrMsg={emailErrMsg}
      passwordErrMsg={passwordErrMsg}
      passwordErrMsg2={passwordErrMsg2}
      nameErrMsg={nameErrMsg}
      isTokenSend={isTokenSend}
      isTokenValid={isTokenValid}
      min={min}
      sec={sec}
      inputs={inputs}
      isModalOpen={isModalOpen}
    />
  );
}
