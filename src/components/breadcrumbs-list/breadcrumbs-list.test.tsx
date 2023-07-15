import { render, screen } from '@testing-library/react';
import { ProviderWrapper } from '../../utils/test-jest';
import { BreadcrumbsList } from './breadcrumbs-list';
import { AppRoute } from '../../router/constants';

describe('Component: BreadcrumbsList', () => {

  it('should render correctly', () => {
    const list = [{
      link: AppRoute.Root,
      title: 'Главная',
    }];

    render(
      <ProviderWrapper>
        <BreadcrumbsList list={list}/>
      </ProviderWrapper>
    );

    expect(screen.getByText('Главная')).toBeInTheDocument();
  });
});
