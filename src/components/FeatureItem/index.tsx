import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { PlusIcon } from '~assets/icons/button/Plus';

import { Typography } from '..';
import {
  AddButton,
  ButtonText,
  Container,
  ContentWrapper,
  EditButton,
  IconWrapper,
  Wrapper,
} from './styles';

type TProps = {
  id: number;
  icon: ReactNode;
  text: string;
  disabled?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
  value?: string;
  mixpanelvalue?: string
  onEditButtonClick?: (id: number, mixpanelvalue: string) => void;
  onAddButtonClick?: (id: number, mixpanelvalue: string) => void;
};

export const FeatureItem = ({
  id,
  icon,
  text,
  value,
  disabled,
  isFirst = false,
  isLast = false,
  mixpanelvalue,
  onEditButtonClick,
  onAddButtonClick,
}: TProps) => {
  const { t } = useTranslation();

  const handleAddButtonClick = () => {
    if (onEditButtonClick) {
      onEditButtonClick(id, mixpanelvalue as string);
    }
  };

  const handleEditButtonClick = () => {
    if (onAddButtonClick) {
      onAddButtonClick(id, mixpanelvalue as string);
    }
  };

  return (
    <Container $isFirst={isFirst} $isLast={isLast}>
      <Wrapper>
        <IconWrapper>{icon}</IconWrapper>
        <ContentWrapper>
          <Typography variant='m-600'>{text}</Typography>
          {value && (
            <Typography variant='m-400' color='lightBackdrop'>
              {value}
            </Typography>
          )}
        </ContentWrapper>
      </Wrapper>
      <div>
        {!value && (
          <AddButton disabled={disabled} onClick={handleAddButtonClick}>
            <ButtonText variant='m-600'>{t('add')}</ButtonText>
            <PlusIcon />
          </AddButton>
        )}
        {value && (
          <EditButton onClick={handleEditButtonClick}>
            <ButtonText variant='m-600'>{t('edit')}</ButtonText>
          </EditButton>
        )}
      </div>
    </Container>
  );
};
