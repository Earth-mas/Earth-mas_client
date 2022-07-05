import { IMarketDetail } from '../MarketDetail.types';
import axios from 'axios';
import { SyntheticEvent, useEffect, useState } from 'react';
import logo from '../../../../../assets/svgs/logo/logo-icon-w.svg';
import store from 'storejs';
import { IMarketList } from '../../list/MarketList.types';
import DetailOverviewUI from './DetailOverview.presenter';
import { useMutation, useQuery } from 'react-query';
import { marketRoute } from 'utils/APIRoutes';
import { useNavigate } from 'react-router-dom';
import Modal from 'components/commons/modal';
import InfoModal from 'components/commons/modal/infoModal/infoModal';
import { getUrl } from 'commons/utils/getUrl';
import { IDetailOverviewProps } from './DetailOverview.types';

export default function DetailOverview(props: IDetailOverviewProps) {
  const accessToken = store.get('accessToken');
  const [image, setImage] = useState('');
  const [likeActive, setLikeActive] = useState<boolean>();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [infoModal, setInfoModal] = useState(false);
  const navigate = useNavigate();
  const [infoModalContent, setInfoModalContent] = useState({
    title: '',
    content: '',
  });

  const onErrorImg = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = logo;
  };

  const toggleDeleteModal = () => {
    setIsDeleteOpen(prev => !prev);
  };

  const toggleInfoModal = () => {
    setInfoModal(prev => !prev);
  };

  const onClickShare = () => {
    setInfoModalContent(getUrl(window.location.href));
    toggleInfoModal();
  };

  const { mutate: deleteItem } = useMutation(
    async () => {
      return await axios.delete(`${marketRoute}/${props.detailData?.id}`);
    },
    {
      onSuccess: () => {
        navigate('/market');
      },
    },
  );

  const findLike = (myLike: IMarketList[]) => {
    if (props.detailData) {
      if (myLike.length === 0) return setLikeActive(false);
      for (let i = 0; i < myLike.length; i++) {
        if (props.detailData.id === myLike[i].id) {
          setLikeActive(true);

          break;
        }
        setLikeActive(false);
      }
    }
  };

  const { data, refetch: getItemsLike } = useQuery(
    ['getItemsLike'],
    async () => {
      return await axios.get(`${marketRoute}/findmylike`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    },
    {
      refetchOnWindowFocus: false,
      onSuccess: res => {
        findLike(res.data);
      },
    },
  );

  const onClickPostLike = () => {
    if (props.detailData) postLike(props.detailData.id);
  };

  const { mutate: postLike } = useMutation(
    async (id: string) => {
      const result = await axios.post(
        `${marketRoute}/like`,
        { id },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      return result.data;
    },
    {
      onSuccess: res => {
        setInfoModalContent({
          title: '찜 ❤️',
          content: '찜한 상품은 마이페이지에서 확인 가능합니다',
        });
        res.islike && toggleInfoModal();
        getItemsLike();
      },
      onError: () => {
        setInfoModalContent({
          title: '알림',
          content: '로그인이 필요한 서비스입니다',
        });
        toggleInfoModal();
      },
    },
  );
  useEffect(() => {
    setImage(`${props.detailData?.url.split(',')[0]}`);
  }, [props.detailData]);

  return (
    <>
      {infoModal && (
        <Modal>
          <InfoModal
            okMessage="확인"
            onClickOk={toggleInfoModal}
            title={infoModalContent.title}
            contents={infoModalContent.content}
          />
        </Modal>
      )}
      <DetailOverviewUI
        image={image}
        setImage={setImage}
        onErrorImg={onErrorImg}
        deleteItem={deleteItem}
        onClickPostLike={onClickPostLike}
        toggleDeleteModal={toggleDeleteModal}
        isDeleteOpen={isDeleteOpen}
        detailData={props.detailData}
        likeActive={likeActive}
        onClickShare={onClickShare}
      />
    </>
  );
}
