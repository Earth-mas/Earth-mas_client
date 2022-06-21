import styled from '@emotion/styled';
import { FontFamily, FontSize } from 'styles/FontStyles';
import { Colors } from 'styles/Colors';

interface IContainedButton02Props {
  content?: string;
  color: 'main' | 'sub';
  onClick?: () => void;
  type?: 'submit' | 'button' | 'reset' | undefined;
  size?: 'small';
}

export default function ContainedButton02(props: IContainedButton02Props) {
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
  width: ${(props: IContainedButton02Props) => {
    if (props.size === 'small') return '100px';
    return '100%';
  }};
  height: ${(props: IContainedButton02Props) => {
    if (props.size === 'small') return '30px';
    return '50px;';
  }};
  border-radius: ${(props: IContainedButton02Props) => {
    if (props.size === 'small') return '20px';
    return '40px;';
  }};

  cursor: pointer;
  font-family: ${FontFamily.BOLD};
  font-size: ${(props: IContainedButton02Props) => {
    if (props.size === 'small') return `${FontSize.SMALL}`;
    return `${FontSize.MEDIUM_C};`;
  }};
  color: ${Colors.BW};
  background-color: ${props => {
    if (props.color === 'main') return Colors.MAIN;
    if (props.color === 'sub') return Colors.SUB1;
  }};
`;
