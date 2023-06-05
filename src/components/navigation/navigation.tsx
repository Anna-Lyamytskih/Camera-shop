type NavigationProps = {
  path: string;
  name: string;
}

const Navigation = ({path, name}:NavigationProps) => (
  <li className="main-nav__item"><a className="main-nav__link" href={path}>{name}</a>
  </li>
);

export default Navigation;
