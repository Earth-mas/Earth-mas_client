import { IMarketDetail } from '../MarketDetail.types';
import axios from 'axios';
import { SyntheticEvent, useEffect, useState } from 'react';
import logo from '../../../../../assets/svgs/logo/logo-icon-w.svg';
import store from 'storejs';
import { IMarketList } from '../../list/MarketList.types';
import DetailOverviewUI from './DetailOverview.presenter';

interface IDetailOverviewProps {
  detailData?: IMarketDetail;
}

export default function DetailOverview(props: IDetailOverviewProps) {
  const accessToken = store.get('accessToken');
  const [image, setImage] = useState('');
  const [likeActive, setLikeActive] = useState<boolean>();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const onErrorImg = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = logo;
  };

  const toggleDeleteModal = () => {
    setIsDeleteOpen(prev => !prev);
  };

  const deleteMarketItem = async () => {
    await axios
      .delete(`https://earth-mas.shop/server/market/${props.detailData?.id}`)
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const findLike = (myLike: IMarketList[]) => {
    if (props.detailData) {
      for (let i = 0; i < myLike.length; i++) {
        if (props.detailData.id === myLike[i].id) {
          // console.log('찜한 상품: ', props.detailData.id);
          setLikeActive(true);
          break;
        }
      }
    }
  };

  const getItemsMyLike = async () => {
    await axios
      .get(`https://earth-mas.shop/server/market/findmylike`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(res => {
        // console.log('like Data :', res.data);
        findLike(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const onClickPostLike = async () => {
    const variables = {
      id: props.detailData?.id,
    };
    // console.log(variables);
    await axios
      .post(`https://earth-mas.shop/server/market/like`, variables, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(res => {
        alert('찜');
        console.log(res);
        setLikeActive(res.data.isLike ? true : false);
      })
      .catch(error => {
        console.log(error);
        alert('로그인이 필요한 서비스입니다');
      });
  };

  useEffect(() => {
    setImage(`${props.detailData?.url.split(',')[0]}`);
    getItemsMyLike();
  }, [props.detailData]);

  useEffect(() => {
    getItemsMyLike();
  }, [likeActive]);

  return (
    <DetailOverviewUI
      image={image}
      setImage={setImage}
      onErrorImg={onErrorImg}
      deleteMarketItem={deleteMarketItem}
      onClickPostLike={onClickPostLike}
      toggleDeleteModal={toggleDeleteModal}
      isDeleteOpen={isDeleteOpen}
      detailData={props.detailData}
      likeActive={likeActive}
    />
  );
}
