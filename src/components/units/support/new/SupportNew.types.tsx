import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from 'react';

export interface ISupportNewUIProps {
  setUrls: Dispatch<SetStateAction<string[]>>;
  urls: string[];
  editorChange: () => void;
  onClickSubmit: (arg0: FormEvent<HTMLFormElement>) => void;
  handleChange: (arg0: ChangeEvent<HTMLInputElement>) => void;
  dateChange: (event: Date | null) => void;
  date: Date | null | undefined;
}
