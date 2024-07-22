import { LeftArrowIcon } from '~assets/icons/button/LeftArrow';

import { BeforeButton, Container, Subtitle, SubtitleWrapper, Title, TitleWrapper } from './styles';

type TProps = {
  isMobile: boolean;
  title: string;
  subtitle?: string;
  isBeforeButton?: boolean;
  padding?: string;
  onBeforeButtonClick?: () => void;
};

export const PageTitle = ({
  isMobile,
  title,
  subtitle,
  isBeforeButton = true,
  padding = '0 16px',
  onBeforeButtonClick,
}: TProps) => {
  const handleClick = () => {
    onBeforeButtonClick?.();
  };

  return (
    <Container padding={padding}>
      <TitleWrapper $isMobile={isMobile}>
        {isMobile && isBeforeButton && (
          <BeforeButton onClick={handleClick}>
            <LeftArrowIcon />
          </BeforeButton>
        )}
        <Title Component='h2' variant='large' $isMobile={isMobile} $isBeforeButton={isBeforeButton}>
          {title}
        </Title>
      </TitleWrapper>
      {subtitle && (
        <SubtitleWrapper $isMobile={isMobile}>
          <Subtitle Component='h3' variant='m-400' color='middleGrey'>
            {subtitle}
          </Subtitle>
        </SubtitleWrapper>
      )}
    </Container>
  );
};
