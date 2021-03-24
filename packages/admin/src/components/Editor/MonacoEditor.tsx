import React, {
  forwardRef,
  useRef,
  useEffect,
  useState,
  useCallback,
  useImperativeHandle,
} from 'react';
import { Spin } from 'antd';
import {
  registerScollListener,
  subjectScrollListener,
  removeScrollListener,
} from './utils/syncScroll';

declare let ResizeObserver;
export let monaco = null;

const _MonacoEditor = (props, ref) => {
  const { defaultValue, onChange, onSave } = props;
  const container = useRef(null);
  const editorRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  const registerChange = useCallback(() => {
    editorRef.current.onDidChangeModelContent(() => {
      const content = editorRef.current.getValue();
      onChange(content);
    });
  }, [onSave]);

  const registerScroll = useCallback(() => {
    editorRef.current.onDidScrollChange(
      registerScollListener('editor', () => {
        const top =
          editorRef.current.getScrollTop() /
          (editorRef.current.getContentHeight() - editorRef.current.getLayoutInfo().height);
        return {
          id: 'editor-scroll',
          top: top,
          left: editorRef.current.getScrollLeft(),
        };
      })
    );
  }, []);

  const registerSave = useCallback(() => {
    editorRef.current.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S, () => {
      onSave(editorRef.current.getValue());
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

  useImperativeHandle(ref, () => editorRef.current, [mounted]);

  useEffect(() => {
    Promise.all([
      import('monaco-editor/esm/vs/editor/editor.api.js'),
      import('monaco-markdown'),
    ]).then((res) => {
      monaco = res[0];
      const MonacoMarkdown = res[1];
      const editor = monaco.editor.create(container.current, {
        language: 'markdown',
        automaticLayout: true,
        theme: 'vs',
        minimap: {
          enabled: false,
        },
        scrollBeyondLastLine: false,
      });
      editorRef.current = editor;
      const extension = new MonacoMarkdown.MonacoMarkdownExtension();
      extension.activate(editor);
      registerScroll();
      registerChange();
      registerSave();
      notifyMounted();
      setMounted(true);
    });
    return () => {
      setMounted(false);
      editorRef.current && editorRef.current.dispose();
    };
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const listener = ({ top, left }) => {
      editorRef.current.setScrollTop(top * editorRef.current.getContentHeight());
      editorRef.current.setScrollLeft(left);
    };
    subjectScrollListener('editor', 'preview', listener);
    return () => {
      removeScrollListener('preview', listener);
    };
  }, [mounted]);

  useEffect(() => {
    if (!mounted || !editorRef.current) return;
    editorRef.current.setValue(defaultValue);
  }, [mounted, defaultValue]);

  useEffect(() => {
    if (!mounted || !editorRef.current) return;
    const ro = new ResizeObserver(() => {
      editorRef.current.layout(container.current.getBoundingClientRect());
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

export const MonacoEditor = forwardRef(_MonacoEditor);
