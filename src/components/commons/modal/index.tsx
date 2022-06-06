import Portal from './Portal'

interface IProps {
  children: React.ReactNode
}

const Modal = ({ children }: IProps) => {
  return (
    <Portal>
      <article>{children}</article>
    </Portal>
  )
}

export default Modal
