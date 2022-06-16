import {
  HeartRedIcon,
  HeartSmallIcon,
  HeartWhiteIcon,
  StarSmallIcon,
} from 'assets/svgs';
import * as S from './MarketCard.styles';
import banner1 from '../../../../assets/images/marketBanner/banner1.jpeg';
interface IMarketCardProps {
  cardData: {
    title: string;
    amount: string;
    like: string;
    rating: string;
    review: string;
    url?: string;
  };
}
export default function MarketCard(props: IMarketCardProps) {
  const onClickLike = () => {
    alert('like');
  };

  const onClickDetail = () => {
    alert('move to detail');
  };

  return (
    <S.Wrap>
      <div className="image-box">
        <div className="like" onClick={onClickLike}>
          {/* <HeartWhiteIcon /> */}
          <HeartRedIcon />
        </div>
        <img
          src={props.cardData.url ? props.cardData.url : banner1}
          alt="상품이미지"
          onClick={onClickDetail}
        />
      </div>
      <div className="description-box">
        <h5 className="title">{props.cardData.title}</h5>
        <h2 className="price">
          <span className="percent">27% </span>
          <span> {Number(props.cardData.amount).toLocaleString()}원</span>
        </h2>
        <S.SubDescription>
          <span>
            <HeartSmallIcon /> {props.cardData.like}
          </span>{' '}
          <span>
            <StarSmallIcon /> {props.cardData.rating}({props.cardData.review})
          </span>
        </S.SubDescription>
      </div>
    </S.Wrap>
  );
}
