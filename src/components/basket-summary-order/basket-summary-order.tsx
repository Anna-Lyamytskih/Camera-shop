import { BasketOrder } from '../basket-order';
import { BasketPromo } from '../basket-promo';

export const BasketSummaryOrder = () => (
  <div className="basket__summary" data-testid="basket-summary">
    <BasketPromo />
    <BasketOrder/>
  </div>
);
