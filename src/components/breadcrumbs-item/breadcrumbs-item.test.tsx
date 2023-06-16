import { render, screen } from '@testing-library/react';
import { ProviderWrapper } from '../../utils/test-jest';
import { BreadcrumbsItem } from './breadcrumbs-item';

const fakeList =
  {
    link: '/',
    title: 'Каталог'
  };

describe('Component: BreadcrumbsItem', () => {
  it('should render correctly', () => {
    render(
      <ProviderWrapper>
        <BreadcrumbsItem link={fakeList.link} title={fakeList.title}/>
      </ProviderWrapper>
    );

    expect(screen.getByText('Каталог')).toBeInTheDocument();
  });
});
