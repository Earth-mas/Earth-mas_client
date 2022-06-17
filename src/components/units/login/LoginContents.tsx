import axios from 'axios';
import store from 'storejs';
import { ChangeEvent, FormEvent, MouseEvent, useState } from 'react';
import { LoginWrapper, ModalBackGround } from './LoginContents.styles';
import { GoogleIcon, KaKaoIcon } from 'assets/svgs';
import { Link } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userState } from 'recoil/user';

interface IProps {
  handleClose: () => void;
}

const LoginContents = ({ handleClose }: IProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setUser = useSetRecoilState(userState);

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onClickLogin = (
    e: MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    axios
      .post('https://earth-mas.shop/server/auth/login', data, {
        withCredentials: true,
      })
      .then(res => {
        const accessToken = res.data;
        store.set('accessToken', accessToken);
        // axios.defaults.headers.common[
        //   'Authorization'
        // ] = `Bearer ${accessToken}`;
        alert('로그인 성공');
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
        handleClose();
      })
      .catch(error => {
        alert(error.response.data.message);
      });
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
            <button>
              <GoogleIcon />
            </button>
            <button>
              <KaKaoIcon />
            </button>
          </section>
        </div>
        <p className="signUp">
          회원이 아니신가요?
          <button>
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
