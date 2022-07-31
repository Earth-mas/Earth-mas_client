import axios from 'axios';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { supportRoute } from 'utils/APIRoutes';
import SupportListUI from './SupportList.presenter';

export default function SupportList() {
  const [select, setSelect] = useState<string>('finddcs');
  const [clickPage, setClickPage] = useState(1);

  const { data, refetch, isPreviousData } = useQuery(
    ['supportList', clickPage],
    async () => {
      return await axios.post(`${supportRoute}/${select}`, { page: clickPage });
    },
    { keepPreviousData: true },
  );

  useEffect(() => {
    setClickPage(1);
    refetch();
  }, [select]);

  return (
    <SupportListUI
      data={data}
      setSelect={setSelect}
      refetch={refetch}
      clickPage={clickPage}
      setClickPage={setClickPage}
      isPreviousData={isPreviousData}
    />
  );
}
