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
import { EmptyList } from '../../components/empty-list';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect, useMemo } from 'react';
import { changeSortBy, changeSortOrder } from '../../store/products-api/products-process';
import { FilterTypeCategory, FilterTypeLevel, FilterTypeTypes, SortingTypeBy, SortingTypeOrder } from '../../store/products-api/types';
import { changFilterCategory, changFilterLTypes, changFilterLevel, changFilterMaxPrice, changFilterMinPrice } from '../../store/filter-process/filter-process';
import { QueryParam } from './types';


export const Catalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { filterProducts:sortingProducts, isLoading } = useGetSortProducts();
  const sort = useAppSelector((state) => state.PRODUCT.filter);
  const filter = useAppSelector((state) => state.FILTER.filter);

  const sortType = searchParams.get('sortBy');
  const sortOrder = searchParams.get('order');
  const category = searchParams.get('category');
  const priceGte = searchParams.get('price_gte');
  const priceLte = searchParams.get('price_lte');
  const type: string[] = [];
  const level: string[] = [];

  for (const [key, value] of searchParams.entries()) {
    if (key === 'type' && !type.includes(value)) {
      type.push(value);
    }

    if (key === 'level' && !level.includes(value)) {
      level.push(value);
    }
  }

  const currentParams = useMemo(() => {
    const params: QueryParam = {};

    if (sort.by && sort.order) {
      params.sortBy = sort.by;
      params.order = sort.order;
    } else if (!filter.category && !filter.type.length && !filter.level.length && !filter.minPrice && !filter.maxPrice) {
      return;
    }
    if (filter.category) { params.category = filter.category; }
    if (filter.type) { params.type = filter.type; }
    if (filter.level) { params.level = filter.level; }
    if (filter.minPrice) { params['price_gte'] = filter.minPrice.toString(); }
    if (filter.maxPrice) { params['price_lte'] = filter.maxPrice.toString(); }

    return params;
  }, [sort.by, sort.order, filter.category, filter.type, filter.level, filter.minPrice, filter.maxPrice]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if(priceGte){
      dispatch(changFilterMinPrice(+priceGte));
    }
    if(priceLte){
      dispatch(changFilterMaxPrice(+priceLte));
    }
  }, [priceGte, priceLte, dispatch]);

  useEffect(() => {
    if(sortType){
      dispatch(changeSortBy(sortType as SortingTypeBy));
    }
    if(sortOrder){
      dispatch(changeSortOrder(sortOrder as SortingTypeOrder));
    }
  }, [sortType, sortOrder, dispatch]);

  useEffect(() => {
    if(category){
      dispatch(changFilterCategory(category as FilterTypeCategory | null));
    }}, [category, dispatch]);

  useEffect(() => {
    if(type.length){
      type.forEach((item) => {
        dispatch(changFilterLTypes(item as unknown as FilterTypeTypes));
      });}
  }, [dispatch]);

  useEffect(() => {
    if(level){
      level.forEach((item) => {
        dispatch(changFilterLevel(item as unknown as FilterTypeLevel));
      });
    }}, [dispatch]);

  useEffect(() => {
    setSearchParams(currentParams);
  }, [setSearchParams, currentParams]);

  const pagination = usePagination({ total: sortingProducts?.length });
  const { currentPage, limit } = pagination;

  const slicedList = sortingProducts.slice((currentPage - MAX_COUNT_PAGE_PGINATION) * limit, currentPage * limit);

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
                      <CatalogFilter sortingProducts={sortingProducts}/>
                    </div>
                  </div>
                  <div className="catalog__content">
                    <div className="catalog-sort">
                      <CatalogSort />
                    </div>
                    {!isLoading && !sortingProducts.length && <EmptyList/>}
                    {isLoading ?
                      <LoadingScreen/> :
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
