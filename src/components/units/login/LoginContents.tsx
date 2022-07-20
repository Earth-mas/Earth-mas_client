import store from 'storejs';
import { ChangeEvent, FormEvent, MouseEvent, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';

import axiosApiInstance from 'commons/utils/axiosInstance';

import { LoginWrapper, ModalBackGround } from './LoginContents.styles';
import { GoogleIcon, KaKaoIcon } from 'assets/svgs';

interface IProps {
  handleClose: () => void;
}

const LoginContents = ({ handleClose }: IProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const queryClient = useQueryClient();
  const urlLocation = useLocation();

  const navigate = useNavigate();

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const logIn = async () => {
    const data = {
      email,
      password,
    };
    return await axiosApiInstance.post('auth/login', data);
  };

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const { mutate: logInUser } = useMutation('logInUser', logIn, {
    onSuccess: res => {
      const accessToken = res.data;
      store.set('accessToken', accessToken);
      alert('로그인에 성공하였습니다.');
      handleClose();
      queryClient.invalidateQueries('getUser', { refetchInactive: true });

      // 현재페이지가 회원가입페이지인 경우 로그인 성공시 홈화면으로 redirect
      if (urlLocation.pathname === '/signup') navigate('/');
    },
    onError: (error: any) => {
      alert(error.response.data.message);
    },
  });

  const onClickLogin = (
    e: MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    logInUser();
  };

  return (
    <ModalBackGround>
      <LoginWrapper>
        <button type="button" className="xButton" onClick={handleClose}>
          x
        </button>
        <h1>로그인</h1>
        <form onSubmit={onClickLogin}>
          <input
            type="text"
            placeholder="이메일 주소"
            onChange={onChangeEmail}
          />
          <input
            type="password"
            placeholder="비밀번호"
            onChange={onChangePassword}
            autoComplete="off"
          />
          <label>
            <input type="checkbox" className="checkBox" />
            로그인 유지하기
          </label>
          <button type="submit" className="loginButton" onClick={onClickLogin}>
            이메일로 로그인하기
          </button>
        </form>
        <div className="socialLogin">
          <p>또는</p>
          <p>SNS계정으로 간편하게 로그인하기</p>
          <section>
            <a href="https://earth-mas.shop/server/auth/login/google">
              <GoogleIcon />
            </a>
            <a href="https://earth-mas.shop/server/auth/login/kakao">
              <KaKaoIcon />
            </a>
          </section>
        </div>
        <p className="signUp">
          회원이 아니신가요?
          <button onClick={handleClose}>
            <Link to="/signup">
              <strong>지금 가입하세요.</strong>
            </Link>
          </button>
        </p>
      </LoginWrapper>
    </ModalBackGround>
  );
};

export default LoginContents;
