import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import MarketNewUI from './MarketNew.presenter';
import store from 'storejs';
import { useNavigate, useParams } from 'react-router-dom';
import {
  FormValues,
  IMarketNewProps,
  IUpdateVariables,
} from './MarketNew.types';

export default function MarketNew(props: IMarketNewProps) {
  const accessToken = store.get('accessToken');
  const [urlString, setUrlString] = useState('');
  const [isSelected, setIsSelected] = useState('');
  const params = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    // formState: { errors }
    getValues,
  } = useForm<FormValues>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const onChangeQuill = (value: any) => {
    setValue('description', value === '<p><br></p>' ? ' ' : value);
    trigger('description');
  };

  const onClickSubmit = async (data: FormValues) => {
    // console.log(data);
    const variables = {
      title: data.title,
      minidescription: data.minidescription,
      description: data.description,
      amount: Number(data.amount),
      discount: Number(data.discount),
      stock: Number(data.stock),
      url: urlString,
      category: isSelected,
    };
    console.log(variables);
    await axios
      .post(`https://earth-mas.shop/server/market/ `, variables, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(res => {
        console.log('응답', res);
        // console.log('상품 id', res.data?.id);
        navigate(`/market/${res.data?.id}`);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const onClickUpdate = async (data: FormValues) => {
    // console.log(data)
    if (
      !data.title &&
      !data.stock &&
      !data.amount &&
      !data.discount &&
      !data.minidescription
    )
      return alert('수정된 내용이 없습니다');

    const updateVariables: IUpdateVariables = {
      title: props.itemData?.title,
      minidescription: props.itemData?.minidescription,
      description: props.itemData?.description,
      amount: props.itemData?.amount,
      discount: props.itemData?.discount,
      stock: props.itemData?.stock,
      url: props.itemData?.url,
      category: props.itemData?.marketcategory.name,
    };
    if (data.title) updateVariables.title = data.title;
    if (data.stock) updateVariables.stock = Number(data.stock);
    if (data.amount) updateVariables.amount = Number(data.amount);
    if (data.discount) updateVariables.discount = Number(data.discount);
    if (data.minidescription)
      updateVariables.minidescription = data.minidescription;
    if (data.description) updateVariables.description = data.description;
    if (urlString) updateVariables.url = urlString;
    console.log(updateVariables);
    await axios
      .put(
        `https://earth-mas.shop/server/market/${params.id} `,
        updateVariables,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      .then(res => {
        console.log('응답', res);
        // console.log('상품 id', res.data?.id);
        navigate(`/market/${res.data?.id}`);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <MarketNewUI
      urlString={urlString}
      setUrlString={setUrlString}
      isEdit={props.isEdit}
      itemData={props.itemData}
      register={register}
      isSelected={isSelected}
      setIsSelected={setIsSelected}
      handleSubmit={handleSubmit}
      onClickSubmit={onClickSubmit}
      onClickUpdate={onClickUpdate}
      onChangeQuill={onChangeQuill}
      contents={getValues('description')}
    />
  );
}
