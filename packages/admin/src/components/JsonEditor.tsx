import React, { useState, useEffect, useRef } from 'react';
import { Spin } from 'antd';
import { safeJsonParse } from '@/utils/json';

const DEFAULT_STYLE = {
  height: '600px',
  overflow: 'hidden',
  border: '1px solid var(--border-color)',
  marginBottom: 24,
};

export const JsonEditor = ({ value, onChange, style = DEFAULT_STYLE }) => {
  const container = useRef(null);
  const editorRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!mounted) {
      return;
    }
    editorRef.current.setValue(value);
  }, [mounted, value]);

  useEffect(() => {
    Promise.all([import('monaco-editor/esm/vs/editor/editor.api.js')]).then((res) => {
      const monaco = res[0];
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
      editor.onDidChangeModelContent(() => {
        const content = editor.getValue();
        onChange(safeJsonParse(content));
      });
      setMounted(true);
    });
    return () => {
      setMounted(false);
      editorRef.current && editorRef.current.dispose();
    };
  }, [onChange]);

  return (
    <div ref={container} style={style}>
      {mounted ? null : <Spin tip="编辑器努力加载中..." spinning={true}></Spin>}
    </div>
  );
};
