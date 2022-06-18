import axios from 'axios';
import { useEffect } from 'react';
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
import { useParams } from 'react-router-dom';
import { supportRoute } from 'utils/APIRoutes';
import SupportDetailUI from './SupportDetail.presenter';

export default function SupportDetail() {
  const { id } = useParams();
  // const [detaile, setDetail] = useState();

  const { data } = useQuery('detailList', async () => {
    const { data } = await axios.get(`${supportRoute}/${id}`);
    return data;
  });

  const percent = Math.floor((data?.currentamount / data?.wishamount) * 100);
  const today = new Date();
  const dDay = new Date(data?.dday);
  const leftDay = Math.ceil(
    (today.getTime() - dDay.getTime()) / (1000 * 60 * 60 * 24),
  );

  const queryClient = useQueryClient();

  const { mutate: deleteContent } = useMutation(
    'detailDelete',
    async () => {
      return await axios.delete(`${supportRoute}/${id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('supportList', { refetchInactive: true });
      },
    },
  );

  const { data: list } = useQuery('Support', async () => {
    const { data } = await axios.post(`${supportRoute}/supported`, { id: id });
    return data;
  });
  // console.log(list);

  // console.log('list', list);
  // console.log(data);

  /* useEffect(() => {
    const supportId = async () => {
      await axios
        .get(`${supportRoute}/${id}`)
        .then(res => {
          // console.log(res);
          setDetail(res.data);
        })
        .catch(error => {
          console.log(error);
        });
    };
    supportId();
  }, []); */

  return (
    <SupportDetailUI
      percent={percent}
      leftDay={leftDay}
      data={data}
      deleteContent={deleteContent}
    />
  );
}
