import { useI18n } from '../../contexts/languageContext';

const Example2View: React.FC = () => {
  const { translate } = useI18n();
  return <h2>{translate('Example2')}</h2>;
};

export default Example2View;
