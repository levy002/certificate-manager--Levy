import { useI18n } from '../../contexts/languageContext';

const Example3View: React.FC = () => {
  const { translate } = useI18n();
  return <h2>{translate('Example3')}</h2>;
};

export default Example3View;
