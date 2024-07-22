import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react';


type TProps = {
  children: ReactNode;
};



type TContext = {
  currentLevel: number;
  levelXp: number;
  setCurrentLevel: Dispatch<SetStateAction<number>>;
  setLevelXp: Dispatch<SetStateAction<number>>;
};

const LevelContext = createContext<TContext>({} as TContext);

export const LevelProvider = ({ children }: TProps) => {


  const [isLoading, setLoading] = useState(true);
  const [currentLevel, setCurrentLevel] = useState(0)
  const [levelXp, setLevelXp] = useState(0)




  const contextValue = useMemo(
    () => ({
      currentLevel,
      levelXp,
      setCurrentLevel,
      setLevelXp
    }),
    [currentLevel, levelXp],
  );

  return <LevelContext.Provider value={contextValue}>{children}</LevelContext.Provider>;
};

export const useAuth = () => {
  return useContext(LevelContext);
};
