import { MenuNavLinkProps } from '../../types/types';
import { NavLink } from 'react-router-dom';

const MenuNavLink: React.FC<MenuNavLinkProps> = ({ to, desc }) => (
  <NavLink
    to={to}
    className={({ isActive }) => (isActive ? 'sidebar__link sidebar__link--active' : 'sidebar__link')}
  >
    {desc}
  </NavLink>
);

export default MenuNavLink;
