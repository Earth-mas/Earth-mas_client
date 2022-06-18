import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import store from 'storejs';
import { activityRoute } from 'utils/APIRoutes';
import ActivityNewUI from './ActivityNew.presenter';
// import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

export interface FormValues {
  title?: string;
  dday?: Date | null;
  maxpeople?: number;
  location?: string;
  subdescription?: string;
  description?: string;
  url?: string;
  category?: string;
}

export default function ActivityNew() {
  // const navigate = useNavigate();

  const accessToken = store.get('accessToken');

  // const [title, setTitle] = useState('');
  // const [date, setDate] = useState<Date | null>();
  // const [headCount, setHeadCount] = useState('');
  // const [location, setLocation] = useState('');
  // const [subDescription, setSubDescrition] = useState('');
  // const [description, setDescription] = useState();
  // const [urls, setUrls] = useState<string[]>([]);
  // const [category, setCategory] = useState();

  const { register, handleSubmit } = useForm<FormValues>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const onClickSubmit = async (data: FormValues) => {
    console.log('등록할 데이터: ', data);
    const variables = {
      title: data?.title,
      dday: data?.dday,
      maxpeople: data?.maxpeople,
      location: data?.location,
      subdescription: data?.subdescription,
      description: data?.description,
      url: data?.url,
      category: data?.category,
    };
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
      const regisData = await axios.post(activityRoute, variables, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log('등록된 데이터:', regisData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ActivityNewUI
      onClickSubmit={onClickSubmit}
      register={register}
      handleSubmit={handleSubmit}
    />
  );
}
