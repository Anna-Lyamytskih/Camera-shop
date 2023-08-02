import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Coupon} from '../../store/basket-process/const';
import { basketDiscountApi } from '../../store/basket-api/basket-api';
import { setCoupon, setDiscount } from '../../store/basket-process/basket-process';
import { useEffect} from 'react';

type PromoFormField = {
  promo: Coupon;
};

type BasketCouponType = {
  coupon: Coupon;
}
export const BasketForm = () => {
  const dispatch = useAppDispatch();
  const coupon = useAppSelector((state) => state.BASKET.coupon);

  const {register,handleSubmit,formState: {errors,isValid},} = useForm<PromoFormField>({mode: 'onSubmit'});

  const [addItem, {data:item, isLoading}] = basketDiscountApi.useAddItemMutation();

  const onSubmit = handleSubmit((data) => {
    const basketCoupon: BasketCouponType = {
      coupon: data.promo
    };
    addItem(basketCoupon.coupon);
  });

  useEffect(()=>{
    if(!item){
      return;
    }
    dispatch(setDiscount(item as unknown as number));
  },[item]);

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form action="#" onSubmit={(event) => void onSubmit(event)}>
      <div className={`custom-input ${errors.promo ? 'is-invalid' : ''} ${isValid ? 'is-valid' : ''}`}>
        <label>
          <span className="custom-input__label">Промокод</span>
          <input
            {...register('promo', {
              validate: {
                positive: (value) => {
                  if (Object.values(Coupon).includes(value)) {
                    dispatch(setCoupon(value));
                    return true;
                  } else {
                    return false;
                  }
                }
              }
            })}
            type="text"
            name="promo"
            defaultValue={coupon ? coupon : ''}
            placeholder="Введите промокод"
          />
        </label>
        <p className="custom-input__error">Промокод неверный</p>
        <p className="custom-input__success">Промокод принят!</p>
      </div>
      <button className="btn" type="submit" disabled={isLoading}>
        {isLoading ? 'Loading' : 'Применить'}
      </button>
    </form>
  );
};
