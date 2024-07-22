import { useCallback, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { ReactComponent as CloseSVG } from '../../assets/images/close.svg';
import { ReactComponent as MenuSVG } from '../../assets/images/menu.svg';
import Sidebar from '../../components/Sidebar/Sidebar';
import './Home.css';
import SVGIcon from '../../components/SVGIcon/SVGIcon';

const Home: React.FC = () => {
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

  const handleMenuClick = useCallback((): void => {
    setShowMobileMenu((prevShowMobileMenu) => !prevShowMobileMenu);
  }, []);
  
  return (
    <div className="home">
      <header className="home__header">
        <h1 className="home__title">DCCS Tuzla</h1>
        {showMobileMenu ? (
          <SVGIcon
            Icon={CloseSVG}
            fill="#fff"
            onClick={handleMenuClick}
          />
        ) : (
          <SVGIcon
            Icon={MenuSVG}
            fill="#fff"
            onClick={handleMenuClick}
          />
        )}
      </header>
      <section className="home__contents-wrapper">
        <Sidebar showMobileSidebar={showMobileMenu} />
        <Outlet />
      </section>
    </div>
  );
};

export default Home;
