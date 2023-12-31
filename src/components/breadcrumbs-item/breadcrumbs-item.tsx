import { BreadcrumbsItemProps } from './types';

export const BreadcrumbsItem = ({ link, title }: BreadcrumbsItemProps) => (
  link ? (
    <li className="breadcrumbs__item" >
      <a className="breadcrumbs__link" href={link}>
        {title}
        <svg width="5" height="8" aria-hidden="true">
          <use xlinkHref="#icon-arrow-mini">
          </use>
        </svg>
      </a>
    </li >
  ) : (
    <li className="breadcrumbs__item">
      <span className="breadcrumbs__link breadcrumbs__link--active">
        {title}
      </span>
    </li>
  ));
