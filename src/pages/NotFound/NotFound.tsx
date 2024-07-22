import { ReactComponent as NotFoundSVG } from '../../assets/images/404.svg';
import { ReactComponent as HomeSVG } from '../../assets/images/home.svg';
import MenuNavLink from '../../components/Sidebar/MenuNavLink';
import SVGIcon from '../../components/SVGIcon/SVGIcon';
import './notFound.css';

const NotFound: React.FC = () => {
  return (
    <section className="not-found">
      <h1 className="home__title">DCCS Tuzla</h1>
      <section className="not-found__contents">
        <div className="not-found__icon">
          <SVGIcon Icon={NotFoundSVG} />
        </div>
        <h2 className="not-found__title">Page Not Found</h2>
        <p className="not-found__description">
          Sorry, the page you requested could not be found. Try navigating back
          home.
        </p>
        <MenuNavLink
          to="/"
          desc={
            <div className="not-found__nav-link">
              <SVGIcon
                Icon={HomeSVG}
                fill="#fff"
              />
              <p>Home</p>
            </div>
          }
        />
      </section>
    </section>
  );
};

export default NotFound;
