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

type TProps = {
  children: ReactNode;
};

type TContext = {
  agAnalProps: IAgItem;
  setagAnalProps: any;
};

export type IAgItem = {
  wid?: string;
  pid?: string;
  uid?: string;
  location?: any;
};


const AgAnalyticsContext = createContext<TContext>({} as TContext);

export const AgAnalyticsProvider = ({ children }: TProps) => {
  const [agAnalProps, setagAnalProps] = useState<IAgItem>({} as IAgItem);
  const contextValue = useMemo(() => ({ agAnalProps, setagAnalProps }), [agAnalProps]);

  // const appendScript = () => {
  //   const scriptElement = document.createElement('script');
  //   scriptElement.innerHTML = `
  //     (function (w, d, s, analUrl, insertUrl) {
  //       if (w.agEventsData) return;
  //       var _agEventsDataObj = function () {
  //         this.analyticsUrl = analUrl;
  //         this.queue = [];
  //       };
  //       w.agEventsData = new _agEventsDataObj();
  //       w.agEvent = w.agEvent || function () {
  //         var time = Math.round((1 * new Date()) / 1000);
  //         w.agEventsData.queue.push({ time: time, args: arguments });
  //       };
  //       var el = document.createElement(s);
  //       var first = d.getElementsByTagName(s)[0];
  //       el.async = true;
  //       el.src = insertUrl;
  //       first.parentNode.insertBefore(el, first);
  //     })(window, document, 'script',
  //       'http://analytics.appsgeyser.com/website_event.php',
  //       location.origin + '/js/analytics/ag.js?v=14');
  //     agEvent('visit-${agAnalProps.location}', {
  //       pid: ${agAnalProps.pid},
  //       authorized: 1,
  //     });
  //   `;
  //   document.head.appendChild(scriptElement);
  // };

  // useEffect(() => {
  //   appendScript()
  //   console.log('script appended');

  // }, [agAnalProps])



  return <AgAnalyticsContext.Provider value={contextValue}>{children}</AgAnalyticsContext.Provider>;
};

export const useAgAnalytics = () => {
  return useContext(AgAnalyticsContext);
};
