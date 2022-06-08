import { useEffect } from 'react';
import Portal from './Portal';

interface IProps {
  children: React.ReactNode;
}

const Modal = ({ children }: IProps) => {
  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);

  return (
    <Portal>
      <article>{children}</article>
    </Portal>
  );
};

export default Modal;
