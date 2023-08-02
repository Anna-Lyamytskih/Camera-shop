import ReactFocusLock from 'react-focus-lock';
import { useAppDispatch } from '../../hooks';
import { removeProduct } from '../../store/basket-process/basket-process';
import { Product } from '../../store/products-api/types';
import { BasketItem } from '../basket-item';
import { BasketItemType } from '../basket-item/basket-item';
import { useCallback, useEffect, useRef } from 'react';

type BasketRemoveCameraModalProps = {
  camera: Product;
  isOpen: boolean;
  onCloseCLick: () => void;
};

export const BasketRemoveCameraModal = ({ camera, isOpen, onCloseCLick }: BasketRemoveCameraModalProps) => {
  const dispatch = useAppDispatch();
  const modalRef = useRef(null);

  const handleClick = () => {
    dispatch(removeProduct(camera));
    localStorage.removeItem('persist-state');
    localStorage.removeItem('totalCount-state');
    localStorage.removeItem('discountPercent-state');
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
          <p className="title title--h4">Удалить этот товар?</p>
          <BasketItem camera={camera} type={BasketItemType.Remove}/>
          <div className="modal__buttons">
            <button className="btn btn--purple modal__btn modal__btn--half-width" type="button" onClick={handleClick}>
          Удалить
            </button>
            <button className="btn btn--transparent modal__btn modal__btn--half-width" onClick={onCloseCLick}>
          Продолжить покупки
            </button>
          </div>
        </div>
      </div>
    </ReactFocusLock>
  );
};

export default BasketRemoveCameraModal;
