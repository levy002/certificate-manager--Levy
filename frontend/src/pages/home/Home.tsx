import React, { useCallback, useState } from 'react';
import { Outlet } from 'react-router-dom';

import './Home.css';
import { ReactComponent as CloseSVG } from '../../assets/images/close.svg';
import { ReactComponent as MenuSVG } from '../../assets/images/menu.svg';
import SelectField from '../../components/form/SelectFIeld';
import Sidebar from '../../components/sidebar/Sidebar';
import SVGIcon from '../../components/svgIcon/SVGIcon';
import { useI18n } from '../../contexts/LanguageContext';
import { UserContext } from '../../contexts/UserContext';

const Home: React.FC = () => {
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  const { setLanguage, language } = useI18n();
  const { users, activeUser, setActiveUser } = React.useContext(UserContext)!;

  const handleMenuClick = useCallback((): void => {
    setShowMobileMenu((prevShowMobileMenu) => !prevShowMobileMenu);
  }, []);

  const handleLanguageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>): void => {
      const selectedLanguage = e.target.value;
      if (selectedLanguage === 'English') {
        setLanguage('en');
      } else {
        setLanguage('de');
      }
    },
    [setLanguage],
  );

  const handleUserChange = useCallback(
      (e: React.ChangeEvent<HTMLSelectElement>): void => {
        const selectedUserId = e.target.value.split(' ');
        const selectedUser = users.find(
          (user) =>
            user.firstName === selectedUserId[0] &&
            user.name === selectedUserId[1],
        );
        if (selectedUser) {
          setActiveUser(selectedUser);
        }
      },
      [users, setActiveUser],
    );

  return (
    <div className="home">
      <header className="home__header">
        <h1 className="home__title">DCCS Tuzla</h1>
        <div className="home_language">
          <SelectField
            label="Language"
            value={language === 'en' ? 'English' : 'German'}
            name="language"
            placeholder=""
            error={false}
            options={['English', 'German']}
            onChange={handleLanguageChange}
          />
        </div>
         <div className="home_user">
                  <SelectField
                    label="User"
                    value={`${activeUser?.firstName} ${activeUser?.name}`}
                    name="user"
                    placeholder=""
                    error={false}
                    options={users.map((user) => `${user.firstName} ${user.name}`)}
                    onChange={handleUserChange}
                  />
          </div>
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
        <section className="home__contents">
          <Outlet />
        </section>
      </section>
    </div>
  );
};

export default Home;
