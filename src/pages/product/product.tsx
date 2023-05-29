import BreadcrumbsList from '../../components/breadcrumbs-list';
import Footer from '../../components/footer';
import FormSearch from '../../components/form-search';
import Logo from '../../components/logo';
import NavigationList from '../../components/navigation-list';
import Path from '../../components/path';
import ProductCard from '../../components/product-card';
import ReviewList from '../../components/review-list';

const Product = () => (
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
          </div><a className="header__basket-link" href="#">
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="#icon-basket"></use>
            </svg><span className="header__basket-count">3</span></a>
        </div>
      </header>
      <main>
        <div className="page-content">
          <div className="breadcrumbs">
            <div className="container">
              <BreadcrumbsList />
            </div>
          </div>
          <div className="page-content__section">
            <section className="product">
              <Product />
            </section>
          </div>
          <div className="page-content__section">
            <section className="product-similar">
              <div className="container">
                <h2 className="title title--h3">Похожие товары</h2>
                <div className="product-similar__slider">
                  <div className="product-similar__slider-list">
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <button className="slider-controls slider-controls--prev" type="button" aria-label="Предыдущий слайд" disabled>
                      <svg width="7" height="12" aria-hidden="true">
                        <use xlinkHref="#icon-arrow"></use>
                      </svg>
                    </button>
                    <button className="slider-controls slider-controls--next" type="button" aria-label="Следующий слайд">
                      <svg width="7" height="12" aria-hidden="true">
                        <use xlinkHref="#icon-arrow"></use>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className="page-content__section">
            <section className="review-block">
              <div className="container">
                <div className="page-content__headed">
                  <h2 className="title title--h3">Отзывы</h2>
                  <button className="btn" type="button">Оставить свой отзыв</button>
                </div>
                <ReviewList />
                <div className="review-block__buttons">
                  <button className="btn btn--purple" type="button">Показать больше отзывов
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main><a className="up-btn" href="#header">
        <svg width="12" height="18" aria-hidden="true">
          <use xlinkHref="#icon-arrow2"></use>
        </svg></a>
      <Footer />
    </div>
  </>
)

export default Product;
