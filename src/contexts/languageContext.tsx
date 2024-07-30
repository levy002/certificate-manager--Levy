import { createContext, useState, useContext, ReactNode, useMemo } from 'react';

import de from '../locales/de.json';
import en from '../locales/en.json';

const translations: Record<string, Record<string, string>> = {
  en,
  de,
};

interface LanguageContextProps {
  language: string;
  setLanguage: (language: string) => void;
  translate: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined,
);

export const LanguageProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [language, setLanguage] = useState('en');

  const translate = (key: string): string => {
    return translations[language]?.[key] || key;
  };

  const contextValues = useMemo(
    () => ({ language, setLanguage, translate }),
    [language, setLanguage, translate],
  );

  return (
    <LanguageContext.Provider value={contextValues}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
