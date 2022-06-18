import axios from 'axios';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { supportRoute } from 'utils/APIRoutes';
import SupportListUI from './SupportList.presenter';

export default function SupportList() {
  const [select, setSelect] = useState<boolean>(false);

  const { data, refetch } = useQuery('supportList', () => {
    return axios.get(
      select ? `${supportRoute}/finddcs` : `${supportRoute}/finddday`,
    );
  });

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

  // console.log();

  return <SupportListUI list={data} setSelect={setSelect} />;
}
