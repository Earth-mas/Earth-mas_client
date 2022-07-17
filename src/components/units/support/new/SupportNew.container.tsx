import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { supportRoute } from 'utils/APIRoutes';
import SupportNewUI from './SupportNew.presenter';
import { FormValues, ISupportNewProps } from './SupportNew.types';
import axiosApiInstance from 'commons/utils/axiosInstance';

export default function SupportNew(props: ISupportNewProps) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [imageUrls, setImageUrls] = useState('');

  const { register, handleSubmit, setValue, trigger, control, getValues } =
    useForm({
      mode: 'onSubmit',
      reValidateMode: 'onChange',
    });

  const { mutate } = useMutation(
    (variables: FormValues) => {
      return !props.isEdit
        ? axiosApiInstance.post(supportRoute, variables)
        : axiosApiInstance.put(`${supportRoute}/${id}`, variables);
    },
    {
      onSuccess: res => {
        props.isEdit
          ? alert('수정이 완료되었습니다')
          : alert('등록이 완료되었습니다');
        navigate(`/support/${res.data.id}`);
        location.reload();
      },
      onError: err => {
        console.log(err);
      },
    },
  );

  const handleChangeQuill = (value: string) => {
    setValue('description', value === '<p><br></p>' ? '' : value);
    trigger('description');
  };

  const onClickSubmit = async (data: FormValues) => {
    const variables = {
      ...data,
      url: imageUrls,
    };

    if (
      variables.title === '' &&
      variables.wishamount &&
      variables.dday === undefined &&
      variables.description === ''
    ) {
      alert('필수 입력사항입니다');
      return false;
    }
    if (!imageUrls) {
      alert('이미지를 등록해주세요');
      return false;
    }
    return mutate(variables);
  };

  const onClickEdit = async (data: FormValues) => {
    if (
      !data.title &&
      !data.wishamount &&
      !data.dday &&
      data.description === props.fetchData?.description &&
      imageUrls === props.fetchData?.url
    )
      return alert('수정사항이 없습니다');

    const variables: FormValues = {
      title: props.fetchData?.title,
      wishamount: props.fetchData?.wishamount,
      dday: props.fetchData?.dday,
      description: props.fetchData?.description,
      url: props.fetchData?.url,
    };

    if (data.title) variables.title = data.title;
    if (data.wishamount) variables.wishamount = Number(data.wishamount);
    if (data.dday) variables.dday = data.dday;
    if (data.description) variables.description = data.description;
    if (imageUrls !== props.fetchData?.url) variables.url = imageUrls;

    mutate(variables);
  };

  return (
    <SupportNewUI
      isEdit={props.isEdit}
      fetchData={props.fetchData}
      control={control}
      urls={imageUrls}
      setUrls={setImageUrls}
      register={register}
      handleChangeQuill={handleChangeQuill}
      onClickEdit={onClickEdit}
      onClickSubmit={onClickSubmit}
      handleSubmit={handleSubmit}
      contents={getValues('description')}
    />
  );
}
