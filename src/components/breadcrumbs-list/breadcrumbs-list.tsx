import { BreadcrumbsItem } from '../breadcrumbs-item';
import { BreadcrumbsListProps } from './types';

export const BreadcrumbsList = ({ list }: BreadcrumbsListProps) => (
  <ul className="breadcrumbs__list">
    {list.map((item) => (
      <BreadcrumbsItem key={item.title} link={item.link} title={item.title} />
    ))}
  </ul>
);

