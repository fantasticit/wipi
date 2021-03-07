import React, { useState, useCallback, useEffect } from 'react';
import cls from 'classnames';
import { Tooltip, Divider } from 'antd';
import { DEFAULT_MARKDOWN } from './DefaultMarkdown';
import { toolbar } from './toolbar';
import { editor, MonacoEditor } from './MonacoEditor';
import { Preview } from './Preview';
import { confirm } from './utils/modal';
import { makeHtml, makeToc } from './utils/markdown';
import style from './index.module.scss';

interface IProps {
  defaultValue?: string;
  onChange: (arg) => void;
}

const CACHE_KEY = 'MONACO_CONTENT_STORAGE';
let timer;

export const Editor: React.FC<IProps> = ({ defaultValue = DEFAULT_MARKDOWN, onChange }) => {
  const [innerValue, setInnerValue] = useState(defaultValue);
  const [mode, setMode] = useState<'preview' | 'edit'>('edit');
  const [two, setTwo] = useState(true);
  const [saveState, setSaveState] = useState(false);

  const toggleMode = useCallback(() => {
    setMode((mode) => (mode === 'preview' ? 'edit' : 'preview'));
  }, []);

  const toggleTwo = useCallback(() => {
    setTwo((v) => !v);
  }, []);

  const toggleSaveState = useCallback(() => {
    setSaveState((v) => {
      const nextValue = !v;
      if (nextValue) {
        timer = setTimeout(toggleSaveState, 2000);
      }
      return nextValue;
    });
  }, []);

  const saveCache = useCallback((value) => {
    localStorage.setItem(CACHE_KEY, value);
    toggleSaveState();
  }, []);

  useEffect(() => {
    onChange({
      value: innerValue,
      html: makeHtml(innerValue),
      toc: JSON.stringify(makeToc(innerValue)),
    });
  }, [innerValue]);

  useEffect(() => {
    const listener = (evt) => {
      const handle = (value) => {
        setInnerValue(value);
        editor.setValue(value);
      };
      if (evt.data.id !== 'editor-mounted') return;
      const cache = localStorage.getItem(CACHE_KEY);
      if (cache && defaultValue === DEFAULT_MARKDOWN) {
        confirm()
          .then(() => handle(cache))
          .catch(() => handle(defaultValue));
      } else {
        handle(defaultValue);
      }
      window.removeEventListener('message', listener);
    };

    window.addEventListener('message', listener);

    return () => {
      window.removeEventListener('message', listener);
    };
  }, []);

  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={cls(style.wrapper)}>
      <header>
        <div>
          {toolbar.map((tool) => {
            return (
              <span className={style.toolWrap} onClick={tool.action}>
                <Tooltip title={tool.label}>{tool.content}</Tooltip>
              </span>
            );
          })}
          <span style={{ opacity: saveState ? 1 : 0 }}>已保存到本地</span>
        </div>
        <div>
          {mode === 'preview' ? (
            <span onClick={toggleMode}>
              <span>预览</span>
            </span>
          ) : (
            <span onClick={toggleMode}>
              <span>编辑</span>
            </span>
          )}
          <Divider type="vertical" />
          <span onClick={toggleTwo}>{two ? '退出' : ''}两栏显示</span>
        </div>
      </header>
      <main>
        <div style={{ width: two ? '50%' : mode === 'preview' ? 0 : '100%' }}>
          <MonacoEditor
            isFull={!two}
            defaultValue={defaultValue}
            onChange={setInnerValue}
            onSave={saveCache}
          />
        </div>
        <div style={{ width: two ? '50%' : mode === 'edit' ? 0 : '100%' }}>
          <Preview value={innerValue} />
        </div>
      </main>
    </div>
  );
};
