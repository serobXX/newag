import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { TQuizList, TQuizValue } from '~containers/QuizModal/types';

import { Colors } from '~types/colors';
import { TPlugin } from '~types/plugins';

type TProps = {
  children: ReactNode;
};

export type TColorTheme = { id: string; text: string; backgroundColor: Colors };

type TContext = {
  url: string;
  appName: string;
  email: string;
  appIcon: string;
  colorTheme: TColorTheme;
  whatsApp: TWhatsApp | null;
  facebook: TFacebook | null;
  twitter: TTwitter | null;
  youtube: TYouTube | null;
  blog: TBlog | null;
  map: TMap | null;
  actionBar: boolean;
  appLayoutView: TAppLayoutView;
  plugins: { [k: string]: TPlugin | null };
  acid: string;
  multisubmitToken: string;
  quizValues: TQuizValue[];
  setQuizValues: Dispatch<SetStateAction<TQuizValue[]>>
  clearValues: () => void;
  setPlugins: Dispatch<SetStateAction<{ [k: string]: TPlugin | null }>>;
  setUrl: Dispatch<SetStateAction<string>>;
  setAppName: Dispatch<SetStateAction<string>>;
  setEmail: Dispatch<SetStateAction<string>>;
  setAppIcon: Dispatch<SetStateAction<string>>;
  setColorTheme: Dispatch<SetStateAction<TColorTheme>>;
  setWhatsApp: Dispatch<SetStateAction<TWhatsApp | null>>;
  setFacebook: Dispatch<SetStateAction<TFacebook | null>>;
  setTwitter: Dispatch<SetStateAction<TTwitter | null>>;
  setYouTube: Dispatch<SetStateAction<TYouTube | null>>;
  setBlog: Dispatch<SetStateAction<TBlog | null>>;
  setMap: Dispatch<SetStateAction<TMap | null>>;
  setActionBar: Dispatch<SetStateAction<boolean>>;
  setAppLayoutView: Dispatch<SetStateAction<TAppLayoutView>>;
  setAcid: Dispatch<SetStateAction<string>>;
  setMultisubmitToken: Dispatch<SetStateAction<string>>;
};

export type TWhatsApp = {
  number: string;
  message: string;
  buttonText: string;
};

export type TFacebook = {
  url?: string;
};

export type TTwitter = {
  url?: string;
};

export type TYouTube = {
  apiKey: string;
  inputType: 'channelUrl' | 'playlistUrl';
  url: string;
  splitChannel: boolean;
};

export type TBlog = {
  blogType: 'wordpress' | 'blogger blog' | 'tumblr' | 'pinterest' | 'rss';
  url: string;
  enablePushNotifications: boolean;
};

export type TMap = {
  html: string;
};

export type TAppLayoutView = 'SLIDER' | 'BOTTOM' | 'TABS';

const DEFAULT_COLOR_THEME = {
  id: 'blue',
  text: 'blue',
  backgroundColor: 'blue' as Colors,
};

const CreateAppContext = createContext<TContext>({} as TContext);

export const CreateAppProvider = ({ children }: TProps) => {
  const [url, setUrl] = useState('');
  const [appName, setAppName] = useState('');
  const [email, setEmail] = useState('');
  const [appIcon, setAppIcon] = useState('');
  const [colorTheme, setColorTheme] = useState(DEFAULT_COLOR_THEME);
  const [whatsApp, setWhatsApp] = useState<TWhatsApp | null>(null);
  const [facebook, setFacebook] = useState<TFacebook | null>(null);
  const [twitter, setTwitter] = useState<TTwitter | null>(null);
  const [youtube, setYouTube] = useState<TYouTube | null>(null);
  const [blog, setBlog] = useState<TBlog | null>(null);
  const [map, setMap] = useState<TMap | null>(null);
  const [actionBar, setActionBar] = useState(false);
  const [appLayoutView, setAppLayoutView] = useState<TAppLayoutView>('SLIDER');
  const [plugins, setPlugins] = useState<{ [K: string]: TPlugin | null }>({});
  const [acid, setAcid] = useState('');
  const [multisubmitToken, setMultisubmitToken] = useState('');
  const [quizValues, setQuizValues] = useState<TQuizValue[]>([]);

  const clearValues = useCallback(() => {
    setUrl('');
    setAppName('');
    setEmail('');
    setAppIcon('');
    setColorTheme(DEFAULT_COLOR_THEME);
    setWhatsApp(null);
    setFacebook(null);
    setTwitter(null);
    setYouTube(null);
    setBlog(null);
    setMap(null);
    setActionBar(false);
    setAppLayoutView('SLIDER');
    setPlugins({});
    setAcid('');
    setMultisubmitToken('');
  }, []);

  const contextValue = useMemo(
    () => ({
      url,
      appName,
      email,
      appIcon,
      colorTheme,
      whatsApp,
      facebook,
      twitter,
      youtube,
      blog,
      map,
      actionBar,
      appLayoutView,
      plugins,
      acid,
      multisubmitToken,
      quizValues,
      setQuizValues,
      clearValues,
      setPlugins,
      setUrl,
      setAppName,
      setAppIcon,
      setEmail,
      setColorTheme,
      setWhatsApp,
      setFacebook,
      setTwitter,
      setYouTube,
      setBlog,
      setMap,
      setActionBar,
      setAppLayoutView,
      setAcid,
      setMultisubmitToken,
    }),
    [
      acid,
      actionBar,
      appIcon,
      appLayoutView,
      appName,
      blog,
      clearValues,
      colorTheme,
      email,
      facebook,
      map,
      multisubmitToken,
      plugins,
      twitter,
      url,
      whatsApp,
      youtube,
      quizValues
    ],
  );

  return <CreateAppContext.Provider value={contextValue}>{children}</CreateAppContext.Provider>;
};

export const useCreateApp = () => {
  return useContext(CreateAppContext);
};
