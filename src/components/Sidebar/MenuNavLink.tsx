import { NavLink } from 'react-router-dom';

import { MenuNavLinkProps } from '../../types/types';

const MenuNavLink: React.FC<MenuNavLinkProps> = ({ to, desc }: MenuNavLinkProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? 'sidebar__link sidebar__link--active' : 'sidebar__link'
      }
    >
      {desc}
    </NavLink>
  );
};

export default MenuNavLink;
