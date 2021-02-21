import React, { useState, useEffect, useRef } from 'react';
import cls from 'classnames';
import { Spin, message } from 'antd';
import style from './index.module.scss';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';

interface IProps {
  value?: string;
  onChange: (arg: any) => void;
  getEditor: (editor: any) => void;
}

let ToastEditor;

export const MdEditor: React.FC<IProps> = ({ value = '', onChange, getEditor }) => {
  const ref = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!mounted) {
      return;
    }

    getEditor(ref.current.editorInst);
  }, [mounted, value]);

  useEffect(() => {
    Promise.all([import('@toast-ui/react-editor')]).then((res) => {
      ToastEditor = res[0].Editor;
      setMounted(true);
    });

    return () => {
      setMounted(false);
    };
  }, []);

  const upload = (param) => {
    const size = param.file.size || 0;

    if (size < 1024 * 1024 * 0.2) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = function () {
          resolve(this.result);
        };
        reader.readAsDataURL(param.file);
      });
    }
    message.error(`图片不允许超过 200K！`);
    return Promise.reject();
  };

  return mounted ? (
    <div className={cls(style.wrapper, '')}>
      <ToastEditor
        ref={ref}
        height="300px"
        initialEditType="markdown"
        useCommandShortcut={true}
        language={'zh'}
        placeholder="请输入评论内容"
        hooks={{
          addImageBlobHook: function (file, callback) {
            upload({ file }).then((url) => {
              callback(url, file.name);
            });
          },
        }}
        onChange={() => {
          const html = ref.current.editorInst.getHtml();
          onChange(html);
        }}
      />
    </div>
  ) : (
    <Spin tip="编辑器努力加载中..." spinning={true}></Spin>
  );
};
