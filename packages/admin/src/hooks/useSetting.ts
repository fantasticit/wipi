import React, { useEffect, useState } from 'react';
import { SettingProvider } from '@providers/setting';

export const useSetting = () => {
  const [value, setValue] = useState<any>({});

  useEffect(() => {
    SettingProvider.getSetting().then(res => {
      setValue(res);
    });
  }, []);

  return value;
};
