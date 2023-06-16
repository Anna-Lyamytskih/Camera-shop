import { render, screen } from '@testing-library/react';
import { ProviderWrapper } from '../../utils/test-jest';
import { ReviewItem } from './review-item';
import { makeFakeReviewItem } from '../../utils/mocks';

describe('Component: ReviewItem', () => {

  const props = {
    reviews: makeFakeReviewItem(),
  };
  it('should render correctly', () => {
    render(
      <ProviderWrapper>
        <ReviewItem review={props.reviews}/>
      </ProviderWrapper>
    );

    expect(screen.getByText('Достоинства:')).toBeInTheDocument();
  });
});
