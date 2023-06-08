import { useEffect, useRef } from 'react';

type ProductReviewSuccessProps = {
  activeModal:boolean;
  setActiveModal: (item:boolean) => void;
}

export const ProductReviewSuccess = ({setActiveModal, activeModal}:ProductReviewSuccessProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if(!activeModal){
      return;
    }

    const clickHandler = (evt: Event) => {
      if(!modalRef.current) {
        return;
      }
      if(!modalRef.current.contains((evt?.target as Node) || null)){
        setActiveModal(false);
      }
    };

    document.addEventListener('mousedown', clickHandler);
    return () => {
      document.removeEventListener('mousedown', clickHandler);
    };
  },[activeModal, setActiveModal]);

  return(
    <div className={`modal ${activeModal ? 'is-active' : ''} modal--narrow`}>
      <div className="modal__wrapper">
        <div className="modal__overlay"></div>
        <div className="modal__content" ref={modalRef}>
          <p className="title title--h4">Спасибо за отзыв</p>
          <svg className="modal__icon" width="80" height="78" aria-hidden="true">
            <use xlinkHref="#icon-review-success"></use>
          </svg>
          <div className="modal__buttons">
            <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button" onClick={() => setActiveModal(false)}>Вернуться к покупкам
            </button>
          </div>
          <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={() => setActiveModal(false)}>
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
