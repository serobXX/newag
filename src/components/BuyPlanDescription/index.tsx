import { useMemo } from 'react';

import { CheckIcon } from '~assets/icons/premium/Check';

import { Typography } from '..';
import { Cell, Container, Header, IconWrapper, OptionText, OptionWrapper } from './styles';
import type { TPlanList } from './types';

type TProps = {
  planList: TPlanList;
  activeColumnIndex?: number;
  isMobile?: boolean;
  width?: number | '100%';
};

export const BuyPlanDescription = ({
  planList,
  activeColumnIndex = 0,
  isMobile = false,
  width = '100%',
}: TProps) => {
  const rows = useMemo(() => {
    const rowsList = [];
    for (let i = 0; i < planList[0].options.length; i++) {
      if (isMobile) {
        rowsList.push(planList[0].options[i]);
      }
      for (let j = 0; j < planList.length; j++) {
        rowsList.push(planList[j].options[i]);
      }
    }
    return rowsList;
  }, [planList, isMobile]);

  return (
    <Container
      width={width}
      $isMobile={isMobile}
      $columnsCount={planList.length}
      $rowsCount={planList[0].options.length}
    >
      {isMobile && <Header key={-1} $isActive={false} $isBorderRight={false} />}
      {planList.map(({ planName }, index, array) => (
        <Header
          key={index}
          $isActive={activeColumnIndex === index}
          $isBorderRight={index === array.length - 1}
        >
          <Typography color={activeColumnIndex === index ? 'white' : 'black'} variant='xs-600'>
            {planName}
          </Typography>
        </Header>
      ))}
      {rows.map(({ value }, index) => {
        if (isMobile) {
          return (
            <Cell
              key={index}
              $isBorderRight={(index + 1) % (planList.length + 1) === 0}
              $isIconCell={index % (planList.length + 1) !== 0}
            >
              {index % (planList.length + 1) !== 0 && value && (
                <IconWrapper>
                  <CheckIcon />
                </IconWrapper>
              )}
              {index % (planList.length + 1) === 0 && (
                <OptionWrapper>
                  <OptionText color='black' variant='xs-400'>
                    {value ? value : ''}
                  </OptionText>
                </OptionWrapper>
              )}
            </Cell>
          );
        } else {
          return (
            <Cell key={index} $isBorderRight={(index + 1) % planList.length === 0}>
              {value && (
                <IconWrapper>
                  <CheckIcon />
                </IconWrapper>
              )}
              <OptionWrapper>
                <OptionText color='black' variant='xs-400'>
                  {value ? value : ''}
                </OptionText>
              </OptionWrapper>
            </Cell>
          );
        }
      })}
    </Container>
  );
};
