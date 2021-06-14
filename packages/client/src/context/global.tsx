import React from 'react';

export interface IGlobalContext {
  setting: ISetting;
  locale: string;
  locales: Array<string>;
  pages: IPage[];
  categories: ICategory[];
  tags: ITag[];
  changeLocale: (arg: string) => void;
}

export const GlobalContext = React.createContext<IGlobalContext>({
  setting: {},
  locale: '',
  locales: [],
  pages: [],
  categories: [],
  tags: [],
  changeLocale: () => {},
});
