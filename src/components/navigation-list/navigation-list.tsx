import { Navigation } from '../navigation';
import { navigationItems } from './constants';

export const NavigationList = () => (
  <nav className="main-nav header__main-nav">
    <ul className="main-nav__list">
      {navigationItems.map((item) => <Navigation path={item.url} name={item.title} key={item.title}/>)}
    </ul>
  </nav>
);

