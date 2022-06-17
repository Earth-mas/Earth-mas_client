import axios from 'axios';
import { useEffect, useState } from 'react';
import { supportRoute } from 'utils/APIRoutes';
import SupportListUI from './SupportList.presenter';
import { ISupportListProps } from './SupportList.types';

export default function SupportList() {
  const [list, setList] = useState<ISupportListProps[]>([]);
  const [select, setSelect] = useState<boolean>(false);

  useEffect(() => {
    const supportFindDcs = async () => {
      if (select) {
        await axios.get(`${supportRoute}/finddday`).then(res => {
          setList(res.data);
        });
      } else {
        await axios.get(`${supportRoute}/finddcs`).then(res => {
          setList(res.data);
        });
      }
    };
    supportFindDcs();
  }, [select]);

  return <SupportListUI list={list} setSelect={setSelect} />;
}
