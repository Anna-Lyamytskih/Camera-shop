import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute } from './constants';
import Product from '../pages/product';
import NotFound from '../pages/not-found';
import { Catalog } from '../pages/catalog';
import { Basket } from '../pages/basket';

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path={AppRoute.Root} element={<Catalog />} />
      <Route path={AppRoute.Basket} element={<Basket />} />
      <Route path={AppRoute.Product} element={<Product />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
