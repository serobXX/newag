import { TPremium } from '~hooks/auth';

export type TPremiumResponse = {
  ok: boolean;
  data?: TPremium;
};

export enum TPremiumPlans {
  NO_PLAN = 'NO PLAN',
  FREE = 'FREE',
  MASTER = 'MASTER',
}
