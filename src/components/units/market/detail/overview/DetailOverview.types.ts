import { Dispatch, SyntheticEvent } from 'react';
import { IMarketDetail } from '../MarketDetail.types';

export interface IDetailOverviewUIProps {
  image: string;
  setImage: Dispatch<React.SetStateAction<string>>;
  onErrorImg: (event: SyntheticEvent<HTMLImageElement, Event>) => void;
  deleteItem: () => void;
  onClickPostLike: () => void;
  toggleDeleteModal: () => void;
  isDeleteOpen: boolean;
  detailData?: IMarketDetail;
  likeActive?: boolean;
  onClickShare: () => void;
}

export interface IDetailOverviewProps {
  detailData?: IMarketDetail;
}
