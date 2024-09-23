import { useI18n } from '../../contexts/LanguageContext';

const StartScreen: React.FC = () => {
  const { translate } = useI18n();
  return <h2>{translate('start')}</h2>;
};

export default StartScreen;
