import styled from '@emotion/styled';
import { ModalXbuttonIcon } from 'assets/svgs';
import ContainedButton03 from 'components/commons/button/contained/ContainedButton03';
import { Colors } from 'styles/Colors';
import { FontSize } from 'styles/FontStyles';

interface IProps {
  onClickOk: () => void;
  title: string;
  contents: string;
  okMessage: string;
}

export default function InfoModal(props: IProps) {
  return (
    <ModalBackground>
      <ModalWrapper>
        <div className="xButton">
          <ModalXbuttonIcon onClick={props.onClickOk} />
        </div>
        <div className="content">
          <h3>{props.title}</h3>
          <p>{props.contents}</p>
        </div>
        <div className="buttons">
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
  z-index: 999;
`;

const ModalWrapper = styled.div`
  display: flex;
  position: absolute;
  top: 30%;
  flex-direction: column;
  width: 340px;
  /* height: 200px; */
  border: 1px solid ${Colors.B40};
  box-shadow: ${Colors.B40} 0 6px 16px;
  overflow: hidden;
  background-color: white;
  border-radius: 20px;
  padding: 15px;
  margin: 0 auto;
  animation: fadein 0.3s ease-in-out;
  @keyframes fadein {
    0% {
      opacity: 0;
      transform: translateY(100px);
    }

    100% {
      opacity: 1;
      transform: none;
    }
  }

  .xButton {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    font-size: ${FontSize.LARGE_C};
    line-height: 20px;
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
    padding-top: 35px;
  }
`;
