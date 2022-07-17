import axios from 'axios';
import ActivityNew from 'components/units/activity/new/ActivityNew.container';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ActivityEditPage() {
  const [editData, setEditData] = useState();
  const params = useParams();

  const getEditDetailData = async () => {
    await axios
      .get(`https://earth-mas.shop/server/activity/${params.id}`)
      .then(res => {
        setEditData(res.data);
        console.log('수정할 데이터: ', res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    getEditDetailData();
  }, []);

  return <ActivityNew isEdit={true} editData={editData} />;
}
