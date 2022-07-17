import { ChangeEvent, useState } from 'react';

import PostCode from 'components/commons/daumpostcode';
import Blank from 'components/commons/blank/Blank';
import ContainedButton01 from 'components/commons/button/contained/ContainedButton01';
import Input01 from 'components/commons/inputs/Input01';
import axiosApiInstance from 'commons/utils/axiosInstance';
import { useMutation } from 'react-query';

interface IProps {
  addressnumber: string;
  address1: string;
  address2: string;
  id: string;
}
interface IPostCodeData {
  zonecode: string;
  address: string;
}
export default function UpdateAddress(props: IProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addressInput, setAddressInput] = useState({
    addressnumber: props.addressnumber,
    address1: props.address1,
    address2: props.address2,
  });

  const onChangeAddress2 = (e: ChangeEvent<HTMLInputElement>) => {
    setAddressInput({ ...addressInput, address2: e.target.value });
  };

  const handleComplete = (data: IPostCodeData) => {
    setAddressInput({
      ...addressInput,
      addressnumber: data.zonecode,
      address1: data.address,
    });
  };
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const { mutate: updateUser } = useMutation(
    'updateUser',
    async () => {
      return await axiosApiInstance.put(`user`, { ...addressInput });
    },
    {
      onSuccess: () => {
        alert('주소가 변경되었습니다.');
      },
      onError: (error: any) => {
        alert(error.response.data.message);
      },
    },
  );

  const onClickSubmit = () => {
    if (!addressInput.address1 && !addressInput.address2)
      return alert('변경된 항목이 없습니다.');
    updateUser();
  };

  return (
    <section className="userAddress">
      <div className="row">
        <Input01
          type="text"
          id="addressnumber"
          placeholder="우편번호 검색"
          disabled
          defaultValue={addressInput.addressnumber}
          margin={10}
        />
        <button
          type="button"
          className="defaultButton "
          style={{ width: 250, marginLeft: 10 }}
          onClick={() => setIsModalOpen(prev => !prev)}
        >
          우편번호 검색
        </button>
      </div>
      {isModalOpen && (
        <div>
          <PostCode handleComplete={handleComplete} />
        </div>
      )}
      <Input01
        type="text"
        id="address1"
        placeholder="우편번호를 검색해주세요."
        defaultValue={addressInput.address1}
        disabled
        margin={10}
      />
      <Input01
        type="text"
        id="address2"
        placeholder="상세주소를 입력해주세요."
        defaultValue={addressInput.address2}
        onChange={onChangeAddress2}
      />
      <Blank height={10} />
      <ContainedButton01
        content="주소 변경하기"
        color="sub"
        onClick={onClickSubmit}
      />
    </section>
  );
}
