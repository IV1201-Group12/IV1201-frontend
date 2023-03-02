/**
 * Component used to display a footer.
 */

import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer>
      <p>{t('Footer.Copyright')} © 2023</p>
    </footer>
  );
};

export default Footer;
