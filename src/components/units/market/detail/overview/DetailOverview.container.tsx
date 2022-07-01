import { IMarketDetail } from '../MarketDetail.types';
import axios from 'axios';
import { SyntheticEvent, useEffect, useState } from 'react';
import logo from '../../../../../assets/svgs/logo/logo-icon-w.svg';
import store from 'storejs';
import { IMarketList } from '../../list/MarketList.types';
import DetailOverviewUI from './DetailOverview.presenter';
import { useMutation, useQuery } from 'react-query';
import { marketRoute } from 'utils/APIRoutes';
import { useNavigate } from 'react-router-dom';

interface IDetailOverviewProps {
  detailData?: IMarketDetail;
}

export default function DetailOverview(props: IDetailOverviewProps) {
  const accessToken = store.get('accessToken');
  const [image, setImage] = useState('');
  const [likeActive, setLikeActive] = useState<boolean>();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const navigate = useNavigate();

  const onErrorImg = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = logo;
  };

  const toggleDeleteModal = () => {
    setIsDeleteOpen(prev => !prev);
  };

  const { mutate: deleteItem } = useMutation(
    async () => {
      return await axios.delete(`${marketRoute}/${props.detailData?.id}`);
    },
    {
      onSuccess: () => {
        navigate('/market');
      },
    },
  );

  const findLike = (myLike: IMarketList[]) => {
    if (props.detailData) {
      if (myLike.length === 0) return setLikeActive(false);
      for (let i = 0; i < myLike.length; i++) {
        if (props.detailData.id === myLike[i].id) {
          setLikeActive(true);
          break;
        }

        setLikeActive(false);
      }
    }
  };

  const { data, refetch: getItemsLike } = useQuery(
    ['getItemsLike'],
    async () => {
      return await axios.get(`${marketRoute}/findmylike`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    },
    {
      refetchOnWindowFocus: false,
      onSuccess: res => {
        findLike(res.data);
      },
    },
  );

  const onClickPostLike = () => {
    if (props.detailData) postLike(props.detailData.id);
  };

  const { mutate: postLike } = useMutation(
    async (id: string) => {
      const result = await axios.post(
        `${marketRoute}/like`,
        { id },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      return result.data;
    },
    {
      onSuccess: res => {
        res.islike ? alert('찜') : alert('찜 취소');
        getItemsLike();
      },
    },
  );
  useEffect(() => {
    setImage(`${props.detailData?.url.split(',')[0]}`);
  }, [props.detailData]);

  return (
    <DetailOverviewUI
      image={image}
      setImage={setImage}
      onErrorImg={onErrorImg}
      deleteItem={deleteItem}
      onClickPostLike={onClickPostLike}
      toggleDeleteModal={toggleDeleteModal}
      isDeleteOpen={isDeleteOpen}
      detailData={props.detailData}
      likeActive={likeActive}
    />
  );
}
