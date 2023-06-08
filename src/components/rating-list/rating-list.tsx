import RatingItem from '../rating-item';

const rating = [
  {
    title:'Отлично',
    value:'5'
  },
  {
    title:'Хорошо',
    value:'4'
  },
  {
    title:'Нормально',
    value:'3'
  },
  {
    title:'Плохо',
    value:'2'
  },
  {
    title:'Ужасно',
    value:'1'
  }
];

type RatingListProps = {
  onChangeData: (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const RatingList = ({onChangeData}:RatingListProps) => (
  <div className="rate__group">
    {rating.map((item)=> <RatingItem title={item.title} value={item.value} key={item.value} onChangeData={onChangeData}/>)}
  </div>
);

export default RatingList;
