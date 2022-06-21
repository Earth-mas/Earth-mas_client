import axios from 'axios';
import { MouseEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as S from './MarketDetail.styles';
import { IMarketDetail } from './MarketDetail.types';
import Title01 from 'components/commons/text/title/Title01';
import DetailOverview from './overview/DetailOverview.container';
import DetailContent from './content/DetailContent.container';
import DetailDelivery from './delivery/DetailDelivery.container';
import ReviewList from '../review/list/ReviewList.container';

export default function MarketDetail() {
  const params = useParams();
  const [nowTab, setNowTab] = useState('content');
  const [detailData, setDetailData] = useState<IMarketDetail>();

  const getMarketItem = async () => {
    await axios
      .get(`https://earth-mas.shop/server/market/${params.id}`)
      .then(res => {
        setDetailData(res.data);
        // console.log(detailData);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const deleteMarketItem = async () => {
    alert('삭제');
    await axios
      .delete(`https://earth-mas.shop/server/market/${params.id}`)
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    getMarketItem();
    // console.log(DetailData);
  }, []);

  const onClickTab = (event: MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    setNowTab(target.id);
  };

  return (
    <S.Wrap>
      <nav>
        <Title01
          content={`마켓 > ${detailData?.marketcategory?.name}`}
          margin={35}
          size="C"
        />
      </nav>
      <DetailOverview
        detailData={detailData}
        deleteMarketItem={deleteMarketItem}
      />
      <nav className="tab-nav">
        <ul>
          <li>
            <a
              id="content"
              onClick={onClickTab}
              className={nowTab === 'content' ? 'active' : ''}
            >
              상세정보
            </a>
          </li>
          <li>
            <a
              id="review"
              onClick={onClickTab}
              className={nowTab === 'review' ? 'active' : ''}
            >
              리뷰 ({detailData?.reviewpeople})
            </a>
          </li>
          <li>
            <a
              id="delivery"
              onClick={onClickTab}
              className={nowTab === 'delivery' ? 'active' : ''}
            >
              배송 및 교환
            </a>
          </li>
        </ul>
      </nav>
      {nowTab === 'content' && (
        <DetailContent description={detailData?.description} />
      )}
      {nowTab === 'review' && (
        <ReviewList
          reviewscore={detailData?.reviewscore}
          reviewpeople={detailData?.reviewpeople}
        />
      )}
      {nowTab === 'delivery' && <DetailDelivery />}
    </S.Wrap>
  );
}
