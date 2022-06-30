import axios from 'axios';
import MarketNew from 'components/units/market/new/MarketNew.container';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { marketRoute } from 'utils/APIRoutes';

export default function MarketEditPage() {
  const { id } = useParams();

  const { data: itemData } = useQuery(['getItem'], async () => {
    const result = await axios.get(`${marketRoute}/${id}`);
    return result.data;
  });

  return <MarketNew isEdit={true} itemData={itemData} />;
}
