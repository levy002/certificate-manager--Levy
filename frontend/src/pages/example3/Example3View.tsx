import { useI18n } from '../../contexts/LanguageContext';

const Example3View: React.FC = () => {
  const { translate } = useI18n();
  return <h2>{translate('example3')}</h2>;
};

export default Example3View;
