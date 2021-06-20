import React, { useState, useEffect } from 'react';
import cls from 'classnames';
import { useToggle } from '@/hooks/useToggle';
import styles from './index.module.scss';

export const Theme = () => {
  const [mounted, setMounted] = useState(false);
  const [dark, toggleDark] = useToggle(false);

  useEffect(() => {
    const dark = window.localStorage.getItem('dark');
    if (dark) {
      toggleDark(dark === '1');
    } else {
      const isSystemDark =
        window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      toggleDark(isSystemDark);
    }
    setMounted(true);
  }, [toggleDark]);

  useEffect(() => {
    if (!mounted) {
      return;
    }
    if (dark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    window.localStorage.setItem('dark', dark ? '1' : '-1');
  }, [mounted, dark]);

  return (
    <div className={cls(styles.theme, dark && styles.dark)} onClick={toggleDark}>
      <span className={styles.moon}></span>
      <span className={styles.sun}></span>
      <small className={styles.sunRay}></small>
      <small className={styles.sunRay}></small>
      <small className={styles.sunRay}></small>
      <small className={styles.sunRay}></small>
      <small className={styles.sunRay}></small>
      <small className={styles.sunRay}></small>
    </div>
  );
};
