import {
  HeartRedIcon,
  HeartSmallIcon,
  HeartWhiteIcon,
  StarSmallIcon,
} from 'assets/svgs';
import * as S from './MarketCard.styles';
import logo from '../../../../assets/svgs/logo/logo-icon-w.svg';
import { Link, useParams } from 'react-router-dom';
import { IMarketCard } from './MarketCard.types';
import { SyntheticEvent, useEffect } from 'react';
import axios from 'axios';
import store from 'storejs';
import { getAvg } from 'commons/utils/getStars';
import { getMoney, getPercent } from 'commons/utils/getAmount';

interface IMarketCardProps {
  listData: IMarketCard;
  key?: string;
}

export default function MarketCard(props: IMarketCardProps) {
  const accessToken = store.get('accessToken');
  const params = useParams();

  const onErrorImg = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = logo;
  };

  const onClickPostLike = async () => {
    // alert('like');
    await axios
      .post(
        `https://earth-mas.shop/server/market/like`,
        { id: params.id },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <S.Wrap>
      <div className="image-box">
        <div className="like" onClick={onClickPostLike}>
          {/* <HeartWhiteIcon /> */}
          <HeartRedIcon />
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
        <h5 className="title">{props.listData.title}</h5>
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
