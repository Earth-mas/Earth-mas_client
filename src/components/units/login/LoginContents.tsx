import styled from '@emotion/styled';

const LoginWrapper = styled.main`
  position: absolute;
  top: 50%;
  right: 50%;
  display: flex;
  flex-direction: column;
  transform: translate(50%, -50%);
  width: 500px;
  height: 645px;
  border: 1px solid black;
  overflow: hidden;
  box-shadow: black 0 6px 16px;
  background-color: white;
  border-radius: 20px;
  padding: 55px 80px;

  .xButton {
    position: absolute;
    top: 20px;
    right: 20px;
    margin-bottom: 15px;
  }

  input {
    border: 1px solid black;
    height: 50px;
    font-size: 20px;
    padding: 0 20px;
    margin-bottom: 15px;
  }

  .loginButton {
    width: 100%;
    height: 50px;
    border: 1px solid black;
  }
`;

interface IProps {
  handleClose: () => void;
}

const LoginContents = ({ handleClose }: IProps) => {
  return (
    <LoginWrapper>
      <button type="button" className="xButton" onClick={handleClose}>
        x
      </button>
      로그인
      <input type="text" placeholder="이메일 주소" />
      <input type="password" placeholder="비밀번호" />
      <button type="button" className="loginButton">
        이메일로 로그인하기
      </button>
    </LoginWrapper>
  );
};

export default LoginContents;
