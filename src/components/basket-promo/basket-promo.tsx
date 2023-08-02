import { BasketForm } from '../basket-form';

export const BasketPromo = () =>(
  <div className="basket__promo">
    <p className="title title--h4">Если у вас есть промокод на скидку, примените его в этом поле</p>
    <div className="basket-form">
      <BasketForm />
    </div>
  </div>
);

