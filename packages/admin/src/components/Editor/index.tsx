import React, { useState, useEffect, useRef } from 'react';
import cls from 'classnames';
import { Spin } from 'antd';
// import * as Showdown from 'showdown';
import style from './index.module.scss';

interface IProps {
  value: string;
  onChange: (arg: any) => void;
}

// const converter = new Showdown.Converter({
//   tables: true,
//   simplifiedAutoLink: true,
//   strikethrough: true,
//   tasklists: true,
//   emoji: true,
// });

let monacoInstance = null;

export const Editor: React.FC<IProps> = ({ value = '', onChange }) => {
  const ref = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!mounted) {
      return;
    }

    if (monacoInstance) {
      monacoInstance.setValue(value);
    }
  }, [mounted, value]);

  useEffect(() => {
    Promise.all([import('monaco-editor/esm/vs/editor/editor.api.js')]).then((res) => {
      const monoca = res[0] as any;
      monacoInstance = monoca.editor.create(ref.current, {
        value: value,
        language: 'markdown',
        automaticLayout: true,
        theme: 'vs',
        minimap: {
          enabled: true,
        },
        scrollBeyondLastLine: false,
      });
      monacoInstance.onDidChangeModelContent((event) => {
        const content = monacoInstance.getValue();
        onChange(content);
      });
      setMounted(true);
    });

    return () => {
      setMounted(false);
      monacoInstance.dispose();
      monacoInstance = null;
    };
  }, []);

  return (
    <div className={cls(style.wrapper, '')} ref={ref}>
      {mounted ? null : <Spin tip="编辑器努力加载中..." spinning={true}></Spin>}
    </div>
  );
};
