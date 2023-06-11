import { useParams } from 'react-router-dom';
import { productsApi } from '../../store/products-api/products-api';
import { similarProductsApi } from '../../store/similar-product-api/similar-product-api';
import { useEffect, useState } from 'react';
import './product.css';
import { Helmet } from 'react-helmet-async';
import { Path } from '../../components/path';
import { Logo } from '../../components/logo';
import { NavigationList } from '../../components/navigation-list';
import { FormSearch } from '../../components/form-search';
import { BreadcrumbsList } from '../../components/breadcrumbs-list';
import { ProductItem } from '../../components/product-item';
import { ProductSlider } from '../../components/product-slider';
import { ProductReviewForm } from '../../components/product-review-form';
import { ProductReviewSuccess } from '../../components/product-review-success';
import { ReviewList } from '../../components/review-list';
import { Footer } from '../../components/footer';
import NotFound from '../not-found';
import { LoadingScreen } from '../../components/loading-screen';

const Product = () => {
  const { id } = useParams();
  const cameraId = Number(id);

  const { data, isLoading } = productsApi.useGetByIdQuery(cameraId);
  const { data: similarProducts } = similarProductsApi.useGetListQuery(cameraId);
  const camera = data;

  const [isActive, setActive] = useState<boolean>(false);
  const [activeModal, setActiveModal] = useState<boolean>(false);
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    window.scrollY = window.pageYOffset;
    setScroll(window.scrollY);
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!data) {
    return <NotFound />;
  }

  return (
    <>
      <Helmet>
        <title>Продукт - Фотошоп</title>
      </Helmet>
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
              </svg><span className="header__basket-count">3</span>
            </a>
          </div>
        </header>
        <main>
          <div className="page-content">
            <div className="breadcrumbs">
              <div className="container">
                <BreadcrumbsList
                  list={[
                    {
                      link: '/',
                      title: 'Главная',
                    },
                    {
                      link: '/',
                      title: 'Каталог',
                    },
                    {
                      title: camera?.name || '',
                    }
                  ]}
                />
              </div>
            </div>
            <div className="page-content__section">
              <section className="product">
                <ProductItem camera={camera} />
              </section>
            </div>
            <div className="page-content__section">
              <section className="product-similar">
                <div className="container">
                  <h2 className="title title--h3">Похожие товары</h2>
                  <div className="product-similar__slider">
                    <ProductSlider slides={similarProducts} />
                  </div>
                </div>
              </section>
            </div>
            <div className="page-content__section">
              <section className="review-block">
                <div className="container">
                  <div className="page-content__headed">
                    <h2 className="title title--h3">Отзывы</h2>
                    <button className="btn" type="button" onClick={() => setActive(true)}>Оставить свой отзыв</button>
                    <ProductReviewForm isActive={isActive} setActive={setActive} camera={cameraId} setActiveModal={setActiveModal} scroll={scroll}/>
                    <ProductReviewSuccess activeModal={activeModal} setActiveModal={setActiveModal} scroll={scroll}/>
                  </div>
                  <ReviewList cameraId={cameraId}/>
                </div>
              </section>
            </div>
          </div>
        </main>
        <a className="up-btn" href="#header">
          <svg width="12" height="18" aria-hidden="true">
            <use xlinkHref="#icon-arrow2"></use>
          </svg>
        </a>
        <Footer />
      </div>
    </>
  );
};
export default Product;
