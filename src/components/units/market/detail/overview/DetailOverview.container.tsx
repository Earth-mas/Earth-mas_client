import { HeartOutlineRedIcon, ShareIcon } from 'assets/svgs';
import ContainedButton01 from 'components/commons/button/contained/ContainedButton01';
import OutlinedButton01 from 'components/commons/button/outlined/OutlinedButton01';
import * as S from './DetailOverview.styles';
import image from '../../../../../assets/images/market/banner/banner1.jpeg';
import Title01 from 'components/commons/text/title/Title01';
import { IMarketDetail } from '../MarketDetail.types';
import Stars from 'components/commons/stars';
import { v4 as uuid4 } from 'uuid';
import Dropdown03 from 'components/commons/dropdown/03/Dropdown03';
import { useState } from 'react';
import Modal from 'components/commons/modal';
import ContentModal from 'components/commons/modal/contentModal/contentModal';
import ReviewNew from '../../review/new/ReviewNew.container';

import store from 'storejs';
import axios from 'axios';

interface IDetailOverviewProps {
  detailData?: IMarketDetail;
  deleteMarketItem: () => void;
}

export default function DetailOverview(props: IDetailOverviewProps) {
  const discountPrice = Number(props.detailData?.discount);
  const originPrice = Number(props.detailData?.amount);
  const discountRate = Math.floor(
    ((originPrice - discountPrice) / originPrice) * 100,
  );
  // console.log(props.detailData?.url);

  const accessToken = store.get('accessToken');
  const [isOpen, setIsOpen] = useState(false);
  const [contents, setContents] = useState('');

  const onClickSubmit = async () => {
    const variables = {
      contents,
      score: 4,
      market: '마켓상품 id',
    };
    console.log(variables);
    // await axios
    //   .post(`https://earth-mas.shop/server/marketreview/ `, variables, {
    //     headers: {
    //       Authorization: `Bearer ${accessToken}`,
    //     },
    //   })
    //   .then(res => {
    //     console.log('응답', res);
    //     setIsOpen(prev => !prev);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  };

  return (
    <main>
      {isOpen && (
        <Modal>
          <ContentModal
            cancelMessage="취소"
            okMessage="리뷰 등록"
            onClickCancel={() => setIsOpen(prev => !prev)}
            onClickOk={onClickSubmit}
            children={
              <ReviewNew
                title="상품 명"
                minidescription="상품 짧은 설명"
                id="상품 아이디"
                contents={contents}
                setContents={setContents}
              />
            }
          />
        </Modal>
      )}

      <S.ItemImage>
        <div className="carousel-preview">
          <ul>
            {props.detailData?.url.split(',').map(el => (
              <li className="carousel-preview-image" key={uuid4()}>
                <img src={el} />
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
        <div className="title-wrap">
          <Title01 size="C" content={props.detailData?.title} margin={15} />
          <Dropdown03 page="market" deleteContent={props.deleteMarketItem} />
        </div>
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
            <OutlinedButton01
              color="main"
              content={<HeartOutlineRedIcon />}
              onClick={() => setIsOpen(prev => !prev)}
            />
            <OutlinedButton01 color="main" content={<ShareIcon />} />
          </div>
        </div>
      </S.ItemInfo>
    </main>
  );
}
