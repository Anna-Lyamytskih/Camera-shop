export type RatingItemProps = {
  title:string;
  value:string;
  onChangeData: (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}
