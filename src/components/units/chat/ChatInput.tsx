import styled from '@emotion/styled';
import { useState } from 'react';
import { Colors } from 'styles/Colors';
import { FontFamily, FontSize } from 'styles/FontStyles';

export const ChatInput = (handleSendMsg: any) => {
  const [chatMsg, setChatMsg] = useState('');

  /* const handleEmojiClick = (event: any, emoji: { emoji: any }) => {
    let message = chatMsg;
    message += emoji.emoji;
    setChatMsg(message);
  }; */ // 이모지삽입

  const sendChat = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (chatMsg.length > 0) {
      handleSendMsg(chatMsg); // container에서 socket에 발송
      setChatMsg(''); // 문자 메세지를 발송하면 빈값으로 반환
    }
  };

  return (
    <Wrapper onSubmit={e => sendChat(e)}>
      <textarea
        name="chatInput"
        placeholder="메시지를 입력해주세요"
        maxLength={500}
        onChange={e => setChatMsg(e.target.value)}
      ></textarea>
      <div>
        <p>
          <span>{chatMsg.length}</span>/500
        </p>
        <button>전송</button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.form`
  width: 100%;
  height: 100px;
  border: 1.5px solid ${Colors.MAIN};
  border-radius: 10px;
  padding: 10px;

  textarea {
    width: 100%;
    height: calc(100% - 25px);
    border: 0;
    ::placeholder {
      color: ${Colors.B60};
      font-size: ${FontSize.SMALL};
    }
  }
  > div {
    height: auto;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    p {
      font-size: 0.75rem;
      margin-right: 8px;
      span {
        color: ${Colors.SUB1};
      }
    }
    button {
      width: 55px;
      min-height: 25px;
      height: 25px;
      font-family: ${FontFamily.BOLD};
      font-size: ${FontSize.SMALL};
      color: ${Colors.BW};
      background-color: ${Colors.B40};
      border-radius: 8px;

      :hover {
        background-color: ${Colors.SUB2};
      }
    }
  }
`;
