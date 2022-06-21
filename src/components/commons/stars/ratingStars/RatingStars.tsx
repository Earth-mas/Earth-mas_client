import styled from '@emotion/styled';
import { StarOutlinedIcon } from 'assets/svgs';
import { MouseEvent, useState } from 'react';
import { Colors } from 'styles/Colors';

interface IRatingStarsProps {
  register?: any;
}
export default function RatingStars(props: IRatingStarsProps) {
  const [value, setValue] = useState('');
  const onClickStar = (event: MouseEvent) => {
    const target = event?.target as HTMLInputElement;
    setValue(target.value);
  };

  return (
    <Rating>
      <ul>
        <li>
          <label onClick={onClickStar}>
            <input type="radio" value="1" {...props.register('score')} />
            <StarOutlinedIcon className="star" />
          </label>
        </li>
        <li>
          <label onClick={onClickStar}>
            <input type="radio" value="2" {...props.register('score')} />
            <StarOutlinedIcon className="star" />
          </label>
        </li>
        <li>
          <label onClick={onClickStar}>
            <input type="radio" value="3" {...props.register('score')} />
            <StarOutlinedIcon className="star" />
          </label>
        </li>
        <li>
          <label onClick={onClickStar}>
            <input type="radio" value="4" {...props.register('score')} />
            <StarOutlinedIcon className="star" />
          </label>
        </li>
        <li>
          <label onClick={onClickStar}>
            <input type="radio" value="5" {...props.register('score')} />
            <StarOutlinedIcon className="star" />
          </label>
        </li>
      </ul>
      <span>{value}</span>
    </Rating>
  );
}

export const Rating = styled.div`
  display: flex;
  ul {
    display: flex;
    grid-gap: 5px;
  }
  input {
    position: absolute;
    opacity: 0;
  }
  .star {
    width: 25px;
    height: 25px;
    path {
      stroke: ${Colors.SUB2};
    }
  }
`;
