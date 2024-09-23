import { useI18n } from '../../contexts/LanguageContext';

const Example2View: React.FC = () => {
  const { translate } = useI18n();
  return <h2>{translate('example2')}</h2>;
};

export default Example2View;
