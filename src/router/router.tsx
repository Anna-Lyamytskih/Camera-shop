import { Route, Routes, Navigate } from 'react-router-dom';
import { AppRoute } from './constants';
import Product from '../pages/product';
import NotFound from '../pages/not-found';
import { Catalog } from '../pages/catalog';
import { Basket } from '../pages/basket';
import { createBrowserHistory } from 'history';
import { HistoryRouter } from '../components/history-router';

const browserHistory = createBrowserHistory();

const Router = () => (
  <HistoryRouter history={browserHistory}>
    <Routes>
      <Route path='/' element={ <Navigate to={AppRoute.Root} />}/>
      <Route path={AppRoute.Root} element={<Catalog />} />
      <Route path={AppRoute.Basket} element={<Basket />} />
      <Route path={AppRoute.Product} element={<Product />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  </HistoryRouter>
);

export default Router;
