import axios from 'axios';
import store from 'storejs';
import { useForm } from 'react-hook-form';
import { FormReviewValues, IReviewNewProps } from './ReviewNew.types';
import ReviewNewUI from './ReviewNew.presenter';
import { useEffect, useState } from 'react';

// 데이터 확인용 하드코딩
const MARKET_DATA = {
  id: '92c32220-8cf1-4a0b-8e5a-6fb7048cc8ac',
  title: '대나무 칫솔1',
  minidescription: '짧은 설명 부분입니다',
  url: 'https://storage.googleapis.com/earthmas/market/1655873628592-에코텍트_2.jpeg',
};

// 데이터 확인용 하드코딩
const REVIEW_DATA = {
  contents:
    '기존 댓글입니다... 기존 댓글입니다... 기존 댓글입니다... 기존 댓글입니다..',
  id: '4a52a0ed-ae85-4209-bb25-b4939028ba33',
  score: 4,
  url: 'https://storage.googleapis.com/earthmas/market/1655873628592-에코텍트_2.jpeg,https://storage.googleapis.com/earthmas/market/1655873636976-category3.jpeg',
};

export default function ReviewNew(props: IReviewNewProps) {
  const accessToken = store.get('accessToken');
  const { register, handleSubmit } = useForm<FormReviewValues>();
  // const [urls, setUrls] = useState<string[]>([]);
  // const urlString = urls.toString();
  const [urlString, setUrlString] = useState('');

  useEffect(() => {
    console.log(urlString);
  }, [urlString]);

  const onClickPostReview = async (data: FormReviewValues) => {
    const variables = {
      contents: data.contents,
      score: Number(data.score),
      url: urlString,
      market: MARKET_DATA.id,
    };
    // console.log('리뷰 등록 :', variables);
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
      ...MARKET_DATA,
    };
    if (data.contents) updateVariables.contents = data.contents;
    if (data.score) updateVariables.score = data.score;
    if (urlString) updateVariables.url = urlString;

    console.log('리뷰 수정 :', updateVariables);

    const marketId = MARKET_DATA.id;

    // await axios
    //   .put(
    //     `https://earth-mas.shop/server/marketreview/${marketId} `,
    //     updateVariables,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${accessToken}`,
    //       },
    //     },
    //   )
    //   .then(res => {
    //     console.log('응답', res);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  };

  return (
    <ReviewNewUI
      // urls={urls}
      // setUrls={setUrls}
      register={register}
      handleSubmit={handleSubmit}
      onClickPostReview={onClickPostReview}
      onClickPutReview={onClickPutReview}
      onClickCancel={props.onClickCancel}
      MARKET_DATA={MARKET_DATA}
      // REVIEW_DATA={REVIEW_DATA}
      urlString={urlString}
      setUrlString={setUrlString}
    />
  );
}
