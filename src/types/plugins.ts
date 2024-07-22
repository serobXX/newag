export type TPlugin = {
  id: number;
  text: string;
  icon: JSX.Element;
  value: string;
  price: string;
  description: string;
  oneSignalAppId?: string;
  pervalue?:string;
  mixpanelValue?: string;
};
