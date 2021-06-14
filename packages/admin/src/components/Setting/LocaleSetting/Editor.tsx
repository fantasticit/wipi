import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Spin } from 'antd';

let monaco = null;

export const Editor = ({ value, onChange }) => {
  const container = useRef(null);
  const editorRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  const spyChange = useCallback(() => {
    editorRef.current.onDidChangeModelContent(() => {
      const content = editorRef.current.getValue();
      try {
        const t = JSON.parse(content);
        onChange(t);
      } catch (e) {}
    });
  }, [onChange]);

  useEffect(() => {
    if (!mounted) return;
    editorRef.current.setValue(value);
  }, [mounted, value]);

  useEffect(() => {
    Promise.all([import('monaco-editor/esm/vs/editor/editor.api.js')]).then((res) => {
      monaco = res[0];
      const editor = monaco.editor.create(container.current, {
        language: 'json',
        automaticLayout: true,
        theme: 'vs',
        scrollBeyondLastLine: false,
        scrollbar: {
          useShadows: false,
          vertical: 'visible',
          horizontal: 'visible',
          verticalScrollbarSize: 6,
          horizontalScrollbarSize: 6,
        },
      });
      editorRef.current = editor;
      spyChange();
      setMounted(true);
    });
    return () => {
      setMounted(false);
      editorRef.current && editorRef.current.dispose();
    };
  }, []);

  return (
    <div
      ref={container}
      style={{
        height: '600px',
        overflow: 'hidden',
        border: '1px solid var(--border-color)',
        marginBottom: 24,
      }}
    >
      {mounted ? null : <Spin tip="编辑器努力加载中..." spinning={true}></Spin>}
    </div>
  );
};
