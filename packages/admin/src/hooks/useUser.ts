import React, { useEffect, useState, useRef } from 'react';
import Router from 'next/router';

export const useUser = () => {
  const ref = useRef(null);
  const [_, update] = useState(-1);

  useEffect(() => {
    if (ref.current) {
      return;
    }
    let info = window.localStorage.getItem('user');
    try {
      info = JSON.parse(info);
      ref.current = info as any;
      update((v) => v + 1);
    } catch (e) {}

    if (!info) {
      Router.replace('/login');
    }
  }, []);

  return (ref.current || {}) as any;
};
