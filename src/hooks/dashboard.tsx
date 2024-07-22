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
import levelTasks from '../../levels.json'
import axios from 'axios';

type TProps = {
  children: ReactNode;
};

type TContext = {
  appList: TAppItem[];
  setAppList: Dispatch<SetStateAction<TAppItem[]>>;
  gameData: any,
  setGameData: any,
  stepsComplete: any,
  isEnabledQuiz: boolean
  setStepsComplete: Dispatch<SetStateAction<any>>;
  currentLevel: any;
  nextLevel: any;
  selectedApp: string;
  setSelectedApp: Dispatch<SetStateAction<any>>;
};

export type TAppItem = {
  index: number;
  wid: string;
  name: string;
  caption: string;
  created: string;
  template_name: string;
  template_app_version: string;
  template_version: string;
  template_caption: string;
  installs: string;
};

const DashboardContext = createContext<TContext>({} as TContext);

export const DashboardProvider = ({ children }: TProps) => {
  const [appList, setAppList] = useState<TAppItem[]>([]);
  const [gameData, setGameData] = useState<any>({ level: 3, xp: 0, missions_completed: '[]' })
  // const [gameData, setGameData] = useState<any>({})
  const [currentLevel, setCurrentLevel] = useState<any>({})
  const [stepsComplete, setStepsComplete] = useState<any>([])
  const [nextLevel, setNextLevel] = useState<any>({})
  const [selectedApp, setSelectedApp] = useState<string>('');
  const [isEnabledQuiz, setisEnabledQuiz] = useState(false);


  useEffect(() => {
    const level = levelTasks.levels.find((elm) => elm?.level == gameData?.level)
    const nextlevel = levelTasks.levels.find((elm) => elm?.level == Number(gameData?.level) + 1)
    if (level) {
      setCurrentLevel(level)
    }
    if (nextlevel) {
      setNextLevel(nextlevel)
    }
  }, [gameData])

  const TIRCountries = [
    "AM",
    "KZ",
    "US",
    "CA",
    "RU",
    "GB",
    "FR",
    "DE",
    "IT",
    "ES",
    "NL",
    "SE",
    "NO",
    "FI",
    "DK",
    "AU", // Австралия
    "AT", // Австрия
    "BE", // Бельгия
    "CZ", // Чехия
    "IS", // Исландия
    "IE", // Ирландия
    "NZ", // Новая Зеландия
    "SI", // Словения
    "CH", // Швейцария
    "PT", // Португалия
    "PL", // Польша
    "AL", // Албания
    "AD", // Андорра
    "AR", // Аргентина
    "BY", // Беларусь
    "BA", // Босния и Герцеговина
    "BR", // Бразилия
    "BG", // Болгария
    "HR", // Хорватия
    "CY", // Кипр
    "EE", // Эстония
    "GR", // Греция
    "HK", // Гонконг
    "HU", // Венгрия
    "JP", // Япония
    "LV", // Латвия
    "LT", // Литва
    "MK", // Македония
    "MT", // Мальта
    "MD", // Молдова
    "ME", // Черногория
    "KR", // Республика Корея (южная)
    "RO", // Румыния
    "RS", // Сербия
    "SG", // Сингапур
    "SK", // Словакия
    "TR", // Турция
    "UA", // Украина
    "AE"  // Объединенные Арабские Эмираты
  ];

  useEffect(() => {
    axios.get('https://ipapi.co/json/').then((response) => {
      let data = response.data;
      console.log(data.country_code);
      const isInTir = TIRCountries.find((elm) => elm == data.country_code)
      if (isInTir) {
        setisEnabledQuiz(true)
      }
    }).catch((error) => {
      console.log(error);
      setisEnabledQuiz(false)
    });

  }, [])


  const contextValue = useMemo(() => ({
    appList,
    currentLevel,
    setAppList,
    gameData,
    setGameData,
    stepsComplete,
    setStepsComplete,
    nextLevel,
    selectedApp,
    setSelectedApp,
    isEnabledQuiz
  }), [appList, nextLevel, currentLevel, gameData, stepsComplete, selectedApp, isEnabledQuiz]);

  return <DashboardContext.Provider value={contextValue}>{children}</DashboardContext.Provider>;
};

export const useDashboard = () => {
  return useContext(DashboardContext);
};
