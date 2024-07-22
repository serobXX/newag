import { useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components';

import Button from '~components/buttons/Button/Button';
import { Modal, TProps } from '~components/Modal';

import { Preview } from '../../containers/Preview/Preview';
import { ButtonWrapper, Header } from './styles';

export const PreviewModal = ({ open, onClose, onDownload, onEdit }: TProps) => {
  const { t } = useTranslation();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints['--mobile']);

  return (
    <Modal
      open={open}
      onClose={onClose}
      width={1020}
      height={650}
      padding={isMobile ? '0 8px 16px' : undefined}
      margin={isMobile ? '0' : undefined}
    >
      <Header $isMobile={isMobile}>{t('preview')}</Header>

      <Preview mobileSize={'236px'} phoneWrapperSizeH={'458px'} phoneWrapperSizeW={'212px'} />
      <ButtonWrapper>
        {!!onDownload && (
          <Button onClick={onDownload} variant='primary' width={235}>
            {t('download-now')}
          </Button>
        )}
        {!!onEdit && (
          <Button onClick={onEdit} variant='secondary' width={235}>
            {t('continue-edit')}
          </Button>
        )}
      </ButtonWrapper>
    </Modal>
  );
};
