import axios from 'axios';
import MarketNew from 'components/units/market/new/MarketNew.container';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function MarketEditPage() {
  const [itemData, setItemData] = useState();
  const params = useParams();

  useEffect(() => {
    const getItem = async () => {
      await axios
        .get(`https://earth-mas.shop/server/market/${params.id}`)
        .then(res => {
          //  console.log(res);
          setItemData(res.data);
        })
        .catch(error => {
          console.log(error);
        });
    };
    getItem();
  }, []);

  return <MarketNew isEdit={true} itemData={itemData} />;
}
