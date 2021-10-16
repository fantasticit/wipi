import React from 'react';

export interface IGlobalContext {
  setting: ISetting;
  i18n: Record<string, unknown>;
  locale: string;
  locales: Array<string>;
  pages: IPage[];
  categories: ICategory[];
  tags: ITag[];
  changeLocale: (arg: string) => void;
  user: IUser;
  setUser: (arg: IUser) => void;
  removeUser: () => void;
}

export const GlobalContext = React.createContext<IGlobalContext>({
  setting: {},
  i18n: {},
  locale: '',
  locales: [],
  pages: [],
  categories: [],
  tags: [],
  changeLocale: () => {},
  user: null,
  setUser: () => {},
  removeUser: () => {},
});
