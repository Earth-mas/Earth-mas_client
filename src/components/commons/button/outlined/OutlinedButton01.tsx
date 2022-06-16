import styled from '@emotion/styled';
import { FontFamily, FontSize } from 'styles/FontStyles';
import { Colors } from 'styles/Colors';
import React from 'react';

const Button = styled.button`
  width: 100%;
  height: 55px;
  border-radius: 8px;
  cursor: pointer;
  font-family: ${FontFamily.SEMIBOLD};
  font-size: ${FontSize.MEDIUM_T};
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

interface IOutlinedButton01Props {
  // content?: string | React.SVGProps<SVGSVGElement>
  content?: any;
  color: 'main' | 'sub';
  onClick?: () => void;
  type?: 'submit' | 'button' | 'reset' | undefined;
}

export default function OutlinedButton01(props: IOutlinedButton01Props) {
  return (
    <Button color={props.color} onClick={props.onClick} type={props.type}>
      {props.content}
    </Button>
  );
}
