import {
  HeartRedIcon,
  HeartSmallIcon,
  HeartWhiteIcon,
  StarSmallIcon,
} from 'assets/svgs';
import * as S from './MarketCard.styles';
import logo from '../../../../assets/svgs/logo/logo-icon-w.svg';
import { Link } from 'react-router-dom';
import { IMarketCardProps } from './MarketCard.types';
import { SyntheticEvent, useState } from 'react';
import { getAvg } from 'commons/utils/getStars';
import { getMoney, getPercent } from 'commons/utils/getAmount';
import { IMarketList } from 'components/units/market/list/MarketList.types';
import { useMutation, useQuery } from 'react-query';
import { marketRoute } from 'utils/APIRoutes';
import Modal from 'components/commons/modal';
import InfoModal from 'components/commons/modal/infoModal/infoModal';
import axiosApiInstance from 'commons/utils/axiosInstance';

export default function MarketCard(props: IMarketCardProps) {
  const [likeActive, setLikeActive] = useState<boolean>();
  const [likeModal, setLikeModal] = useState(false);
  const [likeModalContent, setLikeModalContent] = useState({
    title: '',
    content: '',
  });

  const toggleLikeModal = () => {
    setLikeModal(prev => !prev);
  };

  const onErrorImg = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = logo;
  };

  const findLike = (ItemsLike: IMarketList[]) => {
    if (ItemsLike.length === 0) return setLikeActive(false);
    for (let i = 0; i < ItemsLike.length; i++) {
      if (props.listData.id === ItemsLike[i].id) {
        setLikeActive(true);
        break;
      }
      setLikeActive(false);
    }
  };
  const { data, refetch: getItemsLike } = useQuery(
    ['getItemsLike'],
    async () => {
      const result = await axiosApiInstance.get(`${marketRoute}/findmylike`);
      return result.data;
    },
    {
      refetchOnWindowFocus: false,
      onSuccess: res => {
        findLike(res);
      },
    },
  );

  const { mutate: postLike } = useMutation(
    async (id: string) => {
      const result = await axiosApiInstance.post(`${marketRoute}/like`, { id });
      return result.data;
    },
    {
      onSuccess: res => {
        setLikeModalContent({
          title: '찜 ❤️',
          content: '찜한 상품은 마이페이지에서 확인 가능합니다',
        });
        res.islike && toggleLikeModal();
        getItemsLike();
      },
      onError: () => {
        setLikeModalContent({
          title: '알림',
          content: '로그인이 필요한 서비스입니다',
        });
        toggleLikeModal();
      },
    },
  );

  return (
    <>
      {likeModal && (
        <Modal>
          <InfoModal
            contents={likeModalContent.content}
            okMessage="확인"
            onClickOk={toggleLikeModal}
            title={likeModalContent.title}
          />
        </Modal>
      )}
      <S.Wrap>
        <div className="image-box">
          <div
            className="like"
            onClick={() => {
              postLike(props.listData.id);
            }}
          >
            {likeActive && <HeartRedIcon />}
            {!likeActive && <HeartWhiteIcon />}
          </div>
          <Link to={`/market/${props.listData.id}`} id={props.listData.id}>
            <img
              src={props.listData.url ? props.listData.url.split(',')[0] : logo}
              alt="상품이미지"
              onError={onErrorImg}
            />
          </Link>
        </div>
        <div className="description-box">
          <h5 className="title">
            [{props.listData.marketcategory.name}] {props.listData.title}
          </h5>
          <h2 className="price">
            <span className="percent">
              {getPercent(props.listData?.amount, props.listData?.discount)}%
            </span>
            <span> {getMoney(props.listData?.discount)}원</span>
          </h2>
          <S.SubDescription>
            <span>
              <HeartSmallIcon /> {props.listData.like}
            </span>{' '}
            <span>
              <StarSmallIcon />{' '}
              {getAvg(props.listData.reviewscore, props.listData.reviewpeople)}(
              {props.listData.reviewpeople})
            </span>
          </S.SubDescription>
        </div>
      </S.Wrap>
    </>
  );
}
