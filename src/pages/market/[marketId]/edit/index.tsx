import axiosApiInstance from 'commons/utils/axiosInstance';
import MarketNew from 'components/units/market/new/MarketNew.container';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { marketRoute } from 'utils/APIRoutes';

export default function MarketEditPage() {
  const { id } = useParams();
  const { data: itemData } = useQuery(['getItem'], async () => {
    const result = await axiosApiInstance.get(`${marketRoute}/${id}`);
    return result.data;
  });

  return <MarketNew isEdit={true} itemData={itemData} />;
}
