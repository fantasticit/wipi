import React from 'react';

export interface IGlobalContext {
  setting: ISetting;
  locales: Array<string>;
  pages: IPage[];
  categories: ICategory[];
  tags: ITag[];
  changeLocale: (arg: string) => void;
}

export const GlobalContext = React.createContext<IGlobalContext>({
  setting: {},
  locales: [],
  pages: [],
  categories: [],
  tags: [],
  changeLocale: () => {},
});
