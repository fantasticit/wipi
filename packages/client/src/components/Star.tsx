import React, { useCallback } from 'react';
import { message } from 'antd';

export const Star = () => {
  const star = useCallback(() => {
    // @ts-nocheck
    const win = window as any;
    if (win.sidebar && win.sidebar.addPanel) {
      win.sidebar.addPanel(document.title, win.location.href, '');
    } else if (win.external && 'AddFavorite' in win.external) {
      win.external.AddFavorite(location.href, document.title);
    } else {
      message.info(
        '按下 ' +
          (navigator.userAgent.toLowerCase().indexOf('mac') != -1 ? 'Command/Cmd' : 'CTRL') +
          ' + D 收藏页面'
      );
    }
  }, []);

  return (
    <div onClick={star}>
      <svg
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
      >
        <path
          d="M465.132544 75.743232c18.172928-36.846592 47.88736-36.846592 66.039808 0l87.411712 177.503232c22.71232 40.148992 61.696 68.472832 106.872832 77.661184l195.47136 28.47744c40.621056 5.856256 49.800192 34.117632 20.443136 62.798848L799.909888 560.323584c-31.154176 34.076672-46.036992 79.971328-40.822784 125.824l33.3824 194.87744c6.949888 40.41728-17.089536 57.997312-53.415936 38.943744l-174.844928-92.094464c-41.98912-19.05152-90.131456-19.05152-132.100096 0l-174.834688 92.094464c-36.31616 19.052544-60.366848 1.452032-53.446656-38.943744l33.49504-194.87744c5.233664-45.852672-9.649152-91.747328-40.793088-125.824L55.05536 422.182912c-29.303808-28.681216-20.197376-56.942592 20.411392-62.798848l195.49184-28.47744c45.188096-9.188352 84.1728-37.512192 106.86464-77.661184L465.132544 75.743232z"
          fill="currentColor"
        ></path>
      </svg>
    </div>
  );
};
