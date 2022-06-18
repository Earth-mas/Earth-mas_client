import axios from 'axios';
import { supportRoute } from 'utils/APIRoutes';
import { SetStateAction, useState } from 'react';
import SupportNewUI from './SupportNew.presenter';
import store from 'storejs';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation } from 'react-query';

export default function SupportNew(props: {
  isEdit: boolean;
  fetchData:
    | {
        title: string;
        wishamount: number;
        description: string;
        dday: Date | null;
        url: string[];
      }
    | null
    | undefined;
}) {
  const navigate = useNavigate();
  const { id } = useParams();
  const accessToken = store.get('accessToken');

  const [date, setDate] = useState<Date | null>();
  const [description, setDescription] = useState();
  const [urls, setUrls] = useState<string[]>([]);
  const [values, setValues] = useState({
    title: '',
    wishamount: '',
  });

  const onClickSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (handleValidation()) {
      const { title, wishamount } = values;
      const { data } = await axios.post(
        supportRoute,
        {
          title,
          wishamount,
          dday: date,
          url: urls,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (data.status === false) {
        console.log(data);
      } else {
        navigate(`/support`);
      }
    }
  };

  /*   const onClickEdit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const { mutate } = useMutation(
      async () => {
        return await axios.put(`${supportRoute}/${id}`, {
          title: '',
          wishamount: '',
          dday: '',
          url: '',
          description: '',
        });
      },
      {
        onSuccess: res => {
          console.log(res);
        },
        onError: err => {
          console.log(err);
        },
      },
    );
    if (handleValidation()) {
      const { title, wishamount } = values;
      const { data } = axios.put(
        `${supportRoute}/${id}`,
        {
          title,
          wishamount,
          dday: date,
          url: urls,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (data.status === false) {
        console.log(data);
      } else {
        navigate(`/support`);
      }
    }
  }; */
  // console.log(mutate);

  const handleValidation = () => {
    const { title, wishamount } = values;
    if (
      title === '' &&
      wishamount === '' &&
      date === null &&
      urls === [] &&
      description === ''
    ) {
      alert('내용없음');
      return false;
    }
    return true;
  };

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log({ ...values, [e.target.name]: e.target.value });
  };
  const editorChange = (e: SetStateAction<undefined>) => {
    setDescription(e);
  };
  const onChangeDate = (e: Date | null) => {
    setDate(e);
  };

  console.log(props.fetchData);

  return (
    <SupportNewUI
      isEdit={props.isEdit}
      fetchData={props.fetchData}
      onClickSubmit={onClickSubmit}
      date={date}
      urls={urls}
      setUrls={setUrls}
      onChangeDate={onChangeDate}
      editorChange={editorChange}
      handleChange={handleChange}
    />
  );
}
