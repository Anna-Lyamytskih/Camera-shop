import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AppRoute } from '../../router/constants';
import ReactFocusLock from 'react-focus-lock';
import { useCallback, useEffect, useRef } from 'react';
import { resetOrderStatus } from '../../store/basket-process/basket-process';
import { Status } from '../../store/basket-process/const';

export const BasketOrderSuccessModal = () => {
  const modalRef = useRef(null);
  const orderStatus = useAppSelector((state) => state.BASKET.orderStatus);

  const dispatch = useAppDispatch();

  const handleCloseClick = () => {
    dispatch(resetOrderStatus());
  };

  const handleEscapeKeydown = useCallback((evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      handleCloseClick();
    }
  }, [handleCloseClick]);

  useEffect(() => {
    if (orderStatus === Status.Success && modalRef.current) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscapeKeydown);
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEscapeKeydown);
    };
  }, [orderStatus, handleEscapeKeydown]);

  return (
    <ReactFocusLock className={`modal ${orderStatus === Status.Success ? 'is-active' : ''}`}>
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={handleCloseClick}></div>
        <div className="modal__content" ref={modalRef} tabIndex={-1}>
          <p className="title title--h4">Спасибо за покупку</p>
          <svg className="modal__icon" width="80" height="78" aria-hidden="true">
            <use xlinkHref="#icon-review-success"></use>
          </svg>
          <div className="modal__buttons">
            <Link
              className="btn btn--purple modal__btn modal__btn--fit-width"
              to={AppRoute.Root}
              onClick={handleCloseClick}
            >Вернуться к покупкам
            </Link>
          </div>
          <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={handleCloseClick}>
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </ReactFocusLock>
  );
};
