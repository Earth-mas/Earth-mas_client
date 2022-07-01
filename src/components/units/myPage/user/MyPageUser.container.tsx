import { userState } from 'recoil/user';
import { useRecoilValue } from 'recoil';
import { SettingIcon } from 'assets/svgs';
import { UserWrapper } from './MyPageUser.styles';
import UpdateImage from './profile/updateImage';
import UpdateAddress from './profile/updateAddress';
import UpdatePassword from './profile/updatePassword';
import DeleteUser from './profile/deleteUser';

export default function UserInfo() {
  const userInfo = useRecoilValue(userState);
  const { url, id, name, email, addressnumber, address1, address2 } = userInfo;

  return (
    <UserWrapper>
      <div className="title">
        <SettingIcon />
        <h1>계정 관리</h1>
      </div>
      <section className="userInfo">
        <div className="userInfoLeft">
          <UpdateImage url={url} id={id} />
        </div>
        <div className="userInfoRight">
          <span className="userName">
            <mark>{name}</mark>님
          </span>
          <p className="userEmail">{email}</p>
        </div>
      </section>

      {addressnumber !== '' && (
        <>
          <h2 className="sectionTitle">주소 변경하기</h2>
          <UpdateAddress
            addressnumber={addressnumber}
            address1={address1}
            address2={address2}
            id={id}
          />
        </>
      )}
      <UpdatePassword />
      <DeleteUser id={id} />
    </UserWrapper>
  );
}
