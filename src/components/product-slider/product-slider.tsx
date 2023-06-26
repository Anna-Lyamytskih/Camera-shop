import { useEffect, useState } from 'react';
import { MAX_SLIDE_COUNT } from './constants';
import { ProductSliderProps } from './types';
import { ProductCard } from '../product-card';

export const ProductSlider = ({ slides }: ProductSliderProps) => {
  const [active, setActive] = useState<number[]>([]);
  const [startEndPoints, setStartEndPoints] = useState<[number, number]>([0, MAX_SLIDE_COUNT]);

  const goToNext = () => {
    setStartEndPoints((prev) => [
      prev[0] + MAX_SLIDE_COUNT,
      prev[1] + MAX_SLIDE_COUNT,
    ] as [number, number]);
  };

  const goToPrev = () => {
    setStartEndPoints((prev) => [
      prev[0] - MAX_SLIDE_COUNT,
      prev[1] - MAX_SLIDE_COUNT,
    ] as [number, number]);
  };

  const nextSlideHandler = () => {
    goToNext();
  };

  const prevSlideHandler = () => {
    goToPrev();
  };

  useEffect(() => {
    const init = (slides || []).map((item) => item.id).slice(0, 3);
    setActive(init);
  }, [slides]);

  useEffect(() => {
    setActive((slides || []).map((item) => item.id)
      .slice(startEndPoints[0], startEndPoints[1]));
  }, [startEndPoints, slides]);

  const getEndItem = () => Math.ceil((slides?.length || 0) / MAX_SLIDE_COUNT) * MAX_SLIDE_COUNT;

  const isDisabledNext = (): boolean => startEndPoints[1] === getEndItem();

  const isDisabledPrev = (): boolean => startEndPoints[0] === 0;

  return (
    <div className="product-similar__slider-list">
      {slides?.map((item) => (
        <ProductCard
          camera={item}
          key={item.id}
          isActive={active.includes(item.id)}
        />
      ))}
      <button
        className="slider-controls slider-controls--prev"
        type="button"
        aria-label="Предыдущий слайд"
        disabled={isDisabledPrev()}
        onClick={(evt) => {
          evt.preventDefault();
          prevSlideHandler();
        }}
      >
        <svg width="7" height="12" aria-hidden="true">
          <use xlinkHref="#icon-arrow"></use>
        </svg>
      </button>
      <button
        className="slider-controls slider-controls--next"
        type="button"
        aria-label="Следующий слайд"
        disabled={isDisabledNext()}
        onClick={(evt) => {
          evt.preventDefault();
          nextSlideHandler();
        }}
      >
        <svg width="7" height="12" aria-hidden="true">
          <use xlinkHref="#icon-arrow"></use>
        </svg>
      </button>
    </div>
  );
};
