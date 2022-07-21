import * as S from '../SupportDetail.styles';
import { useQuery } from 'react-query';
import axios from 'axios';
import { supportRoute } from 'utils/APIRoutes';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { ParticipationList } from './ParticipationList.presenter';
import { IParticipationList, ISupported } from './ParticipationList.types';
import { useEffect, useState } from 'react';

let index = 1;

export const ParticipationListContainer = () => {
  const { id } = useParams();

  const [list, setList] = useState<ISupported[]>([]);

  const { data: paymentList } = useQuery('supported', async () => {
    const { data } = await axios.post(`${supportRoute}/supported`, {
      id: id,
    });
    return data;
  });

  const addList = () => {
    const items: ISupported[] = [];

    for (let i = 0; i < 10 && index * 10 + i < paymentList.length; i++) {
      items?.push(paymentList[index * 10 + i]);
    }
    setList([...list, ...items]);

    index++;
  };

  useEffect(() => {
    setList(
      paymentList?.filter((el: IParticipationList, index: number) => {
        if (index < 10) return el;
      }),
    );
  }, [paymentList]);

  return (
    <S.ParticipationList>
      <div className="sticky">
        <p className="title">참여내역</p>

        <p className="totalCount">
          총 <S.Sub1>{paymentList?.length}</S.Sub1>건이 기부되었습니다.
        </p>

        {list
          ?.filter(el => {
            return el;
          })
          ?.map((el: ISupported) => (
            <ParticipationList key={uuidv4()} el={el} />
          ))}

        {paymentList?.length === list?.length ? (
          ''
        ) : (
          <p className="more" onClick={addList}>
            더보기
          </p>
        )}
      </div>
    </S.ParticipationList>
  );
};
