import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supportRoute } from 'utils/APIRoutes';
import SupportListUI from './SupportList.presenter';
import { ISupportListProps } from './SupportList.types';

export default function SupportList() {
  const navigate = useNavigate();
  const [list, setList] = useState<ISupportListProps[]>([]);

  /* const supportFindDday = async () => {
    await axios
      .get(`${supportRoute}/finddcs`)
      .then(res => {
        console.log(res);
        setList(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
  supportFindDday(); */

  useEffect(() => {
    const supportFindDcs = async () => {
      await axios
        .get(`${supportRoute}/finddcs`)
        .then(res => {
          console.log(res);
          setList(res.data);
        })
        .catch(error => {
          console.log(error);
        });
    };
    supportFindDcs();
  }, []);

  return <SupportListUI list={list} />;
}
