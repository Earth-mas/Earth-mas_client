import styled from '@emotion/styled';
import axios from 'axios';
import ContainedButton02 from 'components/commons/button/contained/ContainedButton02';
import MarketCard from 'components/commons/card/market/MarketCard';
import { IMarketCard } from 'components/commons/card/market/MarketCard.types';
import Category from 'components/commons/category/Category';
import Input02 from 'components/commons/inputs/Input02';
import Title02 from 'components/commons/text/title/Title02';
import { Fragment, useEffect, useState } from 'react';
import { v4 as uuid4 } from 'uuid';

/////

import Modal from 'components/commons/modal';
import ContentModal from 'components/commons/modal/contentModal/contentModal';
import ReviewNew from '../review/new/ReviewNew.container';
import OutlinedButton02 from 'components/commons/button/outlined/OutlinedButton02';
import { IMarketList } from './MarketList.types';

export default function MarketList() {
  const [listData, setListData] = useState<IMarketList[]>();

  const getItems = async () => {
    await axios
      .get(`https://earth-mas.shop/server/market/finddcs`)
      .then(res => {
        console.log(res.data);
        setListData(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    getItems();
    // console.log(DetailData);
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Wrap>
      {isOpen && (
        <Modal>
          <ContentModal
            onClickCancel={() => setIsOpen(prev => !prev)}
            children={
              <ReviewNew onClickCancel={() => setIsOpen(prev => !prev)} />
            }
          />
        </Modal>
      )}

      <div className="input-wrap">
        <Input02 placeholder="상품을 검색해주세요" />
      </div>
      <section className="category">
        <Category page={0} />
      </section>
      <section className="item-list">
        <Title02 content="전체 인기상품" margin={35} />
        <CardWrap>
          {listData &&
            listData.map((el: IMarketCard) => (
              <Fragment key={uuid4()}>
                <MarketCard listData={el} />
                <ContainedButton02
                  color="main"
                  content="리뷰 작성"
                  size="small"
                  onClick={() => setIsOpen(prev => !prev)}
                />
                <OutlinedButton02
                  onClickEdit={() => setIsOpen(prev => !prev)}
                  onClickDelete={() => {
                    alert('delete');
                  }}
                />
              </Fragment>
            ))}
        </CardWrap>
      </section>
    </Wrap>
  );
}
const Wrap = styled.div`
  width: 100%;
  .input-wrap {
    display: flex;
    justify-content: end;
  }
`;

const CardWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 30px;
`;
