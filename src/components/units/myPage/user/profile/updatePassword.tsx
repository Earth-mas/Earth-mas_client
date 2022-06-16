import ContainedButton01 from 'components/commons/button/contained/ContainedButton01';
import Input01 from 'components/commons/inputs/Input01';

export default function UpdatePassword() {
  return (
    <section className="userPassword">
      <h2>비밀번호 변경하기</h2>
      <form>
        <Input01
          id="password1"
          type="password"
          placeholder="현재 비밀번호"
          autoComplete="false"
          margin={10}
        />
        <Input01
          id="password2"
          type="password"
          placeholder="새로운 비밀번호"
          autoComplete="false"
          margin={10}
        />
        <Input01
          id="password3"
          type="password"
          placeholder="비밀번호 확인"
          autoComplete="false"
          margin={10}
        />
      </form>
      <ContainedButton01 content="비밀번호 변경하기" color="sub" />
    </section>
  );
}
