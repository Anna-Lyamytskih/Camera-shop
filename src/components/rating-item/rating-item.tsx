import { RatingItemProps } from './types';

export const RatingItem = ({title, value, onChangeData}:RatingItemProps) => (
  <>
    <input className="visually-hidden" id={`star-${value}`} name="rate" type="radio" value={value} onChange={onChangeData} required/>
    <label className="rate__label"htmlFor={`star-${value}`} title={title}></label>
  </>
);

export default RatingItem;
