import React, { useEffect } from 'react';

const id = 'fix-antd-stle-transition';

export const FixAntdStyleTransition = () => {
  useEffect(() => {
    const el = document.querySelector(`#${id}`);
    el && el.parentNode.removeChild(el);
  }, []);

  return (
    <style
      id={id}
      dangerouslySetInnerHTML={{
        __html: ` * { transition: none !important; }`,
      }}
    ></style>
  );
};
