import { useTranslation } from 'react-i18next';

const LanguageSwitch = () => {
  const { i18n } = useTranslation();
  const languages = {
    en: { name: 'English' },
    sv: { name: 'Svenska' },
  };

  return (
    <div>
      {Object.keys(languages).map((language) => (
        <button
          key={language}
          type="submit"
          style={{
            fontWeight: i18n.resolvedLanguage === language ? 'bold' : 'normal',
          }}
          onClick={() => i18n.changeLanguage(language)}
        >
          {languages[language].name}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitch;
