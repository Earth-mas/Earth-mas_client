import { ChangeEvent, FormEvent, MouseEvent } from 'react';
import { IPostCodeData } from './SignUp.container';
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IProps {
  onClickSignUp: (
    e: MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>,
  ) => void;
  onChangeInputs: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeToken: (e: ChangeEvent<HTMLInputElement>) => void;
  onClickTokenCheck: () => void;
  onClickPhoneNumber: () => void;
  setIsModalOpen: any;
  handleComplete: (data: IPostCodeData) => void;
  emailErrMsg: string | null;
  passwordErrMsg: string | null;
  passwordErrMsg2: string | null;
  nameErrMsg: string | null;
  isTokenSend: boolean;
  min: number;
  sec: number;
  inputs: {
    name: string;
    email: string;
    password: string;
    password2: string;
    phone: string;
    addressnumber: string;
    address1: string;
    address2: string;
  };
  isModalOpen: boolean;
}
