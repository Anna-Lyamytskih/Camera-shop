import { NavigationProps } from './types';

export const Navigation = ({path, name}:NavigationProps) => (
  <li className="main-nav__item"><a className="main-nav__link" href={path}>{name}</a>
  </li>
);
