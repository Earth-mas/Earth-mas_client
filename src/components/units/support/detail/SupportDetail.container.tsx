import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { supportRoute } from 'utils/APIRoutes';
import SupportDetailUI from './SupportDetail.presenter';

export default function SupportDetail() {
  const { id } = useParams();
  const queryClient = useQueryClient();

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

  return (
    <SupportDetailUI
      percent={percent}
      leftDay={leftDay}
      data={data}
      deleteContent={deleteContent}
    />
  );
}
