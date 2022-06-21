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
/* interface IUpdateVariables {
  title?: string | undefined;
  wishamount?: number | undefined;
  description?: string | undefined;
  dday?: Date | null;
  url?: string | undefined;
} */

export default function SupportNew(props: ISupportNewProps) {
  const accessToken = store.get('accessToken');
  const navigate = useNavigate();
  const { id } = useParams();
  const [urls, setUrls] = useState<string[]>([]);
  const transformUrl = urls.toString();

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
      onSuccess: (res: any) => {
        console.log(res);
        navigate(`/support/${res.data.id}`);
      },
      onError: (err: any) => {
        console.log(err);
      },
    },
  );

  const handleChangeQuill = (value: any) => {
    setValue('description', value === '<p><br></p>' ? '' : value);
    trigger('description');
  };

  const onClickSubmit = async (data: FormValues) => {
    const formData = {
      ...data,
      url: transformUrl,
    };

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
      url: transformUrl,
    };
    if (data.title) formData.title = data.title;
    if (data.title) formData.wishamount = Number(data.wishamount);
    if (data.title) formData.dday = data.dday;
    if (data.description) formData.description = data.description;

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
