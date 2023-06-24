import { render, screen } from '@testing-library/react';
import { ProviderWrapper } from '../../utils/test-jest';
import { BreadcrumbsItem } from './breadcrumbs-item';
import { AppRoute } from '../../router/constants';

const fakeList =
  {
    link: AppRoute.Root,
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
