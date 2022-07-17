import axios from 'axios';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { supportRoute } from 'utils/APIRoutes';
import SupportDetailUI from './SupportDetail.presenter';

export default function SupportDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [modal, setModal] = useState(false);

  const { data } = useQuery('detailList', async () => {
    const { data } = await axios.get(`${supportRoute}/${id}`);
    return data;
  });

  const percent = Math.floor((data?.currentamount / data?.wishamount) * 100);
  const today = new Date();
  const dDay = new Date(data?.dday);
  const leftDay = Math.ceil(
    (today.getTime() - dDay.getTime()) / (1000 * 60 * 60 * 24) - 1,
  );

  const openModal = () => {
    setModal(prev => !prev);
  };

  const { mutate: deleteContent } = useMutation(
    'detailDelete',
    async () => {
      return await axios.delete(`${supportRoute}/${id}`);
    },
    {
      onSuccess: () => {
        setModal(prev => !prev);
        queryClient.invalidateQueries('supportList', { refetchInactive: true });
        navigate('/support');
        alert('삭제가 완료되었습니다');
      },
      onError: err => {
        console.log(err);
      },
    },
  );

  return (
    <SupportDetailUI
      percent={percent}
      leftDay={leftDay}
      data={data}
      deleteContent={deleteContent}
      modal={modal}
      openModal={openModal}
    />
  );
}
