import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import MarketNewUI from './MarketNew.presenter';
import store from 'storejs';
import { useNavigate, useParams } from 'react-router-dom';
import { IMarketDetail } from '../detail/MarketDetail.types';

export interface FormValues {
  title?: string;
  stock?: number;
  amount?: number;
  discount?: number;
  minidescription?: string;
  description?: string;
}

interface IMarketNewProps {
  isEdit: boolean;
  itemData?: IMarketDetail;
}

interface IUpdateVariables {
  title?: string;
  minidescription?: string;
  description?: string;
  url?: string;
  amount?: number;
  discount?: number;
  stock?: number;
  category?: string;
}
export default function MarketNew(props: IMarketNewProps) {
  const accessToken = store.get('accessToken');
  const [urls, setUrls] = useState<string[]>([]);
  const urlString = urls.toString();
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
    // console.log(value);
    setValue('description', value === '<p><br><p>' ? '' : value);
    trigger('description');
  };

  const onClickSubmit = async (data: FormValues) => {
    // console.log(data);
    const variables = {
      ...data,
      amount: Number(data.amount),
      discount: Number(data.discount),
      stock: Number(data.stock),
      category: isSelected,
      url: urlString,
    };
    // console.log(variables);
    // await axios
    //   .post(`https://earth-mas.shop/server/market/ `, variables, {
    //     headers: {
    //       Authorization: `Bearer ${accessToken}`,
    //     },
    //   })
    //   .then(res => {
    //     console.log('응답', res);
    //     // console.log('상품 id', res.data?.id);
    //     // navigate(`/market/${res.data?.id}`);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  };

  const onClickUpdate = async (data: FormValues) => {
    if (
      !data.title &&
      !data.stock &&
      !data.amount &&
      !data.discount &&
      !data.minidescription &&
      data.description === props.itemData?.description &&
      urlString === props.itemData?.url
      // && props.itemData?.marketcategory.name === isSelected
    ) {
      return alert('수정된 내용이 없습니다');
    }

    const updateVariables: IUpdateVariables = {
      ...props.itemData,
    };
    if (data.title) updateVariables.title = data.title;
    if (data.stock) updateVariables.stock = data.stock;
    if (data.amount) updateVariables.amount = data.amount;
    if (data.discount) updateVariables.discount = data.discount;
    if (data.minidescription)
      updateVariables.minidescription = data.minidescription;
    if (data.description) updateVariables.description = data.description;

    // console.log(updateVariables);
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
      urls={urls}
      setUrls={setUrls}
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
