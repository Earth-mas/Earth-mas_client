import styled from '@emotion/styled';
import { CalenderIcon } from 'assets/svgs';
import axios from 'axios';
import { GetDate } from 'commons/utils/GetDate';
import Blank from 'components/commons/blank/Blank';
import ContainedButton01 from 'components/commons/button/contained/ContainedButton01';
import Modal from 'components/commons/modal';
import AlertModal from 'components/commons/modal/alertModal/alertModal';
import Slide from 'components/commons/slide';
import DOMPurify from 'dompurify';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Colors } from 'styles/Colors';
import { FontFamily, FontSize } from 'styles/FontStyles';
import { activityRoute } from 'utils/APIRoutes';
import Dropdown06 from 'components/commons/dropdown/06/Dropdown06';

export interface ActivityDetail {
  activityjoin: Activityjoin[];
  activitycategory: Activitycategory;
  createAt: string;
  dday: string;
  deleteAt?: string;
  description: string;
  id: string;
  location: string;
  maxpeople: number | null;
  people: number;
  subdescription: string;
  title: string;
  updateAt: string;
  url?: string;
  user: User;
}

interface Activitycategory {
  category?: string;
  createAt?: string;
  deleteAt?: string;
  id: string;
}

interface Activityjoin {
  admin: string;
  id: string;
  user: User;
}

interface User {
  address1: string;
  address2: string;
  addressnumber: string;
  createAt: string;
  delete?: string | null;
  email: string;
  id: string;
  name: string | undefined;
  password: string;
  phone: string;
  role: string;
  updateAt: string;
  url: string | undefined;
}

interface IpropsMainImg {
  width?: number;
  height?: number;
}

export default function ActivityDetail() {
  const navigate = useNavigate();
  const params = useParams();
  const [activityData, setActivityData] = useState<ActivityDetail>();
  const [isJoinModalOpen, setISJoinModalOpen] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  const getActivityData = async () => {
    await axios
      .get(`https://earth-mas.shop/server/activity/${params.id}`)
      .then(res => {
        setActivityData(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const deleteActivityData = async () => {
    await axios
      .delete(`${activityRoute}/${params.id}`)
      .then(res => {
        console.log(res.data);
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

  const onClickJoinandCancel = () => {
    setISJoinModalOpen(prev => !prev);
  };

  const onClickOpenDeleteModal = () => {
    setIsDeleteModal(prev => !prev);
  };

  const onClickJoinChat = () => {
    navigate('/chat/groupChat');
  };

  return (
    <>
      {isDeleteModal && (
        <Modal>
          <AlertModal
            title="❗게시글을 삭제할 경우 해당 게시글에 대한 정보는 복구가 불가능합니다."
            contents="그래도 삭제하시겠습니까?"
            okMessage="삭제하기"
            cancelMessage="취소"
            onClickOk={deleteActivityData}
            onClickCancel={onClickOpenDeleteModal}
          />
        </Modal>
      )}
      {isJoinModalOpen && (
        <Modal>
          <AlertModal
            title="해당 작성자와 1:1 채팅 또는 단체 채팅으로 참여할 수 있습니다."
            contents="참여하시겠습니까?"
            okMessage="참여하기"
            cancelMessage="취소"
            onClickOk={onClickJoinChat}
            onClickCancel={onClickJoinandCancel}
          />
        </Modal>
      )}
      <Wrap>
        <MainImg>
          <Slide banner={activityData?.url?.split(',')} slide={'sub'} />
        </MainImg>
        <Blank height={50} />
        <PostBox>
          <p className="title">{activityData?.title}</p>
          <Blank height={25} />
          <div className="postInfoBox">
            <div className="userInfo">
              <img
                src={activityData?.activityjoin[0].user?.url}
                onError={event =>
                  (event.currentTarget.src = '/images/logo-icon.png')
                }
              />
              <span>
                {activityData?.activityjoin[0].user?.name
                  ? activityData.activityjoin[0].user?.name
                  : '에러지롱!'}
              </span>
            </div>
            <section className="detailInfo">
              <div>
                <CalenderIcon className="icon" />
                {GetDate(activityData?.createAt)}~{GetDate(activityData?.dday)}
              </div>
              <ul>
                <text>카테고리</text>
                <li>{activityData?.activitycategory?.category}</li>
                <text>지역</text>
                <li>{activityData?.location}</li>
                <text>모집인원</text>
                <li>
                  {activityData?.maxpeople
                    ? Number(activityData?.maxpeople)
                    : '나오겠냐?'}
                  명
                </li>
              </ul>
            </section>
            <section className="icon2">
              <Dropdown06
                page={'activity'}
                toggleDeleteModal={onClickOpenDeleteModal}
              />
            </section>
          </div>
          <Blank height={25} />
          <div className="postContents">
            준비물 :{activityData?.subdescription}
            <br />
            본문 :
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(String(activityData?.description)),
              }}
            />
          </div>
        </PostBox>
        <div className="button" style={{ margin: 'auto' }}>
          <ContainedButton01
            content={'참여하기'}
            color={'main'}
            type="submit"
            onClick={onClickJoinandCancel}
          />
        </div>
        <Blank height={100} />
      </Wrap>
    </>
  );
}

const Wrap = styled.div`
  max-width: 1024px;
  width: 100%;
  margin-top: 50px;
  .button {
    width: 20%;
  }
`;

const MainImg = styled.div`
  width: 100%;
  /* height: ${(props: IpropsMainImg) =>
    props.height ? `${380}px` : 'none'}; */
  height: 380px;
  border-radius: 5px;
`;

const PostBox = styled.div`
  width: 100%;
  .title {
    font-family: ${FontFamily.BOLD};
    font-size: ${FontSize.LARGE_T};
  }

  .postInfoBox {
    height: 80px;
    border: 1px solid ${Colors.B60};
    border-radius: 8px;
    padding: 12px 20px;
    display: flex;

    & img {
      width: 45px;
      height: 45px;
      border-radius: 50%;
    }

    .userInfo {
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: space-between;
      width: 12%;
      margin-right: 20px;
    }

    .detailInfo {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
  }

  .icon {
    margin-right: 5px;
  }
  .icon2 {
    margin-top: 15px;
    margin-left: auto;
  }

  UL {
    text {
      color: ${Colors.B60};
      margin-right: 5px;
    }
  }
  li {
    display: inline;
    font-size: ${FontSize.MEDIUM_C};
    margin-right: 20px;
  }

  .postContents {
    padding: 20px;
  }
`;
