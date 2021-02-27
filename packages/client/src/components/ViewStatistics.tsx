import { useEffect } from 'react';
import { ViewProvider } from '@/providers/view';

const addView = (url) => {
  if (/localhost|127\.0\.0\.1/.test(url)) {
    return;
  }
  ViewProvider.addView({ url });
};

export const ViewStatistics = (props) => {
  useEffect(() => {
    addView(window.location.href);
  }, []);

  return props.children || null;
};
