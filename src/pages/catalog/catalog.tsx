import { useGetSortProducts } from '../../hooks/use-get-sort-products/use-get-sort-products';
import { Path } from '../../components/path';
import { Logo } from '../../components/logo';
import { NavigationList } from '../../components/navigation-list';
import { Banner } from '../../components/banner';
import { BreadcrumbsList } from '../../components/breadcrumbs-list';
import { CatalogFilter } from '../../components/catalog-filter';
import { CatalogSort } from '../../components/catalog-sort';
import { ProductCardList } from '../../components/product-card-list';
import { PaginationList } from '../../components/pagination-list';
import { Footer } from '../../components/footer';
import { DEFAULT_PAGE_NUMBER } from './constants';
import { usePagination } from '../../hooks/use-pagination/use-pagination';
import { Helmet } from 'react-helmet-async';
import { AppRoute } from '../../router/constants';
import { LoadingScreen } from '../../components/loading-screen';
import { EmptyList } from '../../components/empty-list';
import { SearchForm } from '../../components/search-form';
import { BasketCount } from '../../components/basket-count';
import { useLocationState } from '../../hooks/use-location-state/use-location-state';

export const Catalog = () => {
  useLocationState();

  const { filterProducts: sortingProducts, isLoading } = useGetSortProducts();

  const pagination = usePagination({ total: sortingProducts.length });
  const { currentPage, limit } = pagination;

  const slicedList = sortingProducts.slice((currentPage - DEFAULT_PAGE_NUMBER) * limit, currentPage * limit);

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
            <SearchForm />
            <BasketCount />
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
                      <CatalogFilter sortingProducts={sortingProducts} />
                    </div>
                  </div>
                  <div className="catalog__content">
                    <div className="catalog-sort">
                      <CatalogSort />
                    </div>
                    {!isLoading && !sortingProducts.length && <EmptyList />}
                    {isLoading ?
                      <LoadingScreen /> :
                      <ProductCardList cameras={slicedList} />}
                    {!isLoading && !sortingProducts.length ?
                      '' :
                      <PaginationList pagination={pagination} />}
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
