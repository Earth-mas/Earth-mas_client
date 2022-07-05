import { HeartOutlineRedIcon, ShareIcon } from 'assets/svgs';
import ContainedButton01 from 'components/commons/button/contained/ContainedButton01';
import OutlinedButton01 from 'components/commons/button/outlined/OutlinedButton01';
import * as S from './DetailOverview.styles';
import Title01 from 'components/commons/text/title/Title01';
import { v4 as uuid4 } from 'uuid';
import ViewStars from 'components/commons/stars/viewStars/ViewStars';
import { getAvgStar } from 'commons/utils/getStars';
import { getMoney, getPercent } from 'commons/utils/getAmount';
import Dropdown05 from 'components/commons/dropdown/05/Dropdown05';
import Modal from 'components/commons/modal';
import AlertModal from 'components/commons/modal/alertModal/alertModal';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from 'recoil/user';
import { useParams } from 'react-router-dom';
import { IDetailOverviewUIProps } from './DetailOverview.types';
import { getUrl } from 'commons/utils/getUrl';

export default function DetailOverviewUI(props: IDetailOverviewUIProps) {
  const navigate = useNavigate();
  const userInfo = useRecoilValue(userState);
  const { id } = useParams();

  return (
    <main>
      {props.isDeleteOpen && (
        <Modal>
          <AlertModal
            title="💬 정말 삭제하시겠어요?"
            contents="해당 상품의 모든 정보가 삭제되며, 복구할 수 없습니다."
            okMessage="네, 삭제할게요"
            cancelMessage="아니오, 취소할게요"
            onClickCancel={props.toggleDeleteModal}
            onClickOk={props.deleteItem}
          />
        </Modal>
      )}
      <S.ItemImage>
        <div className="cover-image-list">
          <ul>
            {props.detailData?.url.split(',').map(el => (
              <li key={uuid4()}>
                <img
                  src={el}
                  onMouseOver={() => {
                    props.setImage(el);
                  }}
                  onError={props.onErrorImg}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="cover-image">
          <div>
            <img src={props.image} onError={props.onErrorImg} />
          </div>
        </div>
      </S.ItemImage>
      <S.ItemInfo>
        <div className="title-wrap">
          <Title01 size="C" content={props.detailData?.title} margin={15} />
          {props.detailData?.user.id === userInfo.id && (
            <Dropdown05
              page="market"
              toggleDeleteModal={props.toggleDeleteModal}
            />
          )}
        </div>
        <p className="description">{props.detailData?.minidescription}</p>
        <div className="review">
          <ViewStars
            contained={
              props.detailData?.reviewscore &&
              getAvgStar(
                props.detailData?.reviewscore,
                props.detailData?.reviewpeople,
              )
            }
            color="main"
          />
          <span>{props.detailData?.reviewpeople}개의 리뷰</span>
        </div>
        <p className="price">
          <span className="price-discount-rate">
            {getPercent(props.detailData?.amount, props.detailData?.discount)}%
          </span>
          <span className="price-discount">
            {getMoney(props.detailData?.discount)}원
          </span>
          <span className="price-origin">
            {getMoney(props.detailData?.amount)}원
          </span>
        </p>
        <div className="delivery">
          <div className="delivery-title">
            <span>배송</span>
          </div>
          <ul className="delivery-content">
            <li>택배배송 | 3,000원 (주문시 결제)</li>
            <li>배송지는 개인정보 입력하신 주소로 설정됩니다.</li>
          </ul>
        </div>
        <hr />
        <div className="pay">
          <span className="pay-title">총 결제금액</span>
          <span className="pay-content">
            {(Number(props.detailData?.discount) + 3000).toLocaleString()}원
          </span>
        </div>
        <div className="buttons">
          <ContainedButton01
            color="main"
            content="구매하기"
            onClick={() => {
              navigate(`/market/${id}/payment`);
            }}
          />
          <div className="button-wrap">
            <OutlinedButton01
              color="main"
              onClick={props.onClickPostLike}
              content={
                props.likeActive ? (
                  <HeartOutlineRedIcon fill="#D92828" />
                ) : (
                  <HeartOutlineRedIcon />
                )
              }
            />
            <OutlinedButton01
              color="main"
              content={<ShareIcon />}
              onClick={props.onClickShare}
            />
          </div>
        </div>
      </S.ItemInfo>
    </main>
  );
}
