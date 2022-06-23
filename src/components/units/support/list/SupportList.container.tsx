import axios from 'axios';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { supportRoute } from 'utils/APIRoutes';
import SupportListUI from './SupportList.presenter';

export default function SupportList() {
  const [select, setSelect] = useState<boolean>(false);
  const [clickPage, setClickPage] = useState(1);
  const [startPage, setStartPage] = useState(1);

  const { data, refetch } = useQuery('supportList', async () => {
    return select
      ? axios.post(`${supportRoute}/finddday`, { page: clickPage })
      : axios.post(`${supportRoute}/finddcs`, { page: clickPage });
  });

  useEffect(() => {
    refetch();
  }, [select]);

  return (
    <SupportListUI
      data={data}
      setSelect={setSelect}
      refetch={refetch}
      clickPage={clickPage}
      setClickPage={setClickPage}
      startPage={startPage}
      setStartPage={setStartPage}
    />
  );
}
