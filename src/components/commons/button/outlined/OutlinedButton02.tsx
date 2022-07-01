import styled from '@emotion/styled';
import { FontFamily, FontSize } from 'styles/FontStyles';
import { Colors } from 'styles/Colors';

interface IOutlinedButton02Props {
  content?: string;
  color: 'main' | 'sub';
  onClick?: () => void | any;
  type?: 'submit' | 'button' | 'reset';
  size?: string;
}

export default function OutlinedButton02(props: IOutlinedButton02Props) {
  return (
    <Button
      size={props.size}
      color={props.color}
      onClick={props.onClick}
      type={props.type}
    >
      {props.content}
    </Button>
  );
}

const Button = styled.button`
  width: ${(props: IOutlinedButton02Props) => {
    if (props.size === 'small') return '100px';
    return '100%';
  }};
  height: ${(props: IOutlinedButton02Props) => {
    if (props.size === 'small') return '30px';
    return '50px;';
  }};
  border-radius: ${(props: IOutlinedButton02Props) => {
    if (props.size === 'small') return '20px';
    return '40px;';
  }};
  border: 1px solid ${Colors.MAIN};
  cursor: pointer;
  font-family: ${(props: IOutlinedButton02Props) => {
    if (props.size === 'small') return `${FontFamily.SEMIBOLD}`;
    return `${FontFamily.BOLD}`;
  }};

  font-size: ${(props: IOutlinedButton02Props) => {
    if (props.size === 'small') return `${FontSize.SMALL}`;
    return `${FontSize.MEDIUM_C};`;
  }};
  color: ${Colors.B60};
  :hover {
    color: ${Colors.MAIN};
  }
`;
