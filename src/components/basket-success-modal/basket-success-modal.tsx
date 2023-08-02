import { Link, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../router/constants';
import ReactFocusLock from 'react-focus-lock';
import { useCallback, useEffect, useRef } from 'react';

type BasketSuccessModalProps = {
  isOpen: boolean;
  onCloseCLick: () => void;
}

export const BasketSuccessModal = ({isOpen, onCloseCLick}:BasketSuccessModalProps) =>{
  const navigate = useNavigate();
  const modalRef = useRef(null);

  const handleContinueClick = () => {
    navigate(AppRoute.Root);
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
    <ReactFocusLock className={`modal ${isOpen ? 'is-active' : ''} modal--narrow`}>
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={onCloseCLick}></div>
        <div className="modal__content" ref={modalRef} tabIndex={-1}>
          <p className="title title--h4">Товар успешно добавлен в корзину</p>
          <svg className="modal__icon" width="86" height="80" aria-hidden="true">
            <use xlinkHref="#icon-success"></use>
          </svg>
          <div className="modal__buttons">
            <button className="btn btn--transparent modal__btn" onClick={handleContinueClick}>Продолжить покупки</button>
            <Link className="btn btn--purple modal__btn modal__btn--fit-width" to={AppRoute.Basket}>Перейти в корзину</Link>
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
