import { render, screen} from '@testing-library/react';
import { EmptyList } from './empty-list';


describe('Component: empty list', () => {
  it('should render correctly', () => {

    render(
      <EmptyList/>,
    );

    const containerElement = screen.getByText(/По вашему запросу ничего не найдено/i);

    expect(containerElement).toBeInTheDocument();
  });
});
