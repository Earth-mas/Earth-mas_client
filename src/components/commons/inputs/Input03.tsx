import styled from '@emotion/styled';
import { ChangeEvent, LegacyRef } from 'react';
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
  margin-bottom: ${(props: IInput03Props) =>
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

interface IInput03Props {
  inputRef?: LegacyRef<HTMLInputElement> | undefined;
  name?: string;
  placeholder?: string;
  type: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  autoComplete?: string;
  id?: string;
  margin?: number;
  value?: string;
  oninput?: string;
  pattern?: string;
  register?: any;
  defaultValue?: string | number | readonly string[] | undefined;
}

export default function Input03(props: IInput03Props) {
  // console.log('props', props.register);
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
      name={props.name}
      ref={props.inputRef}
      defaultValue={props.defaultValue}
    />
  );
}
