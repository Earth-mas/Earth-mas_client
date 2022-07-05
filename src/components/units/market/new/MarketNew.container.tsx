import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import MarketNewUI from './MarketNew.presenter';
import store from 'storejs';
import { useNavigate, useParams } from 'react-router-dom';
import {
  FormValues,
  IMarketNewProps,
  INewVariables,
  IUpdateVariables,
} from './MarketNew.types';
import { useMutation } from 'react-query';
import { marketRoute } from 'utils/APIRoutes';
import Modal from 'components/commons/modal';
import InfoModal from 'components/commons/modal/infoModal/infoModal';

export default function MarketNew(props: IMarketNewProps) {
  const accessToken = store.get('accessToken');
  const [urlString, setUrlString] = useState('');
  const [isSelected, setIsSelected] = useState('');
  const [editItemData, setEditItemData] = useState<IUpdateVariables>();
  const [isModal, setIsModal] = useState(false);
  const [isModalContent, setIsModalContent] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  const { register, handleSubmit, setValue, trigger, getValues } =
    useForm<FormValues>({
      mode: 'onSubmit',
      reValidateMode: 'onChange',
    });

  const onChangeQuill = (value: string) => {
    setValue('description', value === '<p><br></p>' ? ' ' : value);
    trigger('description');
  };

  const onClickSubmit = async (data: FormValues) => {
    // if (
    //   !data.title ||
    //   !data.stock ||
    //   !data.amount ||
    //   !data.minidescription ||
    //   !isSelected
    // ) {
    //   setIsModalContent('필수 항목을 입력해주세요');
    //   setIsModal(true);
    //   return;
    // }

    // const variables = {
    //   title: data.title,
    //   minidescription: data.minidescription,
    //   description: data.description,
    //   amount: Number(data.amount),
    //   discount: Number(data.discount),
    //   stock: Number(data.stock),
    //   url: urlString,
    //   category: isSelected,
    // };

    const variables = {
      title: '페이지네이션 테스트',
      minidescription: '페이지네이션 테스트',
      description: '페이지네이션 테스트',
      amount: 2000,
      discount: 2000,
      stock: 200,
      url: 'ㅁㅁㅁ',
      category: '주방',
    };
    newItem(variables);
  };

  const { mutate: newItem } = useMutation(
    async (variables: INewVariables) => {
      const result = await axios.post(`${marketRoute}/ `, variables, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return result.data;
    },
    {
      onSuccess: res => {
        setIsModalContent('상품이 등록되었습니다');
        setIsModal(true);
        navigate(`/market/${res.id}`);
      },
    },
  );

  const onClickUpdate = async (data: FormValues) => {
    const updateVariables: IUpdateVariables = {
      ...editItemData,
      category: props.itemData?.marketcategory.name,
    };
    if (data.title) updateVariables.title = data.title;
    if (data.stock) updateVariables.stock = Number(data.stock);
    if (data.amount) updateVariables.amount = Number(data.amount);
    if (data.discount) updateVariables.discount = Number(data.discount);
    if (data.minidescription)
      updateVariables.minidescription = data.minidescription;
    if (data.description) updateVariables.description = data.description;
    if (urlString !== editItemData?.url) updateVariables.url = urlString;

    updateItem(updateVariables);
  };
  const { mutate: updateItem } = useMutation(
    async (variables: IUpdateVariables) => {
      const result = await axios.put(`${marketRoute}/${id}`, variables, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return result.data;
    },
    {
      onSuccess: res => {
        setIsModalContent('상품이 되었습니다');
        setIsModal(true);
        navigate(`/market/${res.id}`);
      },
    },
  );

  useEffect(() => {
    setEditItemData({
      title: props.itemData?.title,
      minidescription: props.itemData?.minidescription,
      description: props.itemData?.description,
      url: props.itemData?.url,
      amount: props.itemData?.amount,
      discount: props.itemData?.discount,
      stock: props.itemData?.stock,
    });
  }, [props.itemData]);
  return (
    <>
      {isModal && (
        <Modal>
          <InfoModal
            contents={isModalContent}
            okMessage="확인"
            onClickOk={() => {
              setIsModal(false);
            }}
            title="알림"
          />
        </Modal>
      )}
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
    </>
  );
}
