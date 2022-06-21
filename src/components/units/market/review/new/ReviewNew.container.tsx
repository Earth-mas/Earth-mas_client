import axios from 'axios';
import store from 'storejs';
import { useForm } from 'react-hook-form';
import { FormReviewValues, IReviewNewProps } from './ReviewNew.types';
import ReviewNewUI from './ReviewNew.presenter';

const MARKET_DATA = {
  id: '상품 id',
  title: '상품명입니다',
  minidescription: '짧은 설명 부분입니다',
  url: '이미지 url',
};

const REVIEW_DATA = {
  contents:
    '기존 댓글입니다... 기존 댓글입니다... 기존 댓글입니다... 기존 댓글입니다..',
  id: '리뷰 id',
  score: 4,
};

export default function ReviewNew(props: IReviewNewProps) {
  const accessToken = store.get('accessToken');
  const { register, handleSubmit } = useForm<FormReviewValues>();

  const onClickPostReview = async (data: FormReviewValues) => {
    const variables = {
      contents: data.contents,
      score: Number(data.score),
      // market: MARKET_DATA.id,
      market: '061b2f92-d149-4341-ae7b-2dd427ad339b',
    };
    console.log('리뷰 등록 :', variables);
    await axios
      .post(`https://earth-mas.shop/server/marketreview/ `, variables, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(res => {
        console.log('응답', res);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const onClickPutReview = async (data: FormReviewValues) => {
    const updateVariables: FormReviewValues = {
      contents: REVIEW_DATA?.contents,
    };
    if (data.contents) updateVariables.contents = data.contents;
    if (data.score) updateVariables.score = data.score;
    console.log('리뷰 수정 :', updateVariables);

    const marketId = MARKET_DATA.id;

    await axios
      .put(
        `https://earth-mas.shop/server/marketreview/${marketId} `,
        updateVariables,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      .then(res => {
        console.log('응답', res);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <ReviewNewUI
      register={register}
      handleSubmit={handleSubmit}
      onClickPostReview={onClickPostReview}
      onClickPutReview={onClickPutReview}
      onClickCancel={props.onClickCancel}
      MARKET_DATA={MARKET_DATA}
      // REVIEW_DATA={REVIEW_DATA}
    />
  );
}
