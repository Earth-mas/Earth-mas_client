import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from 'react';

export interface ISupportNewProps {
  isEdit: boolean;
  fetchData:
    | {
        title: string;
        wishamount: number;
        description: string;
        dday: Date | null;
        url: string[];
      }
    | null
    | undefined;
}
export interface ISupportNewUIProps {
  isEdit: boolean;
  setUrls: Dispatch<SetStateAction<string[]>>;
  urls: string[];
  editorChange: (e: SetStateAction<undefined>) => void;
  onClickSubmit: (arg0: FormEvent<HTMLFormElement>) => void;
  handleChange: (arg0: ChangeEvent<HTMLInputElement>) => void;
  onChangeDate: (e: Date | null) => void;
  // dateChange: (event: Date | null) => void;
  date: Date | null | undefined;
  fetchData:
    | {
        title: string;
        wishamount: number;
        description: string;
        dday: Date | null;
        url: string[];
      }
    | null
    | undefined;
}
