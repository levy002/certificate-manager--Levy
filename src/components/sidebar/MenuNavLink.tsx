import { NavLink } from 'react-router-dom';

interface MenuNavLinkProps {
  to: string;
  desc: React.ReactNode;
}

const MenuNavLink: React.FC<MenuNavLinkProps> = ({
  to,
  desc,
}: MenuNavLinkProps) => {
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
