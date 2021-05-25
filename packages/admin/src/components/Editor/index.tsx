import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import cls from 'classnames';
import { CloseOutlined } from '@ant-design/icons';
import { Tooltip, Divider } from 'antd';
import { useToggle } from '@/hooks/useToggle';
import { DEFAULT_MARKDOWN } from './DefaultMarkdown';
import { toolbar } from './toolbar';
import { MonacoEditor } from './MonacoEditor';
import { Preview } from './Preview';
import { confirm } from './utils/modal';
import { makeHtml, makeToc } from './utils/markdown';
import style from './index.module.scss';
import { Toc } from '../Toc';

interface IProps {
  defaultValue?: string;
  onChange: (arg) => void;
}

const CACHE_KEY = 'MONACO_CONTENT_STORAGE';
let timer;

export const Editor: React.FC<IProps> = ({ defaultValue = DEFAULT_MARKDOWN, onChange }) => {
  const editorRef = useRef<any>();

  const [innerValue, setInnerValue] = useState(defaultValue);
  const [mode, setMode] = useState<'preview' | 'edit'>('edit');
  const [two, setTwo] = useState(true);
  const [saveState, setSaveState] = useState(false);
  const [tocVisible, toggleTocVisible] = useToggle(true);
  const [tocs, setTocs] = useState([]);

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

  const saveCache = useCallback(
    (value) => {
      localStorage.setItem(CACHE_KEY, value);
      toggleSaveState();
    },
    [toggleSaveState]
  );

  useEffect(() => {
    const html = makeHtml(innerValue);
    const tocs = makeToc(html);
    setTocs(tocs);

    onChange({
      value: innerValue,
      html,
      toc: JSON.stringify(tocs),
    });
  }, [innerValue, onChange]);

  useEffect(() => {
    const listener = (evt) => {
      const handle = (value) => {
        setInnerValue(value);
        editorRef.current && editorRef.current.setValue(value);
      };
      if (evt.data.id !== 'editor-mounted') {
        return;
      }
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
  }, [defaultValue]);

  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const [fullWidth, halfWidth] = useMemo(() => {
    return [tocVisible ? '80%' : '100%', tocVisible ? '40%' : '50%'];
  }, [tocVisible]);

  return (
    <div className={cls(style.wrapper)}>
      <header>
        <div>
          {toolbar.map((tool) => {
            return (
              <span className={style.toolWrap} onClick={tool.getAction(editorRef.current)}>
                <Tooltip title={tool.label}>
                  <tool.content editor={editorRef.current} />
                </Tooltip>
              </span>
            );
          })}
          <span style={{ opacity: saveState ? 1 : 0 }}>已保存到本地</span>
        </div>
        <div>
          {/* {mode === 'preview' ? (
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
          <Divider type="vertical" /> */}
          <span onClick={toggleTocVisible}>
            <span>大纲</span>
          </span>
        </div>
      </header>
      <main>
        <div style={{ width: two ? halfWidth : mode === 'preview' ? 0 : fullWidth }}>
          <MonacoEditor
            ref={editorRef}
            defaultValue={defaultValue}
            onChange={setInnerValue}
            onSave={saveCache}
          />
        </div>
        <div style={{ width: two ? halfWidth : mode === 'edit' ? 0 : fullWidth }}>
          <Preview value={innerValue} />
        </div>
        <div style={{ width: tocVisible ? '20%' : 0 }}>
          <div className={style.tocWrapper}>
            <header>
              <span>大纲</span>
              <span onClick={toggleTocVisible}>
                <CloseOutlined />
              </span>
            </header>
            <main>
              <Toc tocs={tocs} />
            </main>
          </div>
        </div>
      </main>
    </div>
  );
};
