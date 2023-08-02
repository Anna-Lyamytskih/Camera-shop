import ReactFocusLock from 'react-focus-lock';
import { useAppDispatch } from '../../hooks';
import { addProduct } from '../../store/basket-process/basket-process';
import { Product } from '../../store/products-api/types';
import { BasketItem, BasketItemType } from '../basket-item/basket-item';
import { useCallback, useEffect, useRef } from 'react';

type BasketItemModalProps = {
  isOpen: boolean;
  camera:Product;
  onCloseCLick: () => void;
  setOpenedAddSuccessModal: (arg: boolean) => void;
}

export const BasketItemModal = ({isOpen, camera, setOpenedAddSuccessModal, onCloseCLick}:BasketItemModalProps) => {
  const dispatch = useAppDispatch();
  const modalRef = useRef(null);

  const handleClick = () => {
    dispatch(addProduct(camera));

    setOpenedAddSuccessModal(true);
    onCloseCLick();
  };

  const handleEscapeKeydown = useCallback((evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      onCloseCLick();
    }
  }, [onCloseCLick]);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscapeKeydown);
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEscapeKeydown);
    };
  }, [isOpen, handleEscapeKeydown]);

  return (
    <ReactFocusLock className={`modal ${isOpen ? 'is-active' : ''}`}>
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={onCloseCLick}></div>
        <div className="modal__content" ref={modalRef} tabIndex={-1}>
          <p className="title title--h4">Добавить товар в корзину</p>
          <BasketItem camera={camera} type={BasketItemType.Add}/>
          <div className="modal__buttons">
            <button
              className="btn btn--purple modal__btn modal__btn--fit-width"
              type="button"
              onClick={handleClick}
            >
              <svg width="24" height="16" aria-hidden="true">
                <use xlinkHref="#icon-add-basket"></use>
              </svg>Добавить в корзину
            </button>
          </div>
          <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={onCloseCLick}>
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </ReactFocusLock>
  );
};
