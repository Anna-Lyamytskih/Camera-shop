import { AppRoute } from '../../router/constants';
import { Link, generatePath } from 'react-router-dom';
import { ProductCardProps } from './types';
import { reviewListApi } from '../../store/review-list-api/review-list-api';
import { CSSProperties, useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks';

export const ProductCard = ({style, camera, isActive = false, setCurrentCamera, setOpenedAddModal }: ProductCardProps) => {
  const { data } = reviewListApi.useGetListQuery(camera.id);

  const [rate, setRate] = useState<number>();

  const link = generatePath(AppRoute.Product, {
    id: `${camera.id || ''}`,
  });

  useEffect(() => {
    let evaluationNumber = 0;

    if(!data) {
      return;
    }
    setRate(Math.ceil(data.map((i)=>(evaluationNumber += i.rating)).reverse()[0] / data.length));
  }, [data, camera]);
  const basket = useAppSelector((state) => state.BASKET.basketProducts);
  const inBasket = basket?.find((basketCamera) => basketCamera.id === camera.id);

  const handleClick = () => {
    if (setOpenedAddModal && setCurrentCamera) {
      setOpenedAddModal(true);
      setCurrentCamera(camera);
    }
  };

  return (
    <div className={`product-card ${isActive ? 'is-active' : ''}`} style={style as CSSProperties}>
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`/${camera.previewImgWebp}, /${camera.previewImgWebp2x} `}/>
          <img src={`/${camera.previewImg} `} srcSet={` /${camera.previewImg2x} `} width="280" height="240" alt={camera.name}/>
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          {rate ?
            Array(5).fill('').map((_, index) => (
              <svg key={`${index.toString()}`} width="17" height="16" aria-hidden="true">
                <use data-testid={'star'} xlinkHref={`${index + 1 <= rate ? '#icon-full-star' : '#icon-star'}`}></use>
              </svg>))
            :
            <p>Loading...</p>}
          <p className="visually-hidden">Рейтинг: {rate}</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{camera.reviewCount}</p>
        </div>
        <p className="product-card__title">{camera.name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{camera.price} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        {inBasket ?
          <Link className="btn btn--purple-border" to={AppRoute.Basket}>
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="#icon-basket"></use>
            </svg>В корзине
          </Link> :
          <button
            className="btn btn--purple product-card__btn"
            type="button"
            onClick={handleClick}
          >
            Купить
          </button>}
        {camera.id && <Link className="btn btn--transparent" to={link}>Подробнее</Link>}
      </div>
    </div>
  );
};
export default ProductCard;
