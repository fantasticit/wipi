import React from 'react';

export interface IGlobalContext {
  setting: ISetting;
  getSetting: () => void;
  user: Partial<IUser>;
  setUser: (user: IUser) => void;
  collapsed: boolean;
  toggleCollapse: () => void;
}

export const GlobalContext = React.createContext<IGlobalContext>({
  setting: {},
  getSetting: () => ({}),
  user: {},
  setUser: () => ({}),
  collapsed: false,
  toggleCollapse: () => ({}),
});
