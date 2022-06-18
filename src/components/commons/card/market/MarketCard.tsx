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

interface IMarketCardProps {
  listData: IMarketCard;
}
export default function MarketCard(props: IMarketCardProps) {
  const params = useParams();
  const onClickPostLike = async () => {
    // alert('like');
    await axios
      .post(`https://earth-mas.shop/server/market/like`, { id: params.id })
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const onErrorImg = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = logo;
  };

  const discountPrice = Number(props.listData?.discount);
  const originPrice = Number(props.listData?.amount);
  const discountRate = Math.floor(
    ((originPrice - discountPrice) / originPrice) * 100,
  );

  return (
    <S.Wrap>
      <div className="image-box">
        <div className="like" onClick={onClickPostLike}>
          {/* <HeartWhiteIcon /> */}
          <HeartRedIcon />
        </div>
        <Link to={`/market/${props.listData.id}`} id={props.listData.id}>
          <img
            src={props.listData.url ? props.listData.url : logo}
            alt="상품이미지"
            onError={onErrorImg}
          />
        </Link>
      </div>
      <div className="description-box">
        <h5 className="title">{props.listData.title}</h5>
        <h2 className="price">
          <span className="percent">{discountRate}%</span>
          <span> {discountPrice.toLocaleString()}원</span>
        </h2>
        <S.SubDescription>
          <span>
            <HeartSmallIcon /> {props.listData.like}
          </span>{' '}
          <span>
            <StarSmallIcon /> {props.listData.reviewscore}(
            {props.listData.reviewpeople})
          </span>
        </S.SubDescription>
      </div>
    </S.Wrap>
  );
}
