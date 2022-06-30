import { useEffect, useState } from 'react';

import store from 'storejs';
import ActivityCard from 'components/commons/card/activity/ActivityCard';
import axiosApiInstance from 'commons/utils/axiosInstance';
import { MyActivityWrapper } from './MyPageActivity.styles';
import { ActivityIcon } from 'assets/svgs';
import { IPropsActivityList } from 'components/units/activity/list/ActivityList.container';

export default function MyPageActivity() {
  const [listData, setListData] = useState<IPropsActivityList[]>([]);
  const accessToken = store.get('accessToken');
  useEffect(() => {
    axiosApiInstance
      .post('/mypage/myactivity', null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(res => setListData(res.data));
  }, []);

  return (
    <MyActivityWrapper>
      <div className="title">
        <ActivityIcon />
        <h1>나의 액티비티</h1>
      </div>
      <div className="contentWrapper">
        {listData.length === 0 ? (
          <div>등록한 액티비티가 없습니다.</div>
        ) : (
          <div className="list">
            {listData?.map((el: IPropsActivityList) => (
              <ActivityCard el={el} />
            ))}
          </div>
        )}
      </div>
    </MyActivityWrapper>
  );
}
