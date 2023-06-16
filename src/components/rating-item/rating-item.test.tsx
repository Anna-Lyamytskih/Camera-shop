import { render, screen } from '@testing-library/react';
import { ProviderWrapper } from '../../utils/test-jest';
import RatingItem from './rating-item';

describe('Component: ProductSlider', () => {

  const props = {
    title:'Ужасно',
    value:'1'
  };

  const changeRatingHandler = () => {
    <p>Hello</p>;
  };

  it('should render correctly', () => {
    render(
      <ProviderWrapper>
        <RatingItem title={props.title} value={props.value} onChangeData={changeRatingHandler}/>
      </ProviderWrapper>
    );

    expect(screen.getByTitle(props.title)).toBeInTheDocument();
  });
});
