import { useEffect, useState } from 'react';
import Banner from '../../components/banner';
import CatalogFilter from '../../components/catalog-filter';
import CatalogSort from '../../components/catalog-sort';
import Footer from '../../components/footer';
import FormSearch from '../../components/form-search';
import Logo from '../../components/logo';
import NavigationList from '../../components/navigation-list';
import PaginationList from '../../components/pagination-list';
import Path from '../../components/path';
import ProductCardList from '../../components/product-card-list';
import { useGetSortProducts } from '../../hooks/use-get-sort-products/use-get-sort-products';
import { Products } from '../../store/products-api/types';

const Catalog = () => {
  const sortingProducts = useGetSortProducts();

  const [products, setProducts] = useState([] as Products);
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage] = useState(9);

  useEffect(() => {
    setProducts(sortingProducts);
  }, []);

  const lastProductIndex = currentPage * productPerPage;
  const firstProductIndex = lastProductIndex - productPerPage;
  const currentProduct = sortingProducts.slice(firstProductIndex, lastProductIndex);

  const paginate = (pageNumber:number) => {
    setCurrentPage(pageNumber);
  };

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  return (
    <>
      <title>Каталог - Фотошоп</title>
      <Path />
      <div className="wrapper">
        <header className="header" id="header">
          <div className="container">
            <Logo />
            <NavigationList />
            <div className="form-search">
              <FormSearch />
              <button className="form-search__reset" type="reset">
                <svg width="10" height="10" aria-hidden="true">
                  <use xlinkHref="#icon-close"></use>
                </svg><span className="visually-hidden">Сбросить поиск</span>
              </button>
            </div>
            <a className="header__basket-link" href="#">
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
                <ul className="breadcrumbs__list">
                  <li className="breadcrumbs__item">
                    <a className="breadcrumbs__link" href="index.html">Главная <svg width="5" height="8" aria-hidden="true"> <use xlinkHref="#icon-arrow-mini"></use> </svg> </a>
                  </li>
                  <li className="breadcrumbs__item"><span className="breadcrumbs__link breadcrumbs__link--active">Каталог</span>
                  </li>
                </ul>
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
                    <ProductCardList cameras={sortingProducts} />
                    <PaginationList productPerPage={productPerPage} totalProducts={products?.length} paginate={paginate} nextPage={nextPage} prevPage={prevPage}/>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );};

export default Catalog;
