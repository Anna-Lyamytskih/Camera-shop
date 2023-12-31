import { Link, generatePath } from 'react-router-dom';
import { AppRoute } from '../../router/constants';
import { LoadingScreen } from '../loading-screen';
import { promoApi } from '../../store/promo-api/promo-api';

export const Banner = () => {
  const { data } = promoApi.useGetListQuery();

  if (!data) {
    return <LoadingScreen />;
  }

  const link = generatePath(AppRoute.Product, {
    id: `${data.id || ''}`,
  });

  return (
    <div className="banner">
      <picture>
        <source type="image/webp" srcSet={`${data.previewImgWebp || ''}, ${data.previewImgWebp2x || ''}`} />
        {data.id ? <img src={data.previewImg} srcSet={data.previewImg2x} width="1280" height="280" alt="баннер" />
          :
          <img src='/img/content/banner-bg.jpg' srcSet={data.previewImg2x} width="1280" height="280" alt="баннер" />}
      </picture>
      <p className="banner__info"><span className="banner__message">Новинка!</span>
        <span className="title title--h1">{data.name}</span>
        <span className="banner__text">
          Профессиональная камера от&nbsp;известного производителя
        </span>
        {data.id && <Link className="btn" to={link}>Подробнее</Link>}
      </p>
    </div>
  );
};

