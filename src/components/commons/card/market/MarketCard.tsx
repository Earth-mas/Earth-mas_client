import {
  HeartRedIcon,
  HeartSmallIcon,
  HeartWhiteIcon,
  StarSmallIcon,
} from 'assets/svgs';
import * as S from './MarketCard.styles';
import logo from '../../../../assets/svgs/logo/logo-icon-w.svg';
import { Link } from 'react-router-dom';
import { IMarketCard } from './MarketCard.types';
import { SyntheticEvent, useEffect, useState } from 'react';
import axios from 'axios';
import store from 'storejs';
import { getAvg } from 'commons/utils/getStars';
import { getMoney, getPercent } from 'commons/utils/getAmount';
import { IMarketList } from 'components/units/market/list/MarketList.types';
import Modal from 'components/commons/modal';
import ContentModal from 'components/commons/modal/contentModal/contentModal';
import ReviewNew from 'components/units/market/review/new/ReviewNew.container';
import ContainedButton02 from 'components/commons/button/contained/ContainedButton02';
import { useMutation, useQuery } from 'react-query';
import { marketRoute } from 'utils/APIRoutes';

interface IMarketCardProps {
  listData: IMarketCard;
}
interface IVariables {
  variables: {
    id: string;
  };
}

export default function MarketCard(props: IMarketCardProps) {
  const accessToken = store.get('accessToken');
  const [likeActive, setLikeActive] = useState<boolean>();

  const onErrorImg = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = logo;
  };

  // const getItemsILike = async () => {
  //   await axios
  //     .get(`https://earth-mas.shop/server/market/findmylike`, {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     })
  //     .then(res => {
  //       // console.log('like Data :', res.data);
  //       findLike(res.data);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // };

  const findLike = (ItemsLike: IMarketList[]) => {
    if (props.listData) {
      for (let i = 0; i < ItemsLike.length; i++) {
        if (props.listData.id === ItemsLike[i].id) {
          // console.log('찜한 상품: ', ItemsLike[i].id);
          setLikeActive(true);
          break;
        }
        setLikeActive(false);
      }
    }
  };
  const { data } = useQuery(
    ['getItemsLike'],
    async () => {
      const result = await axios.get(`${marketRoute}/findmylike`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return result.data;
    },
    {
      refetchOnWindowFocus: false,
      onSuccess: res => {
        findLike(res);
      },
      onError: error => {
        console.log(error);
      },
    },
  );

  const onClickPostLike = async () => {
    const variables = {
      id: props.listData.id,
    };
    postLike({ variables });
    // console.log(variables);
    // await axios
    //   .post(`https://earth-mas.shop/server/market/like`, variables, {
    //     headers: {
    //       Authorization: `Bearer ${accessToken}`,
    //     },
    //   })
    //   .then(res => {
    //     alert('찜');
    //     console.log(res);
    //     setLikeActive(res.data.isLike ? true : false);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     alert('로그인이 필요한 서비스입니다');
    //   });
  };

  const { mutate: postLike } = useMutation(async (id: IVariables) => {
    // const variables = {
    //   id: props.listData.id,
    // };
    const result = await axios.post(`${marketRoute}1/like`, id, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(result);
  });

  useEffect(() => {
    // getItemsILike();
  }, [likeActive]);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const toggleEditModal = () => {
    setIsEditOpen(prev => !prev);
  };

  const marketData = {
    id: props.listData.id,
    title: props.listData.title,
    minidescription: props.listData.minidescription,
    url: props.listData.url,
  };

  return (
    <S.Wrap>
      {/* {isEditOpen && (
        <Modal>
          <ContentModal
            onClickCancel={toggleEditModal}
            children={
              <ReviewNew
                onClickCancel={toggleEditModal}
                marketData={marketData}
                reviewId={props.listData?.id}
              />
            }
          />
        </Modal>
      )}
      <ContainedButton02
        size="small"
        color="main"
        content=""
        onClick={toggleEditModal}
      /> */}
      <div className="image-box">
        <div className="like" onClick={onClickPostLike}>
          {likeActive ? <HeartRedIcon /> : <HeartWhiteIcon />}
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
  );
}
