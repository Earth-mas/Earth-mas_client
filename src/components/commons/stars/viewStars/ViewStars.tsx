import styled from '@emotion/styled';
import { StarsIcon } from 'assets/svgs';
import { Colors } from 'styles/Colors';

interface IStarsProps {
  contained?: number;
  color: 'main' | 'sub2';
}
export default function ViewStars(props: IStarsProps) {
  return (
    <Wrap contained={props.contained} color={props.color}>
      <div className="outlined">
        <StarsIcon />
        <div className="contained">
          <StarsIcon />
        </div>
      </div>
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  align-items: center;
  /* width: 87px; */

  .outlined {
    position: relative;
    svg {
      path {
        stroke: ${(props: IStarsProps) => {
          if (props.color === 'main') return `${Colors.MAIN}`;
          if (props.color === 'sub2') return `${Colors.SUB2}`;
        }};
      }
    }
  }
  .contained {
    position: absolute;
    bottom: 0px;
    left: 0;
    overflow: hidden;

    width: ${(props: IStarsProps) => props.contained + '%'};

    svg {
      fill: ${(props: IStarsProps) => {
        if (props.color === 'main') return `${Colors.MAIN}`;
        if (props.color === 'sub2') return `${Colors.SUB2}`;
      }};
      path {
        stroke: ${(props: IStarsProps) => {
          if (props.color === 'main') return `${Colors.MAIN}`;
          if (props.color === 'sub2') return `${Colors.SUB2}`;
        }};
      }
    }
  }
`;
