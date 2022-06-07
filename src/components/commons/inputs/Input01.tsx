import styled from '@emotion/styled';
import { Colors } from 'styles/Colors';
import { FontFamily, FontSize } from 'styles/FontStyles';

const Input = styled.input`
  width: 100%;
  height: 48px;
  border: 1px solid ${Colors.B60};
  border-radius: 8px;
  padding: 14px 20px;
  color: ${Colors.B80};
  font-family: ${FontFamily.MEDIUM};
  font-size: ${FontSize.MEDIUM_C};

  ::placeholder {
    color: ${Colors.B60};
  }
  :focus {
    outline: none;
    border: 1px solid ${Colors.SUB1};
    color: ${Colors.B100};
  }
`;

interface IInput01Props {
  content?: string;
  type: string;
}

export default function Input01(props: IInput01Props) {
  return <Input type={props.type} placeholder={props.content} />;
}
