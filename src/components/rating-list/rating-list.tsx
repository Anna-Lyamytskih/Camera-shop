import { RatingItem } from '../rating-item';
import { rating } from './constants';
import { RatingListProps } from './types';

export const RatingList = ({onChangeData}:RatingListProps) => (
  <div className="rate__group">
    {rating.map((item)=> <RatingItem title={item.title} value={item.value} key={item.value} onChangeData={onChangeData}/>)}
  </div>
);
