import { useParams } from 'react-router-dom';
import BreadcrumbsList from '../../components/breadcrumbs-list';
import Footer from '../../components/footer';
import FormSearch from '../../components/form-search';
import Logo from '../../components/logo';
import NavigationList from '../../components/navigation-list';
import Path from '../../components/path';
import ProductCard from '../../components/product-card';
import ReviewList from '../../components/review-list';
import { productsApi } from '../../store/products-api/products-api';
import ProductItem from '../../components/product-item';
import { similarProductsApi } from '../../store/similar-product-api/similar-product-api';
import { SimilarProducts } from '../../store/similar-product-api/types';
import { useEffect, useState } from 'react';
import './product.css';
import ProductReviewForm from '../../components/product-review-form';
import ProductReviewSuccess from '../../components/product-review-success';

type ProductSliderProps = {
  slides: SimilarProducts | undefined;
}

const MAX_SLIDE_COUNT = 3;

const ProductSlider = ({ slides }: ProductSliderProps) => {
  const [active, setActive] = useState<number[]>([]);
  const [startEndPoints, setStartEndPoints] = useState<[number, number]>([0, MAX_SLIDE_COUNT]);

  const goToNext = () => {
    setStartEndPoints((prev) => [
      prev[0] + MAX_SLIDE_COUNT,
      prev[1] + MAX_SLIDE_COUNT,
    ] as [number, number]);
  };

  const goToPrev = () => {
    setStartEndPoints((prev) => [
      prev[0] - MAX_SLIDE_COUNT,
      prev[1] - MAX_SLIDE_COUNT,
    ] as [number, number]);
  };

  const nextSlideHandler = () => {
    goToNext();
  };

  const prevSlideHandler = () => {
    goToPrev();
  };

  useEffect(() => {
    const init = (slides || []).map((item) => item.id).slice(0, 3);
    setActive(init);
  }, [slides]);

  useEffect(() => {
    setActive((slides || []).map((item) => item.id)
      .slice(startEndPoints[0], startEndPoints[1]));
  }, [startEndPoints]);

  const getEndItem = () => Math.ceil((slides?.length || 0) / MAX_SLIDE_COUNT) * MAX_SLIDE_COUNT;

  const isDisabledNext = (): boolean => startEndPoints[1] === getEndItem();

  const isDisabledPrev = (): boolean => startEndPoints[0] === 0;

  return (
    <div className="product-similar__slider-list">
      {slides?.map((item) => (
        <ProductCard
          camera={item}
          key={item.id}
          isActive={active.includes(item.id)}
        />
      ))}
      <button
        className="slider-controls slider-controls--prev"
        type="button"
        aria-label="Предыдущий слайд"
        disabled={isDisabledPrev()}
        onClick={(evt) => {
          evt.preventDefault();
          prevSlideHandler();
        }}
      >
        <svg width="7" height="12" aria-hidden="true">
          <use xlinkHref="#icon-arrow"></use>
        </svg>
      </button>
      <button
        className="slider-controls slider-controls--next"
        type="button"
        aria-label="Следующий слайд"
        disabled={isDisabledNext()}
        onClick={(evt) => {
          evt.preventDefault();
          nextSlideHandler();
        }}
      >
        <svg width="7" height="12" aria-hidden="true">
          <use xlinkHref="#icon-arrow"></use>
        </svg>
      </button>
    </div>
  );
};

const Product = () => {
  const { id } = useParams();
  const cameraId = Number(id);

  const { data } = productsApi.useGetByIdQuery(cameraId);
  const { data: similarProducts } = similarProductsApi.useGetListQuery(cameraId);
  const camera = data;

  const [isActive, setActive] = useState<boolean>(false);
  const [activeModal, setActiveModal] = useState<boolean>(false);
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    window.scrollY = window.pageYOffset;
    setScroll(window.scrollY);
  });

  return (
    <>
      <title>Продукт - Фотошоп</title>
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
