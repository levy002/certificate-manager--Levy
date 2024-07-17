import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Navbar';
import './Home.css';
import SVGIcon from '../../components/SVGIcon/SVGIcon';
import { ReactComponent as MenuSVG } from '../../assets/images/menu.svg';
import { ReactComponent as CloseSVG } from '../../assets/images/close.svg';
import { useState } from 'react';

const Home: React.FC = () => {
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  return (
    <div className='home'>
      <header className='home__header'>
        <h1 className='home__title'>DCCS Tuzla</h1>
        {showMobileMenu ? (
          <SVGIcon
            Icon={CloseSVG}
            fill='#fff'
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          />
        ) : (
          <SVGIcon
            Icon={MenuSVG}
            fill='#fff'
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          />
        )}
      </header>
      <section className='home__contents-wrapper'>
        <Sidebar
          showMobileSidebar={showMobileMenu}
        />
        <Outlet />
      </section>
    </div>
  );
};

export default Home;
