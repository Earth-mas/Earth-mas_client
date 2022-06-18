import { watch } from 'fs';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import MarketNewUI from './MarketNew.presenter';

export interface FormValues {
  title?: string;
  stock?: number;
  amount?: number;
  discount?: number;
  minidescription?: string;
}
export default function MarketNew() {
  // const [urls, setUrls] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    // formState: { errors },
  } = useForm<FormValues>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const onClickSubmit = (data: FormValues) => {
    console.log(data);
  };
  return (
    <MarketNewUI
      register={register}
      handleSubmit={handleSubmit}
      onClickSubmit={onClickSubmit}
    />
  );
}
