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
import { SyntheticEvent } from 'react';

interface IMarketCardProps {
  listData: IMarketCard;
}
export default function MarketCard(props: IMarketCardProps) {
  const onClickLike = () => {
    alert('like');
  };

  const onErrorImg = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = logo;
  };

  return (
    <S.Wrap>
      <div className="image-box">
        <div className="like" onClick={onClickLike}>
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
          <span className="percent">27% </span>
          <span> {Number(props.listData.amount).toLocaleString()}원</span>
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
