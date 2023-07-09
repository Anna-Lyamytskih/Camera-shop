import { useGetSortProducts } from '../../hooks/use-get-sort-products/use-get-sort-products';
import { Path } from '../../components/path';
import { Logo } from '../../components/logo';
import { NavigationList } from '../../components/navigation-list';
import { FormSearch } from '../../components/form-search';
import { Banner } from '../../components/banner';
import { BreadcrumbsList } from '../../components/breadcrumbs-list';
import { CatalogFilter } from '../../components/catalog-filter';
import { CatalogSort } from '../../components/catalog-sort';
import { ProductCardList } from '../../components/product-card-list';
import { PaginationList } from '../../components/pagination-list';
import { Footer } from '../../components/footer';
import { MAX_COUNT_PAGE_PGINATION } from './constants';
import { usePagination } from '../../hooks/use-pagination/use-pagination';
import { Helmet } from 'react-helmet-async';
import { AppRoute } from '../../router/constants';
import { LoadingScreen } from '../../components/loading-screen';

export const Catalog = () => {
  const { sortingProducts, isLoading } = useGetSortProducts();

  const pagination = usePagination({ total: sortingProducts.length });
  const { currentPage, limit } = pagination;

  const slicedList = sortingProducts.slice((currentPage - MAX_COUNT_PAGE_PGINATION) * limit, currentPage * limit);

  if(isLoading){
    return <LoadingScreen/>;
  }

  return (
    <>
      <Helmet>
        <title>Каталог - Фотошоп</title>
      </Helmet>
      <Path />
      <div className="wrapper">
        <header className="header" id="header">
          <div className="container">
            <Logo />
            <NavigationList />
            <FormSearch />
            <a className="header__basket-link" href='/'>
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-basket"></use>
              </svg>
            </a>
          </div>
        </header>
        <main>
          <Banner />
          <div className="page-content">
            <div className="breadcrumbs">
              <div className="container">
                <BreadcrumbsList
                  list={[
                    {
                      link: AppRoute.Root,
                      title: 'Главная',
                    },
                    {
                      title: 'Каталог',
                    },]}
                />
              </div>
            </div>
            <section className="catalog">
              <div className="container">
                <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
                <div className="page-content__columns">
                  <div className="catalog__aside">
                    <div className="catalog-filter">
                      <CatalogFilter />
                    </div>
                  </div>
                  <div className="catalog__content">
                    <div className="catalog-sort">
                      <CatalogSort />
                    </div>
                    <ProductCardList cameras={slicedList} />
                    <PaginationList pagination={pagination} />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};
