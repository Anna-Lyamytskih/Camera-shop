import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../router/constants';
import ReactFocusLock from 'react-focus-lock';

export const ErrorBasket = () =>{
  const navigate = useNavigate();

  const handleContinueClick = () => {
    navigate(AppRoute.Root);
  };
  return(
    <ReactFocusLock className='modal is-active'>
      <div className="modal__wrapper">
        <div className="modal__overlay">
          <div className="modal__content">
            <p className="title title--h4">При оформлении вашего заказа возникла ошибка</p>
            <div className="modal__buttons">
              <button className="btn btn--transparent modal__btn" onClick={handleContinueClick}>Продолжить покупки</button>
            </div>
          </div>
        </div>
      </div>
    </ReactFocusLock>
  );
};
