import { ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppIcon } from '~components/AppIcon/AppIcon';
import { Colors } from '~types/colors';
import { LabelSize } from '~components/Label/types';
import { ButtonLabel, ButtonText, Container, DownloadButton, EditButton } from './styles';
import { useAuth } from '~hooks/auth';
import { BuyPremiumModal } from '../../containers/BuyPremiumModal';

type TProps = {
  appName: string;
  icon: ReactNode;
  onEditButtonClick: () => void;
  onDownloadButtonClick?: () => Promise<void>;
  isMobile?: boolean;
  bgColor?: Colors;
  isEdit?: boolean;
  isDownload?: boolean;
  containerStyles?: object;
};

export const AppItem = ({
  appName,
  icon,
  onEditButtonClick,
  onDownloadButtonClick,
  isMobile = false,
  bgColor,
  isEdit = true,
  isDownload = true,
  containerStyles,
}: TProps) => {
  const { t } = useTranslation();
  const { isPremium } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <BuyPremiumModal open={isModalOpen} onClose={handleModalClose} />
      <Container $isMobile={isMobile} $bgColor={bgColor} style={containerStyles}>
        <AppIcon maxLength={isMobile ? 8.5 : 120} text={appName} icon={icon} />
        {isDownload && onDownloadButtonClick && (
          <DownloadButton $isMobile={isMobile} onClick={onDownloadButtonClick}>
            <ButtonText variant='m-600'>Download</ButtonText>
          </DownloadButton>
        )}
        {isEdit && (
          <EditButton $isMobile={isMobile} onClick={isPremium ? onEditButtonClick : handleModalOpen}>
            {
              !isPremium &&
              <ButtonLabel
                size={LabelSize.small}
                color='banana'
                typographyVariant='xxs-500'
                typographyColor='darkLabelText'
              >
                {t('premium')}
              </ButtonLabel>
            }
            <ButtonText variant='m-600'>Edit</ButtonText>
          </EditButton>
        )}
      </Container>
    </>
  );
};
