import { useState } from 'react';
import { ProductRate } from '../product-rate';
import { Tabs } from '../tabs';
import { ProductItemProps } from './types';
import { BasketItemModal } from '../basket-item-modal';
import { BasketSuccessModal } from '../basket-success-modal';

export const ProductItem = ({ camera, rate, evaluation }: ProductItemProps) => {
  const [openedAddModal, setOpenedAddModal] = useState(false);
  const [openedAddSuccessModal, setOpenedAddSuccessModal] = useState(false);

  const handleAddBasketClick = () => {
    setOpenedAddModal(true);
  };

  const handleAddModalCloseClick = () => {
    setOpenedAddModal(false);
  };

  const handleAddSuccessModalCloseClick = () => {
    setOpenedAddSuccessModal(false);
  };

  return(
    <div className="container">
      <div className="product__img">
        <picture>
          <source type="image/webp" srcSet={`/${camera.previewImgWebp || ''}, /${camera.previewImgWebp2x || ''}`} />
          <img src={`/${camera.previewImg || ''}`} srcSet={`/${camera.previewImg2x || ''}`} width="560" height="480" alt={camera.name} />
        </picture>
      </div>
      <div className="product__content">
        <h1 className="title title--h3">{camera.name}</h1>
        <ProductRate rate={rate} evaluation={evaluation}/>
        <p className="product__price"><span className="visually-hidden">Цена:</span>{camera.price} ₽</p>
        <button
          className="btn btn--purple"
          type="button"
          onClick={handleAddBasketClick}
        >
          <svg width="24" height="16" aria-hidden="true">
            <use xlinkHref="#icon-add-basket"></use>
          </svg>
                    Добавить в корзину
        </button>
        <Tabs
          tabs={[
            {
              key: 'characteristic',
              name: 'Характеристики',
              component: (
                <ul key="characteristic" className="product__tabs-list">
                  <li className="item-list"><span className="item-list__title">Артикул:</span>
                    <p className="item-list__text"> {camera.vendorCode}</p>
                  </li>
                  <li className="item-list"><span className="item-list__title">Категория:</span>
                    <p className="item-list__text">{camera.category}</p>
                  </li>
                  <li className="item-list"><span className="item-list__title">Тип камеры:</span>
                    <p className="item-list__text">{camera.type}</p>
                  </li>
                  <li className="item-list"><span className="item-list__title">Уровень:</span>
                    <p className="item-list__text">{camera.level}</p>
                  </li>
                </ul>
              ),
            },
            {
              key: 'description',
              name: 'Описание',
              component: (
                <div key="description" className="product__tabs-text">
                  <p>{camera.description}</p>
                </div>
              ),
            },
          ]}
        />
        <BasketItemModal isOpen={openedAddModal} camera={camera} setOpenedAddSuccessModal={setOpenedAddSuccessModal} onCloseCLick={handleAddModalCloseClick}/>
        <BasketSuccessModal isOpen={openedAddSuccessModal} onCloseCLick={handleAddSuccessModalCloseClick} />
      </div>
    </div >
  );
};
