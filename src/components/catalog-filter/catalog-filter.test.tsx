import { render, screen } from '@testing-library/react';
import { ProviderWrapper } from '../../utils/test-jest';
import { CatalogFilter } from './catalog-filter';

describe('Component: CatalogFilter', () => {
  it('should render correctly', () => {
    render(
      <ProviderWrapper>
        <CatalogFilter />
      </ProviderWrapper>
    );

    expect(screen.getByText('Фильтр')).toBeInTheDocument();
    expect(screen.getByText('Категория')).toBeInTheDocument();
  });
});
