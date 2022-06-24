import styled from '@emotion/styled';
import axios from 'axios';
import ContainedButton02 from 'components/commons/button/contained/ContainedButton02';
import MarketCard from 'components/commons/card/market/MarketCard';
import { IMarketCard } from 'components/commons/card/market/MarketCard.types';
import Category from 'components/commons/category/Category';
import Input02 from 'components/commons/inputs/Input02';
import { Fragment, useEffect, useState } from 'react';
import { v4 as uuid4 } from 'uuid';
import store from 'storejs';

/////

import Modal from 'components/commons/modal';
import ContentModal from 'components/commons/modal/contentModal/contentModal';
import ReviewNew from '../review/new/ReviewNew.container';
import OutlinedButton02 from 'components/commons/button/outlined/OutlinedButton02';
import { IMarketList } from './MarketList.types';
import Title01 from 'components/commons/text/title/Title01';
import Dropdown02 from 'components/commons/dropdown/02/Dropdown02';

export default function MarketList() {
  const [listData, setListData] = useState<IMarketList[]>();
  const [myListData, setMyListData] = useState<IMarketList[]>();
  const [isOpen, setIsOpen] = useState(false);
  const accessToken = store.get('accessToken');
  const [nowCategory, setNowCategory] = useState('전체');
  const [select, setSelect] = useState<boolean>(false);

  const getItemsALl = async () => {
    await axios
      .post(
        `https://earth-mas.shop/server/market/${
          select ? 'finddcs' : 'findlike'
        }`,
        {
          category: nowCategory,
        },
      )
      .then(res => {
        // console.log('all Data :', res.data);
        setListData(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const getItemsMyLike = async () => {
    await axios
      .get(`https://earth-mas.shop/server/market/findmylike`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(res => {
        // console.log('like Data :', res.data);
        setMyListData(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    getItemsALl();
    getItemsMyLike();
    // console.log(DetailData);
  }, [nowCategory, select]);

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
      <nav className="category">
        <Category page={0} setNowCategory={setNowCategory} />
      </nav>
      <main className="item-list">
        <header>
          <Title01 size="T" content={`${nowCategory} `} margin={35} />
          <Dropdown02 page={0} setSelect={setSelect} />
        </header>
        <CardWrap>
          {listData &&
            listData.map((el: IMarketCard, index) => (
              <Fragment key={uuid4()}>
                <MarketCard
                  listData={el}
                  // likeData={likeData}
                  myListData={myListData}
                  index={index}
                  // id={myListData?.id}
                />
                <ContainedButton02
                  color="main"
                  content="리뷰 작성"
                  size="small"
                  onClick={() => setIsOpen(prev => !prev)}
                />
                {/* <OutlinedButton02
                  onClickEdit={() => setIsOpen(prev => !prev)}
                  onClickDelete={() => {
                    alert('delete');
                  }}
                /> */}
              </Fragment>
            ))}
        </CardWrap>
      </main>
    </Wrap>
  );
}
const Wrap = styled.div`
  width: 100%;
  .input-wrap {
    display: flex;
    justify-content: end;
  }
  header {
    display: flex;
    justify-content: space-between;
  }
`;

const CardWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 40px 30px;
`;
