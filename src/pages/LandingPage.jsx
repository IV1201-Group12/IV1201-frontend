import { useTranslation } from 'react-i18next';

const LandingPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <h1>{t('LandingPage.Header')}</h1>
      <p>{t('LandingPage.Body')}</p>
    </>
  );
};

export default LandingPage;
