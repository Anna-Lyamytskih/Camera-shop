import { useAppDispatch, useAppSelector } from '../../hooks';
import { basketOrderApi } from '../../store/basket-api/basket-api';
import { Product, Products } from '../../store/products-api/types';
import { getTotalProductPrice } from '../basket-item/basket-item';
import { orderStatus, reset } from '../../store/basket-process/basket-process';
import { Status } from '../../store/basket-process/const';
import { useEffect, useState } from 'react';
import { ErrorBasket } from '../error-basket';

export const getTotalPrice = (cameras: Products) => cameras?.reduce((acc, camera) => {
  const productTotalPrice = getTotalProductPrice(camera.price, camera.count);

  return acc + productTotalPrice;
}, 0);

export const getDiscount = (totalPrice: number, discount: number) => Math.round(totalPrice / 100 * discount);

export const getFinalPrice = (totalPrice: number, discount: number) => totalPrice - discount;

export const BasketOrder = () => {
  const currentCoupon = useAppSelector((state) => state.BASKET.coupon);
  const basketProducts = useAppSelector((state) => state.BASKET.basketProducts);
  const discountPercent = useAppSelector((state) => state.BASKET.discounts);
  const dispatch = useAppDispatch();

  const camerasId = basketProducts?.reduce((acc: number[], camera: Product) => {
    acc.push(camera.id);

    return acc;
  }, []);

  const totalPrice = getTotalPrice(basketProducts);
  const discount = getDiscount(totalPrice, discountPercent);
  const finalPrice = getFinalPrice(totalPrice, discount);

  localStorage.setItem('discountPercent-state', JSON.stringify(discountPercent));

  const [addItem, {isError, isLoading, isSuccess}] = basketOrderApi.useAddItemMutation();

  const handleClick = () => {
    addItem({ camerasIds: camerasId, coupon: currentCoupon });
  };

  useEffect(()=>{
    if(isSuccess){
      dispatch(orderStatus(Status.Success));
      dispatch(reset());
      localStorage.removeItem('persist-state');
      localStorage.removeItem('totalCount-state');
      localStorage.removeItem('discountPercent-state');
    }
  },[isSuccess]);

  const [aee, setarr] = useState<boolean>();

  useEffect(()=>{
    if(isError){
      setarr(true);
    }
  },[isError]);

  return(
    <div className="basket__summary-order">
      {aee ?
        <ErrorBasket />
        :
        ''}
      <p className="basket__summary-item">
        <span className="basket__summary-text">Всего:</span>
        <span className="basket__summary-value">{totalPrice} ₽</span>
      </p>
      <p className="basket__summary-item">
        <span className="basket__summary-text">Скидка:</span>
        <span className={`basket__summary-value ${discount && 'basket__summary-value--bonus'}`}>{discount} ₽</span>
      </p>
      <p className="basket__summary-item">
        <span className="basket__summary-text basket__summary-text--total">К оплате:</span>
        <span className="basket__summary-value basket__summary-value--total">{finalPrice} ₽</span>
      </p>
      <button className="btn btn--purple" onClick={handleClick} disabled={isLoading}>
        {isLoading ? 'Loading' : 'Оформить заказ'}
      </button>
    </div>
  );
};
