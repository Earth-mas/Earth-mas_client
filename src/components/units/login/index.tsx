import { useState } from 'react';

// import useOnClickOutside from 'hooks/worker/useOnClickOutside'

import ModalMenu from './LoginContents';
import Modal from '../../commons/modal';

const Login = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const ref = useRef(null)
  // useOnClickOutside(ref, () => setIsOpen(false))
  const handleClick = () => setIsOpen(prev => !prev);

  return (
    <>
      <button type="button" onClick={handleClick}>
        로그인
      </button>
      {isOpen && (
        <Modal>
          <ModalMenu handleClose={handleClick} />
        </Modal>
      )}
    </>
  );
};

export default Login;
