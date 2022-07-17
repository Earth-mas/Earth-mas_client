import styled from '@emotion/styled';
import { StarOutlinedIcon } from 'assets/svgs';
import { useEffect, useState } from 'react';
import { Colors } from 'styles/Colors';

interface IRatingStarsProps {
  register?: any;
  score?: number;
}
export default function RatingStars(props: IRatingStarsProps) {
  const [hoverValue, setHoverValue] = useState<number>();
  const [submitValue, setSubmitValue] = useState<number>();

  const onClickStar = (num: number) => {
    setHoverValue(num);
    setSubmitValue(num);
  };

  const Arr = [
    { value: '1', num: 1 },
    { value: '2', num: 2 },
    { value: '3', num: 3 },
    { value: '4', num: 4 },
    { value: '5', num: 5 },
  ];

  useEffect(() => {
    setSubmitValue(props.score);
  }, [props.score]);
  return (
    <Rating hoverValue={hoverValue} submitValue={submitValue}>
      <ul>
        {Arr.map(el => (
          <li key={el.value}>
            <label
              onClick={() => {
                onClickStar(el.num);
              }}
              onMouseOver={() => setHoverValue(el.num)}
              onMouseOut={() => setHoverValue(0)}
            >
              <input
                type="radio"
                value={el.value}
                {...props.register('score')}
              />
              <StarOutlinedIcon className="star" />
            </label>
          </li>
        ))}
      </ul>
    </Rating>
  );
}

interface IProps {
  hoverValue?: number;
  submitValue?: number;
}
export const Rating = styled.div`
  display: flex;
  .star {
    width: 25px;
    height: 25px;
    margin-right: 5px;
    fill: ${Colors.B20};
    path {
      stroke: none;
    }
  }
  ul {
    display: flex;
  }
  li:nth-of-type(-n + ${(props: IProps) => props.hoverValue}) {
    svg {
      fill: #ffd19b;
    }
  }
  li:nth-of-type(-n + ${(props: IProps) => props.submitValue}) {
    svg {
      fill: ${Colors.SUB2};
    }
  }
  input {
    position: absolute;
    opacity: 0;
  }
`;
