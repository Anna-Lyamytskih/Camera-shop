import { useParams } from 'react-router-dom';
import { productsApi } from '../../store/products-api/products-api';
import { similarProductsApi } from '../../store/similar-product-api/similar-product-api';
import { useEffect, useState } from 'react';
import './product.css';
import { Helmet } from 'react-helmet-async';
import { Path } from '../../components/path';
import { Logo } from '../../components/logo';
import { NavigationList } from '../../components/navigation-list';
import { BreadcrumbsList } from '../../components/breadcrumbs-list';
import { ProductItem } from '../../components/product-item';
import { ProductSlider } from '../../components/product-slider';
import { ProductReviewForm } from '../../components/product-review-form';
import { ProductReviewSuccess } from '../../components/product-review-success';
import { ReviewList } from '../../components/review-list';
import { Footer } from '../../components/footer';
import NotFound from '../not-found';
import { LoadingScreen } from '../../components/loading-screen';
import { AppRoute } from '../../router/constants';
import { Link} from 'react-scroll';
import { SearchForm } from '../../components/search-form';
import { BasketCount } from '../../components/basket-count';

const Product = () => {
  const { id } = useParams();
  const cameraId = Number(id);

  const { data, isLoading } = productsApi.useGetByIdQuery(cameraId);
  const { data: similarProducts } = similarProductsApi.useGetListQuery(cameraId);
  const camera = data;

  const [isActive, setActive] = useState<boolean>(false);
  const [activeModal, setActiveModal] = useState<boolean>(false);
  const [scroll, setScroll] = useState(0);
  const [rate, setRate] = useState<number>();
  const [evaluation, setEvaluation] = useState<number>();
/* eslint-disable */
  useEffect(() => {
    if(isActive){
    document.body.style.overflow = 'hidden';}
    window.scrollY = window.pageYOffset;
    setScroll(window.scrollY);
    return ()=> {
      document.body.style.overflow = '';
    }
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
        <header className="header" id="header" title='header'>
          <div className="container">
            <Logo />
            <NavigationList />
            <div className="form-search">
              <SearchForm />
            </div>
            <BasketCount />
          </div>
        </header>
        <main>
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
                      link: AppRoute.Root,
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
                {camera ?
                  <ProductItem camera={camera} rate={rate} evaluation={evaluation}/>
                  :
                  <LoadingScreen />}
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
                  <ReviewList cameraId={cameraId} setRate={setRate} setEvaluation={setEvaluation}/>
                </div>
              </section>
            </div>
          </div>
        </main>
        <Link className="up-btn" href="#header" to="header" smooth={true} duration={2500} offset={-70}>
          <svg width="12" height="18" aria-hidden="true">
            <use xlinkHref="#icon-arrow2"></use>
          </svg>
        </Link>
        <Footer />
      </div>
    </>
  );
};
export default Product;
