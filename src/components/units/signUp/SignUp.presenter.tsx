import { GoogleIcon, KaKaoIcon } from 'assets/svgs';
import Blank from 'components/commons/blank/Blank';
import ContainedButton01 from 'components/commons/button/contained/ContainedButton03';
import PostCode from 'components/commons/daumpostcode';
import Input01 from 'components/commons/inputs/Input01';
import { ErrorMsg, InputWrapper, Label, SignUpWrapper } from './SignUp.styles';
import { IProps } from './SignUp.types';
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function SignUpUI(props: IProps) {
  return (
    <SignUpWrapper>
      <h1>회원가입</h1>
      <div className="socialSignUp">
        <p>SNS계정으로 간편하게 가입하기</p>
        <section>
          <a href="https://earth-mas.shop/server/auth/login/google">
            <GoogleIcon />
          </a>
          <a href="https://earth-mas.shop/server/auth/login/kakao">
            <KaKaoIcon />
          </a>
        </section>
      </div>
      <form onSubmit={props.onClickSignUp}>
        <Label> 이메일</Label>
        <Input01
          type="text"
          onChange={props.onChangeInputs}
          placeholder="이메일"
          id="email"
        />
        <ErrorMsg>{props.emailErrMsg}</ErrorMsg>
        <Label>비밀번호</Label>
        <Input01
          id="password"
          type="password"
          onChange={props.onChangeInputs}
          placeholder="비밀번호"
          autoComplete="false"
        />
        <Input01
          id="password2"
          type="password"
          onChange={props.onChangeInputs}
          placeholder="비밀번호 확인"
          autoComplete="false"
        />
        <ErrorMsg>
          <div>{props.passwordErrMsg}</div>
          <div>{props.passwordErrMsg2}</div>
        </ErrorMsg>
        <Label>이름</Label>
        <Input01
          id="name"
          type="text"
          onChange={props.onChangeInputs}
          placeholder="이름"
        />
        <ErrorMsg>{props.nameErrMsg}</ErrorMsg>
        <Label>전화번호</Label>
        <InputWrapper>
          <Input01
            id="phone"
            type="tel"
            onChange={props.onChangeInputs}
            placeholder="숫자만 입력해주세요."
          />
          <button
            type="button"
            className="defaultButton"
            style={{ width: 250, marginLeft: 10 }}
            onClick={
              props.isTokenSend
                ? props.onClickTokenCheck
                : props.onClickPhoneNumber
            }
          >
            {props.isTokenSend ? (
              <>
                <p>인증번호 확인</p>
                {props.min}:{props.sec}
              </>
            ) : (
              '인증번호 발송'
            )}
          </button>
        </InputWrapper>
        {props.isTokenSend && (
          <Input01
            type="text"
            placeholder="인증번호를 입력 후 인증번호 확인 버튼을 눌러주세요."
            onChange={props.onChangeToken}
          />
        )}
        <Label>주소</Label>
        <InputWrapper>
          <Input01
            type="text"
            id="addressnumber"
            placeholder="우편번호 검색"
            defaultValue={props.inputs.addressnumber}
            disabled
          />
          <button
            type="button"
            className="defaultButton "
            style={{ width: 250, marginLeft: 10 }}
            onClick={() => props.setIsModalOpen((prev: any) => !prev)}
          >
            우편번호 검색
          </button>
        </InputWrapper>
        {props.isModalOpen && (
          <div>
            <PostCode handleComplete={props.handleComplete} />
          </div>
        )}
        <Input01
          type="text"
          id="address1"
          defaultValue={props.inputs.address1}
          placeholder="우편번호를 검색해주세요."
          disabled
        />
        <Input01
          type="text"
          id="address2"
          onChange={props.onChangeInputs}
          placeholder="상세주소를 입력해주세요."
        />
        <Blank height={15} />
        <label>
          <input type="checkbox" required /> 이용약관과 개인정보 수집 및 이용에
          동의합니다.
        </label>
        <Blank height={20} />
        <ContainedButton01 type="submit" color="main" content="회원가입하기" />
      </form>
    </SignUpWrapper>
  );
}
