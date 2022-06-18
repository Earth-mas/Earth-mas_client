import 'react-datepicker/dist/react-datepicker.css';
import { ChangeEvent, SetStateAction, useState } from 'react';
import axios from 'axios';
import store from 'storejs';
import { activityRoute } from 'utils/APIRoutes';
import ActivityNewUI from './ActivityNew.presenter';
import { useNavigate } from 'react-router-dom';

export default function ActivityNew() {
  const navigate = useNavigate();

  const accessToken = store.get('accessToken');

  const [title, setTitle] = useState('');
  const [date, setDate] = useState<Date | null>();
  const [headCount, setHeadCount] = useState('');
  const [location, setLocation] = useState('');
  const [subDescription, setSubDescrition] = useState('');
  const [description, setDescription] = useState();
  const [urls, setUrls] = useState<string[]>([]);
  const [category, setCategory] = useState();

  // const [values, setValues] = useState({
  //   title: '',
  //   headCount: '',
  //   location: '',
  //   category: ''
  // })

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    console.log(e.target.value);
  };
  const onChangeDate = (e: SetStateAction<Date | null | undefined>) => {
    setDate(e);
  };
  const onChangeHeadCount = (e: ChangeEvent<HTMLInputElement>) => {
    setHeadCount(e.target.value);
    console.log(e.target.value);
  };
  const onChangeLocation = (e: ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
    console.log(e.target.value);
  };

  const onChangeSubDescription = (e: ChangeEvent<HTMLInputElement>) => {
    setSubDescrition(e.target.value);
    console.log(e.target.value);
  };

  const onChangeEditor = (e: SetStateAction<undefined>) => {
    setDescription(e);
  };
  // const onChangeCategory = (e: SetStateAction<undefined>) => {
  //   setCategory(e);
  // };

  const onClickSubmit = async () => {
    // if (
    //   title === '' ||
    //   date === null ||
    //   headCount === '' ||
    //   location === '' ||
    //   subDescription === '' ||
    //   description === '' ||
    //   urls === [] ||
    //   category === ''
    // ) {
    //   alert('내용을 입력해주세요');
    //   return;
    // }
    try {
      const regisData = await axios.post(
        // 'https://earth-mas.shop/server/activity',
        activityRoute,
        {
          title,
          dday: date,
          maxpeople: headCount,
          location,
          subdescription: subDescription,
          description,
          url: urls,
          category,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (regisData.status) {
        console.log(regisData);
      }
      // if (regisData) {
      //   console.log(regisData);
      // } else {
      //   navigate('/activity/detail');
      // }
    } catch (error) {
      console.log(error);
    }
    // finally {
    //   navigate('/activity/detail');
    // }
  };

  return (
    <ActivityNewUI
      onClickSubmit={onClickSubmit}
      date={date}
      urls={urls}
      setUrls={setUrls}
      onChangeTitle={onChangeTitle}
      onChangeDate={onChangeDate}
      onChangeHeadCount={onChangeHeadCount}
      onChangeLocation={onChangeLocation}
      onChangeSubDescription={onChangeSubDescription}
      onChangeEditor={onChangeEditor}
      // onChangeCategory={onChangeCategory}
    />
  );
}
