import axios from 'axios';
import Title01 from 'components/commons/text/title/Title01';
import { useEffect, useState } from 'react';
import * as S from './MarketDetail.styles';
import { DataObject } from './MarketDetail.types';
import DetailOverview from './overview/DetailOverview.container';

const CONTENTS = {
  title: 'NO 플라스틱 주방용품 키트',
  minidescription:
    '에너지를 더해주는 아미노지를 더해주는 아에너지를 더해주는 아미노지를 더해주는 아에너지를 더해주는 아미노지를 더해주는 아에너지를 더해주는 아미노지를 더해주는 아에너지를 더해주는 아미노지를 더해주는 아에너지를 더해주는 아미노지를 더해주는 아에너지를 더해주는 아미노지를 더해주는 아에너지를 더해주는 아미노지를 더해주는 아',
  amount: '80000',
  discount: '76000',
  category: '주방',
  rating: '4.4',
};

export default function MarketDetail() {
  const [detailData, setDetailData] = useState<DataObject>();

  const fetchItem = async () => {
    await axios
      .get(
        `https://earth-mas.shop/server/market/cac7c6d7-3606-4f61-a371-f6c6668b4b87`,
      )
      .then(res => {
        setDetailData(res.data);
        // console.log(detailData);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchItem();
    // console.log(DetailData);
  }, []);

  return (
    <S.Wrap>
      <S.OverviewWrap>
        <nav>
          <Title01
            content={`마켓 > ${CONTENTS.category}`}
            margin={35}
            size="C"
          />
        </nav>
        <DetailOverview detailData={detailData} />
      </S.OverviewWrap>
      <S.TabWrap>
        <nav className="tab-nav">
          <ul>
            <li>
              <a href="#detail">상세정보</a>
            </li>
            <li>
              <a href="#review">리뷰 ({detailData?.reviewpeople})</a>
            </li>
            <li>
              <a href="#delivery">배송 및 교환</a>
            </li>
          </ul>
        </nav>
      </S.TabWrap>
      <DetailOverview detailData={detailData} />
      <DetailOverview detailData={detailData} />

      <a id="detail">아래로 이동 !!</a>
      <a id="review">아래로 이동 !!</a>
      <a id="delivery">아래로 이동 !!</a>
    </S.Wrap>
  );
}
