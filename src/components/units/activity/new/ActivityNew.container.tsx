import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import store from 'storejs';
import { activityRoute } from 'utils/APIRoutes';
import ActivityNewUI from './ActivityNew.presenter';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

export interface FormValues {
  title?: string;
  dday?: Date | null;
  maxpeople?: number;
  location?: string;
  subdescription?: string;
  description?: string;
  url?: string;
  category?: string;
}

export default function ActivityNew() {
  const navigate = useNavigate();
  const accessToken = store.get('accessToken');
  const [urls, setUrls] = useState<string[]>([]);
  const urlsToString = urls.toString();
  const [isSelected, setIsSelected] = useState('');

  const { register, handleSubmit, setValue, trigger, getValues, control } =
    useForm<FormValues>({
      mode: 'onSubmit',
      reValidateMode: 'onChange',
    });

  const handleChangeQuill = (value: string) => {
    console.log(value);
    setValue('description', value === '<p><br><p>' ? '' : value);
    trigger('description');
  };

  const onClickSubmit = async (data: FormValues) => {
    console.log('등록할 데이터: ', data);
    // if (!data) {
    //   alert('내용을 입력해주세요');
    //   return;
    // }
    const variables = {
      ...data,
      category: isSelected,
      url: urlsToString,
    };
    try {
      const regisData = await axios.post(activityRoute, variables, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      navigate(`/activity/${regisData.data?.id}`);
      console.log('등록된 데이터:', regisData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ActivityNewUI
      control={control}
      isSelected={isSelected}
      setIsSelected={setIsSelected}
      onClickSubmit={onClickSubmit}
      register={register}
      handleSubmit={handleSubmit}
      handleChangeQuill={handleChangeQuill}
      urls={urls}
      setUrls={setUrls}
      contents={getValues('description')}
    />
  );
}
