import styled from '@emotion/styled';
import { Colors } from 'styles/Colors';
import { FormEvent, MouseEvent } from 'react';

const Button = styled.button`
  /* width: 170px; */
  width: 100%;
  height: 40px;
  border-radius: 8px;
  cursor: pointer;
  color: ${Colors.BW};
  background-color: ${props => {
    if (props.color === 'main') return Colors.MAIN;
    if (props.color === 'sub') return Colors.SUB1;
  }};
`;

interface IContainedButton03Props {
  content?: string;
  color: 'main' | 'sub';
  onClick?: (
    e: MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>,
  ) => void;
  type?: 'submit' | 'button' | 'reset' | undefined;
}

export default function ContainedButton01(props: IContainedButton03Props) {
  return (
    <Button color={props.color} onClick={props.onClick} type={props.type}>
      {props.content}
    </Button>
  );
}
