import { BuyPlanType, PricePeriod } from '../types';
import { Container, PricePeriodText, PriceValueText } from './styles';

type TProps = { value: string; type: BuyPlanType; pricePeriod: PricePeriod; isActive: boolean };

export const Price = ({ value, type, pricePeriod, isActive }: TProps) => {
  return (
    <Container type={type}>
      <PriceValueText type={type} color={isActive ? 'white' : 'black'}>
        {value}
      </PriceValueText>
      <PricePeriodText
        type={type}
        color={isActive ? 'white' : 'black'}
      >{`/${pricePeriod}`}</PricePeriodText>
    </Container>
  );
};
