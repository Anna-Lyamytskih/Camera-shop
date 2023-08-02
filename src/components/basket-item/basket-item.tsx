import { useAppDispatch } from '../../hooks';
import { addProduct, decrementProductCount, setProductCount } from '../../store/basket-process/basket-process';
import { Product } from '../../store/products-api/types';

export enum BasketItemType {
  Standart = 'standart',
  Add = 'add',
  Remove = 'remove'
}

type BasketItemProps = {
  camera: Product;
  type: BasketItemType;
  setOpenedRemoveModal?: (arg: boolean) => void;
  setCurrentCamera?: (camera: Product) => void;
}

export const getTotalProductPrice = (price: number, count?: number) => {
  if (!count) {
    return price;
  }

  return price * count;
};

export const formatPrice = (price: number): string => Number(price).toString().replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, '$1 ');

export const MIN_PRODUCT_COUNT = 1;
export const MAX_PRODUCT_COUNT = 99;

export const BasketItem = ({camera, type, setOpenedRemoveModal, setCurrentCamera}: BasketItemProps) => {
  const dispatch = useAppDispatch();

  const handleIncrementClick = () => {
    dispatch(addProduct(camera));
  };

  const handleDecrementClick = () => {
    dispatch(decrementProductCount(camera));
  };

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;

    if (+value > MAX_PRODUCT_COUNT) {
      dispatch(setProductCount({ id: camera.id, count: MAX_PRODUCT_COUNT }));

      return;
    }

    dispatch(setProductCount({ id: camera.id, count: Math.round(+value) }));
  };

  const handleBlur = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;

    if (+value < MIN_PRODUCT_COUNT) {
      dispatch(setProductCount({ id: camera.id, count: MIN_PRODUCT_COUNT }));
    }
  };

  const handleDeleteClick = () => {
    if (setOpenedRemoveModal && setCurrentCamera) {
      setOpenedRemoveModal(true);
      setCurrentCamera(camera);
    }
  };

  return (
    <li className={`basket-item ${type !== BasketItemType.Standart ? 'basket-item--short' : ''}`}>
      <div className="basket-item__img">
        <picture>
          <source type="image/webp" srcSet={`/${camera.previewImgWebp}, /${camera.previewImgWebp2x} 2x`} /><img src={camera.previewImg} srcSet={camera.previewImg2x} width="140" height="120" alt={camera.name} />
        </picture>
      </div>
      <div className="basket-item__description">
        <p className="basket-item__title">{camera.name}</p>
        <ul className="basket-item__list">
          <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span> <span className="basket-item__number">{camera.vendorCode}</span>
          </li>
          <li className="basket-item__list-item">{camera.type} камера</li>
          <li className="basket-item__list-item">{camera.level} уровень</li>
        </ul>
      </div>
      {type === BasketItemType.Add &&
          <p className="basket-item__price">
            <span className="visually-hidden">Цена:</span>{formatPrice(camera.price)} ₽
          </p>}
      {type === BasketItemType.Standart &&
        <>
          <p className="basket-item__price">
            <span className="visually-hidden">Цена:</span>{formatPrice(camera.price)} ₽
          </p>
          <div className="quantity">
            <button
              className="btn-icon btn-icon--prev"
              aria-label="уменьшить количество товара"
              disabled={camera.count === MIN_PRODUCT_COUNT}
              onClick={handleDecrementClick}
            >
              <svg width="7" height="12" aria-hidden="true">
                <use xlinkHref="#icon-arrow"></use>
              </svg>
            </button>
            <label className="visually-hidden" htmlFor="counter1"></label>
            <input
              type="number"
              id="counter1"
              value={camera.count || ''}
              min="1"
              max="99"
              aria-label="количество товара"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <button
              className="btn-icon btn-icon--next"
              aria-label="увеличить количество товара"
              disabled={camera.count === MAX_PRODUCT_COUNT}
              onClick={handleIncrementClick}
            >
              <svg width="7" height="12" aria-hidden="true">
                <use xlinkHref="#icon-arrow"></use>
              </svg>
            </button>
          </div>
          <div className="basket-item__total-price">
            <span className="visually-hidden">Общая цена:</span>{getTotalProductPrice(camera.price, camera.count)} ₽
          </div>
          <button
            className="cross-btn"
            type="button"
            aria-label="Удалить товар"
            onClick={handleDeleteClick}
          >
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </>}
    </li>
  );};
