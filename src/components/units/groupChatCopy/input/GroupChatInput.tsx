import { useState, useRef } from 'react';
import { InputWrapper } from './GroupChatInput.styles';

interface ChatInputProps {
  handleSendMsg: any;
}

export const GroupChatInput = (props: ChatInputProps) => {
  const [chatMsg, setChatMsg] = useState('');

  const inputRef = useRef<any>(null);

  /* const handleEmojiClick = (event: any, emoji: { emoji: any }) => {
    let message = chatMsg;
    message += emoji.emoji;
    setChatMsg(message);
  }; */ // 이모지삽입

  const sendChat = (event: any) => {
    event.preventDefault();
    if (chatMsg.length > 0) {
      // if (chatMsg.length > 0) {
      props.handleSendMsg(chatMsg); // container에서 socket에 발송
      // onSignup()
      inputRef.current.value = '';
      setChatMsg(''); // 문자 메세지를 발송하면 빈값으로 반환
      // }
    }
  };

  return (
    <InputWrapper
      onKeyPress={e => {
        if (e.key === 'Enter') {
          sendChat(e);
        }
      }}
    >
      <textarea
        name="chatInput"
        placeholder="메시지를 입력해주세요"
        maxLength={500}
        ref={inputRef}
        onChange={e => setChatMsg(e.target.value)}
      ></textarea>
      <div>
        <p>
          <span>{chatMsg.length}</span>/500
        </p>
        <button type="submit">전송</button>
      </div>
    </InputWrapper>
  );
};
