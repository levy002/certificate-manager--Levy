import React, { useCallback, useState } from 'react';

import MenuNavLink from './MenuNavLink';
import { ReactComponent as ChevronDownSVG } from '../../assets/images/chevron-down.svg';
import { ReactComponent as ChevronUpSVG } from '../../assets/images/chevron-up.svg';
import { ReactComponent as HomeSVG } from '../../assets/images/home.svg';
import { ReactComponent as MenuSVG } from '../../assets/images/menu.svg';
import './Sidebar.css';
import { useI18n } from '../../contexts/LanguageContext';
import SVGIcon from '../svgIcon/SVGIcon';

interface SidebarProps {
  showMobileSidebar: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  showMobileSidebar,
}: SidebarProps) => {
  const { translate } = useI18n();
  const [showMachineLearningLinks, setShowMachineLearningLinks] =
    useState<boolean>(false);

  const handleMachineLearningClick = useCallback((): void => {
    setShowMachineLearningLinks((prev) => !prev);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>): void => {
      if (e.key === 'Enter' || e.key === ' ') {
        handleMachineLearningClick();
      }
    },
    [handleMachineLearningClick],
  );

  return (
    <nav className={showMobileSidebar ? 'sidebar sidebar--mobile' : 'sidebar'}>
      <MenuNavLink
        to="/"
        desc={
          <>
            <SVGIcon Icon={HomeSVG} />
            <p>{translate('start')}</p>
          </>
        }
      />

      <section className="machine-learning">
        <section
          role="button"
          tabIndex={0}
          className="machine-learning__header"
          onClick={handleMachineLearningClick}
          onKeyDown={handleKeyDown}
        >
          <div className="machine-learning__header-content">
            <SVGIcon Icon={MenuSVG} />
            <p>{translate('machine_learning')}</p>
          </div>
          <SVGIcon
            Icon={showMachineLearningLinks ? ChevronUpSVG : ChevronDownSVG}
          />
        </section>
        {showMachineLearningLinks && (
          <section className="machine-learning__links">
            <MenuNavLink
              to="/machineLearning/certificates"
              desc={translate('certificates')}
            />
            <MenuNavLink
              to="/machineLearning/example2"
              desc={translate('example2')}
            />
            <MenuNavLink
              to="/machineLearning/example3"
              desc={translate('example3')}
            />
          </section>
        )}
      </section>
    </nav>
  );
};

export default Sidebar;
