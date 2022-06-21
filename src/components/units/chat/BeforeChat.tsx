import styled from '@emotion/styled';
import { ChatIcon } from 'assets/svgs';

export const BeforeChat = () => {
  return (
    <Wrapper>
      <ChatIcon />
      <p>채팅할 상대를 선택해주세요.</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    margin-top: 20px;
  }
`;
