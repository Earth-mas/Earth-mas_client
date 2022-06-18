import styled from '@emotion/styled';
import { ModalXbuttonIcon } from 'assets/svgs';
import { Colors } from 'styles/Colors';
import { FontSize } from 'styles/FontStyles';

interface IProps {
  onClickOk: () => void;
  onClickCancel: () => void;
  title?: string;
  contents?: string;
  okMessage?: string;
  cancelMessage?: string;
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
        <div>{props.children}</div>
        <div className="buttons">
          <button className="button01" onClick={props.onClickCancel}>
            {props.cancelMessage}
          </button>
          <button className="button02" onClick={props.onClickOk}>
            {props.okMessage}
          </button>
        </div>
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
`;

const ModalWrapper = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  width: 500px;
  height: 80vh;
  border: 1px solid ${Colors.B40};
  overflow: scroll;
  background-color: white;
  border-radius: 20px;
  padding: 15px 20px;
  margin: 0 auto;

  .xButton {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    button {
      cursor: pointer;
      font-size: ${FontSize.LARGE_C};
      line-height: 20px;
    }
  }

  .buttons {
    display: flex;
    width: 350px;
    margin: 0 auto;
    padding-top: 30px;
    justify-content: space-between;
    .button01 {
      width: 170px;
      height: 40px;
      border: 1px solid ${Colors.SUB1};
      color: ${Colors.SUB1};
      border-radius: 5px;
    }
    .button02 {
      width: 170px;
      height: 40px;
      background-color: ${Colors.SUB1};
      color: ${Colors.BW};
      border-radius: 5px;
    }
  }
`;
