import axios from 'axios';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { supportRoute } from 'utils/APIRoutes';
import SupportNewUI from './SupportNew.presenter';
import { ISupportNewProps } from './SupportNew.types';
import store from 'storejs';

export interface FormValues {
  title?: string | undefined;
  wishamount?: number | undefined;
  description?: string | undefined;
  dday?: Date | null;
  url?: string | undefined;
}

export default function SupportNew(props: ISupportNewProps) {
  const accessToken = store.get('accessToken');
  const navigate = useNavigate();
  const { id } = useParams();
  const [urls, setUrls] = useState('');

  const { register, handleSubmit, setValue, trigger, control, getValues } =
    useForm({
      mode: 'onSubmit',
      reValidateMode: 'onChange',
    });

  const { mutate } = useMutation(
    ({ formData }: { formData: FormValues }) => {
      return props.isEdit
        ? axios.put(`${supportRoute}/${id}`, formData, {
            headers: { Authorization: `Bearer ${accessToken}` },
          })
        : axios.post(supportRoute, formData, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
    },
    {
      onSuccess: res => {
        console.log(res);
        navigate(`/support/${res.data.id}`);
      },
      onError: err => {
        console.log(err);
        alert('필수 입력사항입니다');
      },
    },
  );

  const handleChangeQuill = (value: string) => {
    setValue('description', value === '<p><br></p>' ? '' : value);
    trigger('description');
  };

  const onClickSubmit = async (data: FormValues) => {
    const formData = {
      ...data,
      url: urls,
    };

    if (
      formData.title === '' &&
      formData.wishamount &&
      formData.dday === undefined &&
      formData.url === '' &&
      formData.description === ''
    ) {
      alert('필수 입력사항입니다');
      return false;
    }

    mutate({ formData });
  };

  const onClickEdit = async (data: FormValues) => {
    if (
      !(data.title && data.wishamount && data.dday) &&
      data.description === props.fetchData?.description &&
      data.url === props.fetchData?.url
    )
      return alert('수정없음');

    const formData: FormValues = {
      ...props.fetchData,
    };
    if (data.title) formData.title = data.title;
    if (data.wishamount) formData.wishamount = Number(data.wishamount);
    if (data.dday) formData.dday = data.dday;
    if (data.description) formData.description = data.description;
    if (data.url) formData.url = urls;

    mutate({ formData });
  };

  return (
    <SupportNewUI
      isEdit={props.isEdit}
      fetchData={props.fetchData}
      control={control}
      urls={urls}
      setUrls={setUrls}
      register={register}
      handleChangeQuill={handleChangeQuill}
      onClickEdit={onClickEdit}
      onClickSubmit={onClickSubmit}
      handleSubmit={handleSubmit}
      contents={getValues('description')}
    />
  );
}
