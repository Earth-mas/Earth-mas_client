import 'react-datepicker/dist/react-datepicker.css';
import { activityRoute } from 'utils/APIRoutes';
import ActivityNewUI from './ActivityNew.presenter';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { IActivityDetailProps } from '../detail/ActivityDetail.types';
import axiosApiInstance from 'commons/utils/axiosInstance';

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

interface IActivityNewProps {
  isEdit?: boolean;
  editData?: IActivityDetailProps;
}

interface IUpdateVariables {
  title?: string;
  dday?: string | null | undefined;
  maxpeople?: number;
  location?: string;
  subdescription?: string;
  description?: string;
  url?: string;
  category?: string;
}

export default function ActivityNew(props: IActivityNewProps) {
  const navigate = useNavigate();
  const [urlString, setUrlString] = useState('');
  const [isSelected, setIsSelected] = useState('');
  const params = useParams();

  const { register, handleSubmit, setValue, trigger, getValues, control } =
    useForm<FormValues>({
      mode: 'onSubmit',
      reValidateMode: 'onChange',
    });

  const handleChangeQuill = (value: string) => {
    setValue('description', value === '<p><br><p>' ? '' : value);
    trigger('description');
  };

  const onClickSubmit = async (data: FormValues) => {
    if (
      !data.title &&
      !data.category &&
      !data.dday &&
      !data.location &&
      !data.maxpeople &&
      !data.subdescription &&
      !data.url
    ) {
      alert('내용을 입력해주세요');
      return;
    }
    const variables = {
      ...data,
      maxpeople: Number(data.maxpeople),
      category: isSelected,
      url: urlString,
    };
    try {
      const regisData = await axiosApiInstance.post(activityRoute, variables);
      navigate(`/activity/${regisData.data?.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const onClickUpdate = async (data: FormValues) => {
    const updateVariables: IUpdateVariables = {
      ...props.editData,
      url: urlString,
    };

    if (data.title) updateVariables.title = data.title;
    if (data.dday) updateVariables.dday = String(data.dday);
    if (data.location) updateVariables.location = data.location;
    if (data.maxpeople) updateVariables.maxpeople = Number(data.maxpeople);
    if (data.subdescription)
      updateVariables.subdescription = data.subdescription;
    if (data.description) updateVariables.description = data.description;
    if (data.url) updateVariables.url = data.url;

    await axiosApiInstance
      .put(
        `https://earth-mas.shop/server/activity/${params.id}`,
        updateVariables,
      )
      .then(res => {
        navigate(`/activity/${res.data?.id}`);
      })
      .catch(error => {
        console.log(error);
        alert('잘못된 주소입니다');
      });
  };

  useEffect(() => {
    setUrlString(String(props.editData?.url));
  }, [props.editData]);

  return (
    <ActivityNewUI
      control={control}
      isSelected={isSelected}
      isEdit={props.isEdit}
      editData={props.editData}
      setIsSelected={setIsSelected}
      onClickSubmit={onClickSubmit}
      onClickUpdate={onClickUpdate}
      register={register}
      handleSubmit={handleSubmit}
      handleChangeQuill={handleChangeQuill}
      urlString={urlString}
      setUrlString={setUrlString}
      contents={getValues('description')}
    />
  );
}
