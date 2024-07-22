import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { TPremiumPlans } from '~types/auth';
import { getCookie } from '~utils/cookies';
import { premiumMapper } from '~utils/mappers';

import { STORAGE_KEYS } from '../constants';
import { useGetPremium, useGetPremiumStatus, useIsAuth } from './api/auth';

type TProps = {
  children: ReactNode;
};

export type TPremium = {
  plan: TPremiumPlans;
  description: string;
  status: string;
  pid: string;
  email: string;
  data: {
    starter: {
      planId: string;
      planName: string;
      monthly: number;
      yearly: number;
      beforeYearly: number;
      beforeMonthly: number;
    };
    master: {
      planId: string;
      planName: string;
      monthly: number;
      yearly: number;
      beforeYearly: number;
      beforeMonthly: number;
    };
    individual: {
      planId: string;
      planName: string;
      monthly: number;
      yearly: number;
      beforeYearly: number;
      beforeMonthly: number;
    };
    yearlyDiscount: number;
    priceDiscount: number;
  };
};

type TContext = {
  token: string;
  isAuth: boolean;
  firstVisit: boolean;
  premium: TPremium;
  isPremium: boolean;
  isLoading: boolean;
  setPremium: Dispatch<SetStateAction<TPremium>>;
  setToken: Dispatch<SetStateAction<string>>;
};

const AuthContext = createContext<TContext>({} as TContext);

export const AuthProvider = ({ children }: TProps) => {
  const isAuthQuery = useIsAuth();
  const getPremiumStatus = useGetPremiumStatus();
  const getPremium = useGetPremium();
  const [token, setToken] = useState(
    () => getCookie(STORAGE_KEYS.TOKEN) || localStorage.getItem(STORAGE_KEYS.TOKEN) || '',
  );
  const [premium, setPremium] = useState<TPremium>({
    plan: TPremiumPlans.NO_PLAN,
    description: '',
    status: 'active',
    pid: '',
    email: '',
    data: {
      starter: {
        planId: '',
        planName: '',
        monthly: 0,
        yearly: 0,
        beforeYearly: 0,
        beforeMonthly: 0,
      },
      master: {
        planId: '',
        planName: '',
        monthly: 0,
        yearly: 0,
        beforeYearly: 0,
        beforeMonthly: 0,
      },
      individual: {
        planId: '',
        planName: '',
        monthly: 0,
        yearly: 0,
        beforeYearly: 0,
        beforeMonthly: 0,
      },
      yearlyDiscount: 0,
      priceDiscount: 0,
    },
  });
  const [isLoading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false)
  const [firstVisit, setFirstVisit] = useState(false)

  const isPremium = premium?.plan !== TPremiumPlans.NO_PLAN && premium?.plan !== TPremiumPlans.FREE;
  const visit = localStorage.firstVisit

  useEffect(() => {
    const init = async () => {
      const authResponse = await isAuthQuery.mutateAsync();
      setIsAuth(!!authResponse?.logged)
      if (!!authResponse?.logged && authResponse?.visited_first == 0) {
        localStorage.firstVisit = 0
      }

      const premiumStatus = await getPremiumStatus.mutateAsync();
      const premium = await getPremium.mutateAsync();

      if (!!premiumStatus?.ok && !!premiumStatus?.data && !!premium) {
        setPremium({ ...premiumStatus.data, data: premiumMapper(premium) });
      }

      setLoading(false);
    };
    if (visit == 0) {
      setFirstVisit(true)
    }

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visit]);

  const contextValue = useMemo(
    () => ({
      token,
      isAuth,
      firstVisit,
      premium,
      isPremium,
      isLoading,
      setPremium,
      setToken,
    }),
    [isAuth, isLoading, isPremium, premium, token],
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
