import { useForm, useWatch } from 'react-hook-form';
import { reviewListApi } from '../../store/review-list-api/review-list-api';
import RatingList from '../rating-list';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

type ProductReviewFormType = {
  cameraId: number;
  userName: string;
  advantage: string;
  disadvantage: string;
  review: string;
  rating: number;
}

type ProductReviewFormProps = {
  isActive: boolean;
  setActive: (item: boolean) => void;
  camera: number;
  setActiveModal: (item: boolean) => void;
  scroll: number;
}

const ProductReviewForm = ({ isActive, setActive, camera, setActiveModal, scroll }: ProductReviewFormProps) => {
  const [isDisable, setDisable] = useState<boolean>();

  const popapRef = useRef<HTMLDivElement | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      isSubmitSuccessful,
      errors,
    },
    control,
    setValue
  } = useForm<ProductReviewFormType>({
    mode: 'onChange',
  });

  const rating = useWatch<ProductReviewFormType>({ control, name: 'rating' });

  const changeRatingHandler = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue('rating', Number(evt.target.value));
  };

  const [addItem, { isLoading, isError }] = reviewListApi.useAddItemMutation();

  const onSubmit = handleSubmit((data) => {
    const productReviewForm: ProductReviewFormType = {
      userName: data.userName,
      advantage: data.advantage,
      disadvantage: data.disadvantage,
      review: data.review,
      rating: data.rating,
      cameraId: camera,
    };

    addItem(productReviewForm);
  });

  const onSubmitSuccess = () => {
    if (!isActive) {
      return;
    }

    if (isLoading) {
      setDisable(true);
    }
    if (!isLoading) {
      setDisable(false);
    }
    if (isSubmitSuccessful && !isError && !isLoading) {
      reset();
      setActive(false);
      setActiveModal(true);
      setDisable(false);
    }
  };

  useEffect(() => {
    onSubmitSuccess();
  }, [isLoading, isSubmitSuccessful, setDisable, isError]);

  useEffect(() => {
    if (!isActive) {
      return;
    }

    const clickHandler = (evt: Event) => {
      if (!popapRef.current) {
        return;
      }
      if (!popapRef.current.contains((evt?.target as Node) || null)) {
        reset();
        setActive(false);
      }
    };

    const clickKeyHandler = (evt: KeyboardEvent) => {
      if (evt.keyCode === 27) {
        reset();
        setActive(false);
      }
    };

    const scrollOffHandler = () => {
      window.scrollTo(0, scroll);
    };

    document.addEventListener('mousedown', clickHandler);
    document.addEventListener('keydown', clickKeyHandler);
    document.addEventListener('scroll', scrollOffHandler);
    return () => {
      document.removeEventListener('mousedown', clickHandler);
      document.removeEventListener('keydown', clickKeyHandler);
      document.removeEventListener('scroll', scrollOffHandler);
    };
  }, [isActive, setActive, scroll]);

  return (
    <div className={`modal ${isActive ? 'is-active' : ''}`}>
      <div className="modal__wrapper">
        <div className="modal__overlay"></div>
        <div className="modal__content" ref={popapRef}>
          <p className="title title--h4">Оставить отзыв</p>
          <div className="form-review">
            <form method="post" onSubmit={(event) => void onSubmit(event)}>
              <div className="form-review__rate">
                <fieldset className="rate form-review__item" disabled={isDisable}>
                  <legend className="rate__caption">Рейтинг
                    <svg width="9" height="9" aria-hidden="true">
                      <use xlinkHref="#icon-snowflake"></use>
                    </svg>
                  </legend>
                  <div className="rate__bar">
                    <input
                      type="hidden"
                      disabled={isDisable}
                      {...register('rating', {
                        required: 'Нужно оценить товар',
                      })}
                    />
                    <p className="custom-input__error custom-input is-invalid">{errors?.rating?.message}</p>
                    <RatingList onChangeData={changeRatingHandler} />
                    <div className="rate__progress"><span className="rate__stars">{rating || 0}</span> <span>/</span> <span className="rate__all-stars">5</span>
                    </div>
                  </div>
                  <p className="rate__message">Нужно оценить товар</p>
                </fieldset>
                <div className={`custom-input ${errors?.userName ? 'is-invalid' : ''} form-review__item`}>
                  <label>
                    <span className="custom-input__label">Ваше имя
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input type="text" placeholder="Введите ваше имя" disabled={isDisable}
                      {...register('userName', {
                        required: 'Нужно указать имя',
                        minLength: {
                          value: 1,
                          message: 'Не менее 1 символа'
                        },
                      })}
                    />
                  </label>
                  <p className="custom-input__error custom-input is-invalid">{errors?.userName?.message}</p>
                </div>
                <div className={`custom-input ${errors?.advantage ? 'is-invalid' : ''} form-review__item`}>
                  <label>
                    <span className="custom-input__label">Достоинства
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input type="text" placeholder="Основные преимущества товара" disabled={isDisable}
                      {...register('advantage', {
                        required: 'Нужно указать достоинства',
                        minLength: {
                          value: 1,
                          message: 'Не менее 1 символа'
                        },
                      })}
                    />
                  </label>
                  <p className="custom-input__error custom-input is-invalid">{errors?.advantage?.message}</p>
                </div>
                <div className={`custom-input ${errors?.disadvantage ? 'is-invalid' : ''} form-review__item`}>
                  <label>
                    <span className="custom-input__label">Недостатки
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input type="text" placeholder="Главные недостатки товара" disabled={isDisable}
                      {...register('disadvantage', {
                        required: 'Нужно указать недостатки',
                        minLength: {
                          value: 1,
                          message: 'Не менее 1 символа'
                        },
                      })}
                    />
                  </label>
                  <p className="custom-input__error custom-input is-invalid">{errors?.disadvantage?.message}</p>
                </div>
                <div className={`custom-textarea ${errors?.review ? 'is-invalid' : ''} form-review__item`}>
                  <label>
                    <span className="custom-textarea__label">Комментарий
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <textarea minLength={5} placeholder="Поделитесь своим опытом покупки" disabled={isDisable}
                      {...register('review', {
                        required: 'Нужно добавить комментарий',
                        minLength: {
                          value: 5,
                          message: 'Не менее 5 символов'
                        },
                      })}
                    />
                  </label>
                  <p className="custom-textarea__error custom-textarea ">{errors?.review?.message}</p>
                </div>
              </div>
              <button
                className="btn btn--purple form-review__btn"
                type="submit"
                onClick={() => {
                  onSubmitSuccess();
                }}
              >
                Отправить отзыв
              </button>
            </form>
          </div>
          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            onClick={() => {
              reset();
              setActive(false);
            }}
          >
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductReviewForm;
