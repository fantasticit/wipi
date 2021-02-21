import React from 'react';

export const GlobalContext = React.createContext<{ [key: string]: any }>({ setting: {} });
