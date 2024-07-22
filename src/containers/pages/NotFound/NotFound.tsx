import { useTranslation } from 'react-i18next';

import { Typography } from '~components/Typography/Typography';

import { Container } from './styles';

export const NotFound = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <Typography>{t('not-found')}</Typography>
    </Container>
  );
};
