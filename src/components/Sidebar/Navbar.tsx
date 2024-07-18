import React, { useState } from 'react';

import MenuNavLink from './MenuNavLink';
import { ReactComponent as ChevronDownSVG } from '../../assets/images/chevron-down.svg';
import { ReactComponent as ChevronUpSVG } from '../../assets/images/chevron-up.svg';
import { ReactComponent as HomeSVG } from '../../assets/images/home.svg';
import { ReactComponent as MenuSVG } from '../../assets/images/menu.svg';
import './sidebar.css';
import machineLearningExamples from '../../data/Example';
import { SidebarProps } from '../../types/types';
import SVGIcon from '../SVGIcon/SVGIcon';

const Sidebar: React.FC<SidebarProps> = ({ showMobileSidebar }: SidebarProps) => {
  const [showMachineLearningLinks, setShowMachineLearningLinks] = useState<boolean>(false);

  const handleMachineLearningClick = (): void => {
    setShowMachineLearningLinks(!showMachineLearningLinks);
  };

  return (
    <nav className={showMobileSidebar ? 'sidebar sidebar--mobile' : 'sidebar'}>
      <MenuNavLink
        to='/'
        desc={
          <>
            <SVGIcon Icon={HomeSVG} />
            <p>Start</p>
          </>
        }
      />

      <section className='machine-learning'>
        <section
          role='button'
          tabIndex={0}
          className='machine-learning__header'
          onClick={handleMachineLearningClick}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleMachineLearningClick();
            }
          }}
        >
          <div className='machine-learning__header-content'>
            <SVGIcon Icon={MenuSVG} />
            <p>Machine Learning</p>
          </div>
          <SVGIcon Icon={showMachineLearningLinks ? ChevronUpSVG : ChevronDownSVG} />
        </section>
        {showMachineLearningLinks && (
          <section className='machine-learning__links'>
            {machineLearningExamples.map((example) => (
              <MenuNavLink
                key={example.name}
                to={`/machineLearning/${example.name}`}
                desc={example.name}
              />
            ))}
          </section>
        )}
      </section>
    </nav>
  );
};

export default Sidebar;
