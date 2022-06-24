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

interface IMarketCardProps {
  listData: IMarketCard;
  key?: string;
  myListData?: IMarketList[];
  index: number;
  id?: string;
}

export default function MarketCard(props: IMarketCardProps) {
  const accessToken = store.get('accessToken');
  const [likeActive, setLikeActive] = useState<boolean>();

  const onErrorImg = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = logo;
  };

  const onClickPostLike = async () => {
    const variables = {
      id: props.listData.id,
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
        location.reload();
      })
      .catch(error => {
        console.log(error);
        alert('로그인이 필요한 서비스입니다');
      });
  };

  const findLike = () => {
    if (props.listData && props.myListData) {
      for (let i = 0; i < props.myListData.length; i++) {
        if (props.listData.id === props.myListData[i].id) {
          setLikeActive(true);
        }
      }
    }
  };

  useEffect(() => {
    findLike();
  }, [props.myListData]);

  return (
    <S.Wrap>
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
