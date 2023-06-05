import Navigation from '../navigation';

const navigationItems = [
  {
    url:'/',
    title:'Каталог'
  },
  {
    url:'/',
    title:'Гарантии'
  },
  {
    url:'/',
    title:'Доставка'
  },
  {
    url:'/',
    title:'О компании'
  }
];

const NavigationList = () => (
  <nav className="main-nav header__main-nav">
    <ul className="main-nav__list">
      {navigationItems.map((item) => <Navigation path={item.url} name={item.title} key={item.title}/>)}
    </ul>
  </nav>
);
export default NavigationList;
