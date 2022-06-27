import styled from '@emotion/styled';
import { Colors } from 'styles/Colors';

const Button = styled.button`
  /* width: 170px; */
  width: 100%;
  height: 40px;
  border-radius: 8px;
  cursor: pointer;
  color: ${props => {
    if (props.color === 'main') return Colors.MAIN;
    if (props.color === 'sub') return Colors.SUB1;
  }};
  background-color: ${Colors.BW};
  border: 1.5px solid;
  border-color: ${props => {
    if (props.color === 'main') return Colors.MAIN;
    if (props.color === 'sub') return Colors.SUB1;
  }};
  :hover {
    background-color: ${props => {
      if (props.color === 'main') return 'rgba(1, 92, 52, 0.05)';
      if (props.color === 'sub') return 'rgba(0, 160, 90, 0.05)';
    }};
  }
`;

interface IOutlinedButton03Props {
  content?: any;
  color: 'main' | 'sub';
  onClick?: () => void;
  type?: 'submit' | 'button' | 'reset' | undefined;
  isModal?: boolean;
}

export default function OutlinedButton03(props: IOutlinedButton03Props) {
  return (
    <Button color={props.color} onClick={props.onClick} type={props.type}>
      {props.content}
    </Button>
  );
}
