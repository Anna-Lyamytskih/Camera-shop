import { Helmet } from 'react-helmet-async';
import { BasketList } from '../../components/basket-list';
import { Footer } from '../../components/footer';
import { Logo } from '../../components/logo';
import { NavigationList } from '../../components/navigation-list';
import { Path } from '../../components/path';
import { SearchForm } from '../../components/search-form';
import { BasketSummaryOrder } from '../../components/basket-summary-order';
import { BreadcrumbsList } from '../../components/breadcrumbs-list';
import { AppRoute } from '../../router/constants';
import { BasketCount } from '../../components/basket-count';
import { BasketOrderSuccessModal } from '../../components/basket-order-success-modal';

export const Basket = () => (
  <>
    <Helmet>
      <title>Корзина - Фотошоп</title>
    </Helmet>
    <Path />
    <div className="wrapper">
      <header className="header" id="header">
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
                    title: 'Корзина',
                  },
                ]}
              />
            </div>
          </div>
          <section className="basket">
            <div className="container">
              <h1 className="title title--h2">Корзина</h1>
              <BasketList />
              <BasketSummaryOrder/>
            </div>
          </section>
        </div>
        <BasketOrderSuccessModal/>
      </main>
      <Footer />
    </div>
  </>
);
