import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';

import { ActivityIcon } from 'assets/svgs';
import { MyActivityWrapper } from './MyPageActivity.styles';
import { IActivityList } from 'components/units/activity/list/ActivityList.types';

import ActivityCard from 'components/commons/card/activity/ActivityCard';
import axiosApiInstance from 'commons/utils/axiosInstance';

export default function MyPageActivity() {
  const [listData, setListData] = useState<IActivityList[]>([]);

  const { mutate: getMyActivityList, isLoading } = useMutation(
    'getMyActivityList',
    async () => {
      return await axiosApiInstance.post('mypage/myactivity', null);
    },
    {
      onSuccess: res => setListData(res.data),
    },
  );

  useEffect(() => {
    getMyActivityList();
  }, []);

  return (
    <MyActivityWrapper>
      <div className="title">
        <ActivityIcon />
        <h1>나의 액티비티</h1>
      </div>
      <div className="contentWrapper">
        {isLoading && <div>로딩 중...</div>}
        {listData?.length === 0 ? (
          <div>등록한 액티비티가 없습니다.</div>
        ) : (
          <div className="list">
            {listData?.map((el: IActivityList) => (
              <ActivityCard el={el} />
            ))}
          </div>
        )}
      </div>
    </MyActivityWrapper>
  );
}
