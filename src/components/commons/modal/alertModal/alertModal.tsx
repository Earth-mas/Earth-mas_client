import styled from '@emotion/styled';
import { ModalXbuttonIcon } from 'assets/svgs';
import ContainedButton03 from 'components/commons/button/contained/ContainedButton03';
import OutlinedButton03 from 'components/commons/button/outlined/OutlinedButton03';
import { Colors } from 'styles/Colors';

interface IProps {
  onClickOk: () => void | any;
  onClickCancel: () => void;
  title: string;
  contents: string;
  okMessage: string;
  cancelMessage: string;
}

export default function AlertModal(props: IProps) {
  return (
    <ModalBackground>
      <ModalWrapper>
        <div className="xButton">
          <ModalXbuttonIcon onClick={props.onClickCancel} />
        </div>
        <div className="content">
          <h3>{props.title}</h3>
          <p>{props.contents}</p>
        </div>
        <div className="buttons">
          <OutlinedButton03
            color="main"
            content={props.cancelMessage}
            onClick={props.onClickCancel}
          />

          <ContainedButton03
            color="main"
            content={props.okMessage}
            onClick={props.onClickOk}
          />
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
  z-index: 999;
`;

const ModalWrapper = styled.div`
  display: flex;
  position: absolute;
  top: 30%;
  flex-direction: column;
  width: 420px;
  /* height: 200px; */
  border: 1px solid ${Colors.B40};
  overflow: hidden;
  background-color: white;
  border-radius: 20px;
  padding: 15px 20px 20px 20px;
  margin: 0 auto;

  .xButton {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    svg {
      cursor: pointer;
    }
  }
  h3 {
    text-align: center;
    padding-top: 10px;
  }

  P {
    padding-top: 10px;
    text-align: center;
    color: ${Colors.B80};
  }

  .buttons {
    width: 100%;
    display: flex;
    grid-gap: 15px;
    padding-top: 35px;
  }
`;
