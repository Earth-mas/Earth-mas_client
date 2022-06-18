import styled from '@emotion/styled';
import { Colors } from 'styles/Colors';
import { FontSize } from 'styles/FontStyles';

interface IProps {
  onClickClose: () => void;
  onClickDelete: () => void;
}

export default function AlertModal(props: IProps) {
  return (
    <ModalBackground>
      <ModalWrapper>
        <div className="xButton" onClick={props.onClickClose}>
          x
        </div>
        <div className="content">
          <h3>💬 정말 탈퇴하시겠어요?</h3>
          <p>해당 계정의 모든 정보가 삭제되며, 복구할 수 없습니다.</p>
        </div>
        <div className="buttons">
          <button className="button01" onClick={props.onClickClose}>
            아니오, 취소할게요
          </button>
          <button className="button02" onClick={props.onClickDelete}>
            네, 탈퇴할게요
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
  top: 30%;
  flex-direction: column;
  width: 500px;
  height: 200px;
  border: 1px solid ${Colors.B40};
  overflow: hidden;
  background-color: white;
  border-radius: 20px;
  padding: 10px 20px;
  margin: 0 auto;

  .xButton {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    font-size: ${FontSize.LARGE_C};
    line-height: 20px;
  }

  h3 {
    text-align: center;
    padding-top: 5px;
  }

  P {
    padding-top: 10px;
    text-align: center;
    color: ${Colors.B80};
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
