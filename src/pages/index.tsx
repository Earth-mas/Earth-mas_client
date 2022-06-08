import Slide from 'components/commons/slide';
import Login from 'components/units/login';
import banner1 from '../assets/images/mainBanner/banner1.jpg';
import banner2 from '../assets/images/mainBanner/banner2.jpg';
import banner3 from '../assets/images/mainBanner/banner3.jpg';

export default function HomePage() {
  return (
    <div>
      <Login />
      <Slide banner1={banner1} banner2={banner2} banner3={banner3} />
    </div>
  );
}
