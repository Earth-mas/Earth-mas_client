import styled from '@emotion/styled';
import { FontFamily, FontSize } from 'styles/FontStyles';
import { Colors } from 'styles/Colors';
import { FormEvent, MouseEvent } from 'react';

const Button = styled.button`
  width: 100%;
  height: 55px;
  border-radius: 8px;
  cursor: pointer;
  font-family: ${FontFamily.SEMIBOLD};
  font-size: ${FontSize.MEDIUM_T};
  color: ${Colors.BW};
  background-color: ${props => {
    if (props.color === 'main') return Colors.MAIN;
    if (props.color === 'sub') return Colors.SUB1;
  }};
`;

interface IContainedButton01Props {
  content: string;
  color: 'main' | 'sub';
  onClick?: (
    e: MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>,
  ) => void;
  type?: 'submit' | 'button' | 'reset' | undefined;
}

export default function ContainedButton01(props: IContainedButton01Props) {
  return (
    <Button color={props.color} onClick={props.onClick} type={props.type}>
      {props.content}
    </Button>
  );
}
