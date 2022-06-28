import { Avatar } from 'assets/svgs';
import axios from 'axios';
import { GetDate } from 'commons/utils/GetDate';
import ViewStars from 'components/commons/stars/viewStars/ViewStars';
import * as S from './ReviewDetail.styles';
import { v4 as uuid4 } from 'uuid';
import { IMarketReviewDetail } from './ReviewDetail.types';
import Dropdown05 from 'components/commons/dropdown/05/Dropdown05';
import Modal from 'components/commons/modal';
import { useEffect, useState } from 'react';
import ContentModal from 'components/commons/modal/contentModal/contentModal';
import ReviewNew from '../new/ReviewNew.container';
import { useRecoilValue } from 'recoil';
import { userState } from 'recoil/user';
import AlertModal from 'components/commons/modal/alertModal/alertModal';
import { QueryClient, useMutation, useQuery } from 'react-query';
import { marketReviewRoute } from 'utils/APIRoutes';
interface IReviewDetailProps {
  reviewsData: IMarketReviewDetail;
}

interface IReviewMarketData {
  id: string;
  title: string;
  minidescription: string;
  url: string;
}

export default function ReviewDetail(props: IReviewDetailProps) {
  const userInfo = useRecoilValue(userState);
  const [marketData, setMarketData] = useState<IReviewMarketData>();
  // const [reviewData, setReviewData] = useState<IMarketReviewDetail>();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const queryClient = new QueryClient();

  const toggleDeleteModal = () => {
    setIsDeleteOpen(prev => !prev);
  };

  const toggleEditModal = () => {
    setIsEditOpen(prev => !prev);
  };

  const { data: reviewData } = useQuery(
    'getReview',
    async () =>
      await axios
        .get(`${marketReviewRoute}/${props.reviewsData?.id}`)
        .then(res => {
          return res.data;
        })
        .catch(error => {
          console.log(error);
        }),
    {
      onSuccess: res => {
        setMarketData({
          id: res.market.id,
          title: res.market.title,
          minidescription: res.market.minidescription,
          url: res.market.url,
        });
      },
    },
  );

  // const deleteReview = async () => {
  //   await axios
  //     .delete(
  //       `https://earth-mas.shop/server/marketreview/${props.reviewsData.id}`,
  //     )
  //     .then(res => {
  //       console.log(res);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // };

  const { mutate: deleteReview } = useMutation(
    async () => {
      await axios
        .delete(`${marketReviewRoute}/${props.reviewsData.id}`)
        .then(res => {
          console.log(res);
          console.log(res.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    {
      onSuccess: () => {
        // postTodo가 성공하면 todos로 맵핑된 useQuery api 함수를 실행합니다.
        console.log('삭제성공');
        setIsDeleteOpen(false);
        queryClient.invalidateQueries('getReviews');
      },
    },
  );

  useEffect(() => {
    // console.log(props.reviewsData);
  }, [props.reviewsData]);

  return (
    <S.Wrap>
      {isDeleteOpen && (
        <Modal>
          <AlertModal
            title="💬 정말 삭제하시겠어요?"
            contents="해당 상품의 모든 정보가 삭제되며, 복구할 수 없습니다."
            okMessage="네, 삭제할게요"
            cancelMessage="아니오, 취소할게요"
            onClickCancel={toggleDeleteModal}
            onClickOk={deleteReview}
          />
        </Modal>
      )}
      {isEditOpen && (
        <Modal>
          <ContentModal
            onClickCancel={toggleEditModal}
            children={
              <ReviewNew
                onClickCancel={toggleEditModal}
                reviewData={reviewData}
                marketData={marketData}
              />
            }
          />
        </Modal>
      )}
      <div className="user">
        <Avatar />
        <p>{props.reviewsData?.user?.name}</p>
      </div>
      <div className="review">
        <div>
          <ViewStars
            color="sub2"
            contained={
              props.reviewsData?.score && (props.reviewsData?.score / 5) * 100
            }
          />
          <span className="review-date">
            {GetDate(props.reviewsData?.createAt)}
          </span>
        </div>
        <div className="review-image">
          {props.reviewsData?.url !== '' && (
            <ul>
              {props.reviewsData?.url.split(',').map(el => (
                <li key={uuid4()}>
                  <img src={el} />
                </li>
              ))}
            </ul>
          )}
        </div>
        <p className="review-content">{props.reviewsData?.contents}</p>
      </div>
      {userInfo.id === props.reviewsData?.user.id && (
        <Dropdown05
          page="marketreview"
          toggleEditModal={toggleEditModal}
          toggleDeleteModal={toggleDeleteModal}
        />
      )}
    </S.Wrap>
  );
}
