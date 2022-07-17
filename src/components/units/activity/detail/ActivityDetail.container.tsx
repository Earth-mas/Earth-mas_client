import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { activityRoute } from 'utils/APIRoutes';
import { IActivityDetailProps } from './ActivityDetail.types';
import ActivityDetailUI from './ActivityDetail.presenter';
import axiosApiInstance from 'commons/utils/axiosInstance';

export default function ActivityDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activityData, setActivityData] = useState<IActivityDetailProps>();
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  const getActivityData = async () => {
    await axiosApiInstance
      .get(`${activityRoute}/${id}`)
      .then(res => {
        setActivityData(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const deleteActivityData = async () => {
    await axiosApiInstance
      .delete(`${activityRoute}/${id}`)
      .then(res => {
        setIsDeleteModal(res.data);
      })
      .catch(error => {
        console.log(error);
      });
    navigate('/activity');
  };

  useEffect(() => {
    getActivityData();
  }, []);

  const toggleJoinModal = () => {
    setIsJoinModalOpen(prev => !prev);
  };

  const toggleDeleteModal = () => {
    setIsDeleteModal(prev => !prev);
  };

  const joinChat = async () => {
    await axiosApiInstance
      .post(`${activityRoute}/join`, { activity: id })
      .then(res => {
        console.log(res);
        navigate('/chat');
      })
      .catch(err => {
        if (err.response.status === 409) toggleJoinModal();
        return alert('이미 참여한 활동입니다!');
      });
  };

  // 리액트쿼리 버전
  // const { mutate: joinChat } = useMutation(
  //   async () => {
  //     return await axios.post(
  //       `${activityRoute}/join`,
  //       { activity: id },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       },
  //     );
  //   },
  //   {
  //     onSuccess: res => {
  //       console.log(res);
  //     },
  //     onError: (err: AxiosError) => {
  //       if (err?.response?.status === 409) toggleJoinModal();
  //       return alert('이미 참여한 활동입니다!');
  //     },
  //   },
  // );

  // const onClickJoinChat = () => {
  //   mutate();
  // };

  return (
    <>
      <ActivityDetailUI
        activityData={activityData}
        isJoinModalOpen={isJoinModalOpen}
        isDeleteModal={isDeleteModal}
        deleteActivityData={deleteActivityData}
        toggleJoinModal={toggleJoinModal}
        toggleDeleteModal={toggleDeleteModal}
        joinChat={joinChat}
      />
    </>
  );
}
