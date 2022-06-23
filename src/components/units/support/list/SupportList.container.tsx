import axios from 'axios';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { supportRoute } from 'utils/APIRoutes';
import SupportListUI from './SupportList.presenter';

export default function SupportList() {
  const [select, setSelect] = useState<boolean>(false);

  const { data, refetch } = useQuery('supportList', () => {
    return select
      ? axios.post(`${supportRoute}/finddcs`, { page: 1 })
      : axios.post(`${supportRoute}/finddday`, { page: 1 });
  });

  // console.log(data);

  function refetchList() {
    if (select) {
      refetch();
    } else {
      refetch();
    }
  }
  useEffect(() => {
    refetchList();
  }, [select]);

  return <SupportListUI data={data} setSelect={setSelect} />;
}
