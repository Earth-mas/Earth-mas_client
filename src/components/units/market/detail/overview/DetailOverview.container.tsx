import { HeartOutlineRedIcon, ShareIcon } from 'assets/svgs';

import ContainedButton01 from 'components/commons/button/contained/ContainedButton01';
import OutlinedButton01 from 'components/commons/button/outlined/OutlinedButton01';
import * as S from './DetailOverview.styles';
import image from '../../../../../assets/images/market/banner/banner1.jpeg';
import Title01 from 'components/commons/text/title/Title01';
import { IMarketDetail } from '../MarketDetail.types';
import Stars from 'components/commons/stars';
import { v4 as uuid4 } from 'uuid';

const DATA = [
  { image: image },
  { image: image },
  { image: image },
  { image: image },
  { image: image },
];

interface IDetailOverviewProps {
  detailData?: IMarketDetail;
}

export default function DetailOverview(props: IDetailOverviewProps) {
  const discountPrice = Number(props.detailData?.discount);
  const originPrice = Number(props.detailData?.amount);
  const discountRate = ((originPrice - discountPrice) / originPrice) * 100;

  return (
    <main>
      <S.ItemImage>
        <div className="carousel-preview">
          <ul>
            {DATA.map(el => (
              <li className="carousel-preview-image" key={uuid4()}>
                <img src={el.image} />
              </li>
            ))}
          </ul>
        </div>
        <div className="carousel-zoom">
          <div>
            <img src={image} />
          </div>

          {/* state에 url 담아서 보여주기.. 어떻게..? */}
        </div>
      </S.ItemImage>
      <S.ItemInfo>
        <Title01 size="C" content={props.detailData?.title} margin={15} />
        <p className="description">{props.detailData?.minidescription}</p>
        <div className="review">
          <Stars
            contained={
              props.detailData?.reviewscore &&
              (props.detailData?.reviewscore / 5) * 100
            }
            color="main"
          />
          <span>{props.detailData?.reviewpeople}개의 리뷰</span>
        </div>
        <p className="price">
          <span className="price-discount-rate">{discountRate}%</span>
          <span className="price-discount">
            {discountPrice.toLocaleString()}원
          </span>
          <span className="price-origin">{originPrice.toLocaleString()}원</span>
        </p>
        <div className="delivery">
          <div className="delivery-title">
            <span>배송</span>
          </div>
          <ul className="delivery-content">
            <li>택배배송 | 3,000원 (주문시 결제)</li>
            <li>배송지는 개인정보 입력하신 주소로 설정됩니다.</li>
          </ul>
        </div>
        <hr />
        <div className="pay">
          <span className="pay-title">총 결제금액</span>
          <span className="pay-content">
            {(Number(props.detailData?.discount) + 3000).toLocaleString()}원
          </span>
        </div>
        <div className="buttons">
          <ContainedButton01 color="main" content="구매하기" />
          <div className="button-wrap">
            <OutlinedButton01 color="main" content={<HeartOutlineRedIcon />} />
            <OutlinedButton01 color="main" content={<ShareIcon />} />
          </div>
        </div>
      </S.ItemInfo>
    </main>
  );
}
