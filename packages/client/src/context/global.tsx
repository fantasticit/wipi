import React from 'react';

export interface IGlobalContext {
  setting: ISetting;
  pages: IPage[];
  categories: ICategory[];
  tags: ITag[];
}

export const GlobalContext = React.createContext<IGlobalContext>({
  setting: {},
  pages: [],
  categories: [],
  tags: [],
});
