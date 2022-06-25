import ContainedButton01 from 'components/commons/button/contained/ContainedButton01';
import OutlinedButton01 from 'components/commons/button/outlined/OutlinedButton01';
import * as S from './ReviewNew.styles';
import { IReviewNewUIProps } from './ReviewNew.types';
import logo from '../../../../../assets/svgs/logo/logo-icon-w.svg';
import { SyntheticEvent } from 'react';
import RatingStars from 'components/commons/stars/ratingStars/RatingStars';
import Upload02 from 'components/commons/upload/02/Upload02';

export default function ReviewNewUI(props: IReviewNewUIProps) {
  const onErrorImg = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = logo;
  };

  return (
    <S.Wrap>
      <div className="info-wrap">
        <div className="image">
          <img
            src={props.marketData?.url ? props.marketData?.url : logo}
            onError={onErrorImg}
          />
        </div>
        <div className="info">
          <p className="title">{props.marketData?.title}</p>
          <p className="minidescription">{props.marketData?.minidescription}</p>
        </div>
      </div>
      <form
        onSubmit={props.handleSubmit(
          props.reviewData ? props.onClickPutReview : props.onClickPostReview,
        )}
      >
        <div className="input-wrap">
          <h1>별점 평가</h1>
          {/* <input
            type="number"
            defaultValue={props.reviewData?.score ? props.reviewData?.score : 0}
            {...props.register('score')}
          /> */}
          <RatingStars register={props.register} />
        </div>
        <div className="input-wrap">
          <h1>사진 첨부</h1>
          <Upload02
            page="marketreview"
            // urls={props.urls}
            // setUrls={props.setUrls}
            fetchData={props.reviewData?.url.split(',')}
            urlString={props.urlString}
            setUrlString={props.setUrlString}
          />
        </div>
        <div className="input-wrap">
          <h1>리뷰 작성</h1>
          <textarea
            defaultValue={
              props.reviewData?.contents ? props.reviewData?.contents : ''
            }
            placeholder="솔직한 리뷰는 다른 고객에게 큰 도움이 됩니다. (최대 80자) "
            {...props.register('contents')}
            maxLength={80}
          />
        </div>

        <div className="buttons">
          <OutlinedButton01
            color="main"
            content="취소"
            onClick={props.onClickCancel}
          />
          <ContainedButton01
            color="main"
            content={props.reviewData ? '리뷰 수정' : '리뷰 등록'}
            type="submit"
          />
        </div>
      </form>
    </S.Wrap>
  );
}
