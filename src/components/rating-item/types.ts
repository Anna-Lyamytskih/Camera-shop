import { MouseEventHandler } from 'react';

export type RatingItemProps = {
  title:string;
  value:string;
  onChangeData: MouseEventHandler<HTMLInputElement>;
}
