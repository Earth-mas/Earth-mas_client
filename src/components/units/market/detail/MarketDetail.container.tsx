import axios from 'axios';
import { MouseEvent, Suspense, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as S from './MarketDetail.styles';
import { IMarketDetail } from './MarketDetail.types';
import Title01 from 'components/commons/text/title/Title01';
import DetailOverview from './overview/DetailOverview.container';
import DetailContent from './content/DetailContent.container';
import DetailDelivery from './delivery/DetailDelivery.container';
import ReviewList from '../review/list/ReviewList.container';
import { useQuery } from 'react-query';
import { marketRoute } from 'utils/APIRoutes';

export default function MarketDetail() {
  const params = useParams();
  const [nowTab, setNowTab] = useState('content');
  // const [detailData, setDetailData] = useState<IMarketDetail>();

  const onClickTab = (event: MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    setNowTab(target.id);
  };

  const { data: detailData } = useQuery(
    'getItem',
    async () =>
      await axios
        .get(`${marketRoute}/${params.id}`)
        .then(res => {
          return res.data;
        })
        .catch(error => {
          console.log(error);
        }),
  );

  const tabMenu = [
    { id: 'content', name: '상세정보' },
    { id: 'review', name: `리뷰 (${detailData?.reviewpeople})` },
    { id: 'delivery', name: '배송 및 교환' },
  ];

  useEffect(() => {
    // getItem();
    // console.log(DetailData);
    console.log('useEffect :', detailData);
  }, [detailData]);

  return (
    <S.Wrap>
      <nav>
        <Title01
          content={`마켓 > ${detailData?.marketcategory?.name}`}
          margin={35}
          size="C"
        />
      </nav>
      <DetailOverview detailData={detailData} />

      <nav className="tab-nav">
        <ul>
          {tabMenu.map(el => (
            <li key={el.id}>
              <span
                id={el.id}
                onClick={onClickTab}
                className={nowTab === `${el.id}` ? 'active' : ''}
              >
                {el.name}
              </span>
            </li>
          ))}
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
