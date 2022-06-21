import styled from '@emotion/styled';
import { FontFamily, FontSize } from 'styles/FontStyles';
import { Colors } from 'styles/Colors';

interface IOutlinedButton02Props {
  onClickEdit: () => void;
  onClickDelete: () => void;
}

export default function OutlinedButton02(props: IOutlinedButton02Props) {
  return (
    <Wrap>
      <ul>
        <li onClick={props.onClickEdit}>수정</li>
        <li onClick={props.onClickDelete}>삭제</li>
      </ul>
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 100px;
  height: 30px;
  border: 1px solid ${Colors.MAIN};
  border-radius: 20px;

  font-family: ${FontFamily.SEMIBOLD};
  font-size: ${FontSize.MEDIUM_T};
  background-color: ${Colors.BW};

  ul {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    li {
      line-height: 30px;
      color: ${Colors.B60};
      font-family: ${FontFamily.BOLD};
      font-size: ${FontSize.SMALL};
      :hover {
        color: ${Colors.MAIN};
        cursor: pointer;
      }
    }
  }
`;
