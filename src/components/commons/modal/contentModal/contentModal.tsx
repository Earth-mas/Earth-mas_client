import styled from '@emotion/styled';
import { ModalXbuttonIcon } from 'assets/svgs';
import { Colors } from 'styles/Colors';
import { FontSize } from 'styles/FontStyles';

interface IProps {
  onClickCancel: () => void;
  children: React.ReactNode;
}

export default function ContentModal(props: IProps) {
  return (
    <ModalBackground>
      <ModalWrapper>
        <div className="xButton">
          <button onClick={props.onClickCancel}>
            <ModalXbuttonIcon />
          </button>
        </div>
        <div className="content">{props.children}</div>
      </ModalWrapper>
    </ModalBackground>
  );
}

const ModalBackground = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(3px) brightness(40%);
  color: ${Colors.B100};
  z-index: 3;
`;

const ModalWrapper = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  width: 520px;
  /* height: 55vh; */
  border: 1px solid ${Colors.B40};
  overflow: hidden;
  background-color: white;
  border-radius: 20px;
  padding: 15px 15px;
  margin: 0 auto;

  .xButton {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    button {
      cursor: pointer;
      font-size: ${FontSize.LARGE_C};
      line-height: 20px;
      svg {
        width: 30px;
        height: 30px;
      }
    }
  }
  .content {
    height: 100%;
    margin-bottom: 25px;
  }
`;
