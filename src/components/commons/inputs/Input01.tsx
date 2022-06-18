import styled from '@emotion/styled';
import { ChangeEvent } from 'react';
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
  margin-bottom: ${(props: IInput01Props) =>
    props.margin ? `${props.margin}px` : '0px'};

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
  name?: string;
  placeholder?: string;
  type: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  autoComplete?: string;
  id?: string;
  margin?: number;
  value?: string;
  register?: any;
  defaultValue?: string | number | readonly string[] | undefined;
}

export default function Input01(props: IInput01Props) {
  return (
    <Input
      {...props.register}
      type={props.type}
      placeholder={props.placeholder}
      onChange={props.onChange}
      disabled={props.disabled}
      autoComplete={props.autoComplete}
      id={props.id}
      margin={props.margin}
      // value={props.value}
      name={props.name}
      defaultValue={props.defaultValue}
    />
  );
}
