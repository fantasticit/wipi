import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Spin } from 'antd';
import {
  registerScollListener,
  subjectScrollListener,
  removeScrollListener,
} from './utils/syncScroll';

export let editor = null;
export let monaco = null;

export const MonacoEditor = ({ defaultValue, onChange, onSave }) => {
  const container = useRef(null);
  const [mounted, setMounted] = useState(false);

  const registerChange = useCallback(() => {
    editor.onDidChangeModelContent(() => {
      const content = editor.getValue();
      onChange(content);
    });
  }, [onSave]);

  const registerScroll = useCallback(() => {
    editor.onDidScrollChange(
      registerScollListener('editor', () => {
        const top =
          editor.getScrollTop() / (editor.getContentHeight() - editor.getLayoutInfo().height);
        return {
          id: 'editor-scroll',
          top: top,
          left: editor.getScrollLeft(),
        };
      })
    );
  }, []);

  const registerSave = useCallback(() => {
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S, () => {
      onSave(editor.getValue());
    });
  }, []);

  const notifyMounted = useCallback(() => {
    window.postMessage(
      {
        id: 'editor-mounted',
      },
      window.location.href
    );
  }, []);

  useEffect(() => {
    Promise.all([
      import('monaco-editor/esm/vs/editor/editor.api.js'),
      import('monaco-markdown'),
    ]).then((res) => {
      monaco = res[0];
      const MonacoMarkdown = res[1];
      editor = monaco.editor.create(container.current, {
        language: 'markdown',
        automaticLayout: true,
        theme: 'vs',
        minimap: {
          enabled: false,
        },
        scrollBeyondLastLine: false,
      });
      var extension = new MonacoMarkdown.MonacoMarkdownExtension();
      extension.activate(editor);
      registerScroll();
      registerChange();
      registerSave();
      notifyMounted();
      setMounted(true);
    });
    return () => {
      setMounted(false);
      editor && editor.dispose();
    };
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const listener = ({ top, left }) => {
      editor.setScrollTop(top * editor.getContentHeight());
      editor.setScrollLeft(left);
    };
    subjectScrollListener('editor', 'preview', listener);
    return () => {
      removeScrollListener('preview', listener);
    };
  }, [mounted]);

  useEffect(() => {
    if (!mounted || !editor) return;
    editor.setValue(defaultValue);
  }, [mounted, defaultValue]);

  useEffect(() => {
    if (!mounted || !editor) return;
    const ro = new ResizeObserver(() => {
      editor.layout(container.current.getBoundingClientRect());
    });
    ro.observe(container.current);
    return () => {
      ro.disconnect();
    };
  }, [mounted]);

  return (
    <div ref={container} style={{ height: '100%', overflow: 'hidden' }}>
      {mounted ? null : <Spin tip="编辑器努力加载中..." spinning={true}></Spin>}
    </div>
  );
};
