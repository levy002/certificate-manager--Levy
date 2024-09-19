import { ReactComponent as NotFoundSVG } from '../../assets/images/404.svg';
import { ReactComponent as HomeSVG } from '../../assets/images/home.svg';
import MenuNavLink from '../../components/sidebar/MenuNavLink';
import SVGIcon from '../../components/svgIcon/SVGIcon';
import { useI18n } from '../../contexts/LanguageContext';
import './NotFound.css';

const NotFound: React.FC = () => {
  const { translate } = useI18n();
  return (
    <section className="not-found">
      <h1 className="home__title">DCCS Tuzla</h1>
      <section className="not-found__contents">
        <div className="not-found__icon">
          <SVGIcon Icon={NotFoundSVG} />
        </div>
        <h2 className="not-found__title">{translate('page_not_found')}</h2>
        <p className="not-found__description">
          {translate('sorry_page_not_found')}.
        </p>
        <MenuNavLink
          to="/frontend"
          desc={
            <div className="not-found__nav-link">
              <SVGIcon
                Icon={HomeSVG}
                fill="#fff"
              />
              <p>{translate('home')}</p>
            </div>
          }
        />
      </section>
    </section>
  );
};

export default NotFound;
