import { useState, useRef, useEffect, useCallback } from 'react';
import { InputWrapper } from './Chat.styles';
import { ChatInputProps } from './Chat.types';
import Picker from 'emoji-picker-react';
import { EmojiIcon } from 'assets/svgs';
import autosize from 'autosize';

export const ChatInput = (props: ChatInputProps) => {
  const [chatMsg, setChatMsg] = useState('');

  const textareaRef = useRef<any>(null);

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(prev => !prev);
  };

  const handleEmojiClick = (event: any, emoji: { emoji: string }) => {
    let message = chatMsg;
    message += emoji.emoji;
    setChatMsg(message);

    setShowEmojiPicker(prev => !prev);
  }; // 이모지삽입

  const sendChat = (event: any) => {
    event.preventDefault();
    if (chatMsg.length > 0) {
      props.handleSendMsg(chatMsg); // container에서 socket에 발송
      textareaRef.current.value = '';
      setChatMsg(''); // 문자 메세지를 발송하면 빈값으로 반환
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      autosize(textareaRef.current);
    }
  }, []);

  const onKeydownChat = useCallback(
    (e: { key: string; shiftKey: boolean; preventDefault: () => void }) => {
      if (e.key === 'Enter') {
        if (!e.shiftKey) {
          e.preventDefault();
          sendChat(e);
        }
      }
    },
    [sendChat],
  );

  return (
    <InputWrapper onSubmit={e => sendChat(e)}>
      <textarea
        name="chatInput"
        placeholder="메시지를 입력해주세요"
        maxLength={500}
        ref={textareaRef}
        onKeyPress={onKeydownChat}
        onChange={e => setChatMsg(e.target.value)}
      ></textarea>
      <div className="inputBottom">
        <div className="emoji">
          <EmojiIcon onClick={handleEmojiPickerhideShow} />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
        <div>
          <p>
            <span>{chatMsg.length}</span>/500
          </p>
          <button type="submit">전송</button>
        </div>
      </div>
    </InputWrapper>
  );
};
