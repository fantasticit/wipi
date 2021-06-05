import React, { useCallback, useRef } from 'react';
import { Tooltip } from 'antd';
import { CopyOutlined, CheckOutlined } from '@ant-design/icons';
import copy from 'copy-to-clipboard';
import { useToggle } from '@/hooks/useToggle';
import styles from './index.module.scss';

interface Props {
  text: string;
}

export const Copy: React.FC<Props> = ({ text }) => {
  const timerRef = useRef<NodeJS.Timeout>();
  const [copied, toggleCopied] = useToggle(false);
  const onClick = useCallback(() => {
    if (copied) return;
    copy(text);
    toggleCopied();
    timerRef.current = setTimeout(toggleCopied, 1500);
    return () => {
      clearTimeout(timerRef.current);
    };
  }, [text, copied, toggleCopied]);

  return (
    <Tooltip title={copied ? '复制成功' : '复制'}>
      <span className={styles.wrapper}>
        {!copied ? (
          <CopyOutlined onClick={onClick} />
        ) : (
          <CheckOutlined style={{ color: 'var(--primary-color)' }} />
        )}
      </span>
    </Tooltip>
  );
};
