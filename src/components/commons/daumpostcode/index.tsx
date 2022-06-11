import { IPostCodeData } from 'components/units/signUp/SignUp.container';
import DaumPostcodeEmbed from 'react-daum-postcode';

interface IProps {
  handleComplete: (data: IPostCodeData) => void;
}

export default function PostCode({ handleComplete }: IProps) {
  return <DaumPostcodeEmbed onComplete={handleComplete} />;
}
