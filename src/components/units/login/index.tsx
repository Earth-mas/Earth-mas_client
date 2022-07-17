import { useState } from 'react';
import styled from '@emotion/styled';

// import useOnClickOutside from 'hooks/worker/useOnClickOutside'

import ModalMenu from './LoginContents';
import Modal from '../../commons/modal';
import { FontSize } from 'styles/FontStyles';

const Login = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const ref = useRef(null)
  // useOnClickOutside(ref, () => setIsOpen(false))
  const handleClick = () => setIsOpen(prev => !prev);

  return (
    <>
      <LoginButton type="button" onClick={handleClick}>
        로그인
      </LoginButton>
      {isOpen && (
        <Modal>
          <ModalMenu handleClose={handleClick} />
        </Modal>
      )}
    </>
  );
};

export default Login;

const LoginButton = styled.button`
  font-size: ${FontSize.SMALL};
`;
