import { useForm } from 'react-hook-form';
import { reviewListApi } from '../../store/review-list-api/review-list-api';
import { useParams } from 'react-router-dom';

type ProductReviewFormType = {
  cameraId: number;
  userName: string;
  advantage: string;
  disadvantage: string;
  review: string;
  rating: number;
}

const ProductReviewForm = () => {
  const { id } = useParams();
  const cameraId = Number(id);

  const {register, handleSubmit, formState: { errors, isValid }} = useForm<ProductReviewFormType>({ mode: 'onChange'});

  const [addItem] = reviewListApi.useAddItemMutation();

  const onSubmit = handleSubmit((data) => {
    const productReviewForm: ProductReviewFormType = {
      cameraId: cameraId,
      userName: data.userName,
      advantage: data.advantage,
      disadvantage: data.disadvantage,
      review: data.review,
      rating: data.rating
    };
    addItem(productReviewForm);
  });

  return(
    <>
      <div className="form-review">
        <form method="post" onSubmit={(event) => void onSubmit(event)}>
          <div className="form-review__rate">
            <fieldset className="ratehtmlForm-review__item">
              <legend className="rate__caption">Рейтинг
                <svg width="9" height="9" aria-hidden="true">
                  <use xlinkHref="#icon-snowflake"></use>
                </svg>
              </legend>
              <div className="rate__bar">
                <div className="rate__group">
                  <input className="visually-hidden" id="star-5" name="rate" type="radio" value="5"/>
                  <label className="rate__label"htmlFor="star-5" title="Отлично"></label>
                  <input className="visually-hidden" id="star-4" name="rate" type="radio" value="4"/>
                  <label className="rate__label"htmlFor="star-4" title="Хорошо"></label>
                  <input className="visually-hidden" id="star-3" name="rate" type="radio" value="3"/>
                  <label className="rate__label"htmlFor="star-3" title="Нормально"></label>
                  <input className="visually-hidden" id="star-2" name="rate" type="radio" value="2"/>
                  <label className="rate__label"htmlFor="star-2" title="Плохо"></label>
                  <input className="visually-hidden" id="star-1" name="rate" type="radio" value="1"/>
                  <label className="rate__label"htmlFor="star-1" title="Ужасно"></label>
                </div>
                <div className="rate__progress"><span className="rate__stars">0</span> <span>/</span> <span className="rate__all-stars">5</span>
                </div>
              </div>
              <p className="rate__message">Нужно оценить товар</p>
            </fieldset>
            <div className="custom-inputhtmlForm-review__item">
              <label>
                <span className="custom-input__label">Ваше имя
                  <svg width="9" height="9" aria-hidden="true">
                    <use xlinkHref="#icon-snowflake"></use>
                  </svg>
                </span>
                <input type="text" placeholder="Введите ваше имя"
                  {...register('userName', {
                    required: 'Нужно указать имя',
                    minLength: {
                      value: 1,
                      message: 'Имя должно содержать не менее 1 символа'
                    },
                  })}
                />
              </label>
              <div> {errors?.userName && <p className="custom-input__error">{errors?.userName?.message}</p>}</div>
            </div>
            <div className="custom-inputhtmlForm-review__item">
              <label>
                <span className="custom-input__label">Достоинства
                  <svg width="9" height="9" aria-hidden="true">
                    <use xlinkHref="#icon-snowflake"></use>
                  </svg>
                </span>
                <input type="text" placeholder="Основные преимущества товара"
                  {...register('advantage', {
                    required: 'Нужно указать достоинства',
                    minLength: {
                      value: 1,
                      message: 'Поле должно содержать не менее 1 символа'
                    },
                  })}
                />
              </label>
              <div> {errors?.advantage && <p className="custom-input__error">{errors?.advantage?.message}</p>}</div>
            </div>
            <div className="custom-inputhtmlForm-review__item">
              <label>
                <span className="custom-input__label">Недостатки
                  <svg width="9" height="9" aria-hidden="true">
                    <use xlinkHref="#icon-snowflake"></use>
                  </svg>
                </span>
                <input type="text" placeholder="Главные недостатки товара"
                  {...register('disadvantage', {
                    required: 'Нужно указать недостатки',
                    minLength: {
                      value: 1,
                      message: 'Поле должно содержать не менее 1 символа'
                    },
                  })}
                />
              </label>
              <div> {errors?.disadvantage && <p className="custom-input__error">{errors?.disadvantage?.message}</p>}</div>
            </div>
            <div className="custom-textareahtmlForm-review__item">
              <label>
                <span className="custom-textarea__label">Комментарий
                  <svg width="9" height="9" aria-hidden="true">
                    <use xlinkHref="#icon-snowflake"></use>
                  </svg>
                </span>
                <textarea minLength={5} placeholder="Поделитесь своим опытом покупки"
                  {...register('review', {
                    required: 'Нужно добавить комментарий',
                    minLength: {
                      value: 5,
                      message: 'Поле должно содержать не менее 5 символов'
                    },
                  })}
                />
              </label>
              <div> {errors?.disadvantage && <p className="custom-textarea__error">{errors?.disadvantage?.message}</p>}</div>
            </div>
          </div>
          <button className="btn btn--purplehtmlForm-review__btn" type="submit" disabled={!isValid}>Отправить отзыв</button>
        </form>
      </div>
      <button className="cross-btn" type="button" aria-label="Закрыть попап">
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </>
  );
};

export default ProductReviewForm;
