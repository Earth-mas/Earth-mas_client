import axios from 'axios';
import SupportNew from 'components/units/support/new/SupportNew.container';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { supportRoute } from 'utils/APIRoutes';

export default function SupportEditPage() {
  const { id } = useParams();

  const { data: fetchData } = useQuery('todos', async () => {
    const { data } = await axios.get(`${supportRoute}/${id}`);
    return data;
  });

  return <SupportNew isEdit={true} fetchData={fetchData} />;
}
