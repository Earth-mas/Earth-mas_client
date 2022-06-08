import styled from '@emotion/styled';
import { Colors } from 'styles/Colors';
import { FontFamily, FontSize } from 'styles/FontStyles';
import { ReactComponent as SearchIcon } from 'assets/svgs/icons/search-icon.svg';

const Search = styled.div`
  width: 240px;
  height: 40px;
  border: 1px solid ${Colors.B60};
  border-radius: 20px;
  display: flex;
  align-items: center;
  padding: 0px 20px;
  overflow: hidden;
  :focus-within {
    border: 1px solid ${Colors.SUB1};
  }
  span {
    display: flex;
    justify-content: center;
  }
`;

const Input = styled.input`
  width: 100%;
  font-family: ${FontFamily.MEDIUM};
  font-size: ${FontSize.MEDIUM_C};
  color: ${Colors.B100};
  margin-left: 10px;
  ::placeholder {
    color: ${Colors.B60};
  }
`;

interface IInput02Props {
  placeholder?: string;
}

export default function Input02(props: IInput02Props) {
  return (
    <Search>
      <span>
        <SearchIcon />
      </span>
      <Input type="text" placeholder={props.placeholder} />
    </Search>
  );
}
