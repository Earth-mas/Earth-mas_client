import axios from 'axios';
import store from 'storejs';
import { useForm } from 'react-hook-form';
import { FormReviewValues, IReviewNewProps } from './ReviewNew.types';
import ReviewNewUI from './ReviewNew.presenter';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { marketReviewRoute } from 'utils/APIRoutes';

export interface IReviewMarketData {
  id: string;
  title: string;
  minidescription: string;
  url: string;
}
export default function ReviewNew(props: IReviewNewProps) {
  const accessToken = store.get('accessToken');
  const { register, handleSubmit } = useForm<FormReviewValues>();
  const [urlString, setUrlString] = useState('');
  // const [marketData, setMarketData] = useState<IReviewMarketData>();

  const { data: reviewData } = useQuery(
    ['getReview'],
    async () => {
      const result = await axios.get(`${marketReviewRoute}/${props.reviewId}`);
      return result.data;
    },
    {
      onSuccess: res => {
        console.log(res);
        // setMarketData({
        //   id: res.market.id,
        //   title: res.market.title,
        //   minidescription: res.market.minidescription,
        //   url: res.market.url,
        // });
      },
      onError: error => {
        console.log(error);
      },
    },
    // {refetchOnWindowFocus: false,},
  );

  const onClickPostReview = async (data: FormReviewValues) => {
    const variables = {
      contents: data.contents,
      score: Number(data.score),
      url: urlString,
      market: props.marketData.id,
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
      contents: reviewData.contents,
      score: reviewData.score,
      market: props.marketData.id,
      url: reviewData.url,
    };
    if (data.contents) updateVariables.contents = data.contents;
    if (data.score) updateVariables.score = Number(data.score);
    if (urlString) updateVariables.url = urlString;

    console.log('리뷰 수정 :', updateVariables);
    await axios
      .put(
        `https://earth-mas.shop/server/marketreview/${reviewData.id} `,
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
      reviewData={reviewData}
      register={register}
      handleSubmit={handleSubmit}
      onClickPostReview={onClickPostReview}
      onClickPutReview={onClickPutReview}
      onClickCancel={props.onClickCancel}
      marketData={props.marketData}
      urlString={urlString}
      setUrlString={setUrlString}
    />
  );
}
