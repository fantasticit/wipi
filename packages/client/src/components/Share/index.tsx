import React, { useContext, useMemo, useRef, useEffect } from 'react';
import domtoimage from 'dom-to-image';
import { Popover, Button, message } from 'antd';
import { GlobalContext } from '@/context/global';
import style from './index.module.scss';
import { useToggle } from '@/hooks/useToggle';
const QRCode = require('qrcode-svg');
const download = require('downloadjs');
const urllib = require('url');
export interface ShareProps {
  cover?: string;
  title: React.ReactNode;
  desc: React.ReactNode;
  url: string;
}

export const Share: React.FC<ShareProps> = ({ cover, title, desc, url, children }) => {
  const ref = useRef(null);
  const { setting } = useContext(GlobalContext);
  const systemUrl = setting.systemUrl || '';
  const [loading, toggleLoading] = useToggle(false);
  const [visible, toggleVisible] = useToggle(false);
  const fullUrl = useMemo(() => urllib.resolve(systemUrl, url), [systemUrl, url]);
  const qrcode = useMemo(
    () =>
      new QRCode({
        content: fullUrl,
        padding: 0,
        width: 80,
        height: 80,
        color: '#000000',
        background: '#ffffff',
      }),
    [fullUrl]
  );
  const save = () => {
    toggleLoading();
    const node = ref.current;
    const scale = 750 / node.offsetWidth;
    domtoimage
      .toPng(node, {
        height: node.offsetHeight * scale,
        width: node.offsetWidth * scale,
        style: {
          transform: 'scale(' + scale + ')',
          transformOrigin: 'top left',
          width: node.offsetWidth + 'px',
          height: node.offsetHeight + 'px',
        },
      })
      .then((dataUrl) => {
        download(dataUrl, `${title}.png`);
        toggleLoading();
      })
      .catch(() => {
        message.error('保存图片失败，请手动截图');
        toggleLoading();
      });
  };

  const content = (
    <div className={style.wrapper}>
      <div className={style.content} ref={ref}>
        <div className={style.main}>
          {cover && <img className={style.cover} src={cover} alt={'内容封面'} />}
          <div className={style.title}>{title}</div>
          <div className={style.desc}>{desc}</div>
        </div>
        <div className={style.footer}>
          <div className={style.code} dangerouslySetInnerHTML={{ __html: qrcode.svg() }}></div>
          <div>
            <p>识别二维码查看文章</p>
            <p>
              原文分享自 <a href={fullUrl}>{setting.systemTitle}</a>
            </p>
          </div>
        </div>
      </div>
      <footer>
        <Button size="small" style={{ marginRight: 12 }} onClick={toggleVisible}>
          关闭
        </Button>
        <Button type="primary" size="small" onClick={save} loading={loading}>
          下载
        </Button>
      </footer>
    </div>
  );

  useEffect(() => {
    const handler = () => {
      let y =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        window.scrollY ||
        document.body.scrollTop;
      if (visible && y > 50) {
        toggleVisible(false);
      }
    };

    document.addEventListener('scroll', handler);

    return () => {
      document.removeEventListener('scroll', handler);
    };
  }, [visible, toggleVisible]);

  return (
    <Popover content={content} placement="right">
      {children || (
        <div>
          <svg
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
          >
            <path
              d="M753.607 584.7c-48.519 0-91.596 23.298-118.66 59.315l-233.123-116.96c3.684-12.936 5.657-26.591 5.657-40.71 0-15.465-2.369-30.374-6.76-44.391l232.241-116.52c26.916 37.549 70.919 62.017 120.644 62.017 81.926 0 148.34-66.412 148.34-148.34 0-81.926-66.413-148.34-148.34-148.34-81.927 0-148.34 66.413-148.34 148.34 0 5.668 0.33 11.258 0.948 16.762l-244.945 122.892c-26.598-25.259-62.553-40.762-102.129-40.762-81.926 0-148.34 66.412-148.34 148.34s66.413 148.34 148.34 148.34c41.018 0 78.144-16.648 104.997-43.555l242.509 121.668c-0.904 6.621-1.382 13.374-1.382 20.242 0 81.927 66.412 148.34 148.34 148.34s148.34-66.413 148.34-148.34c-0.001-81.925-66.409-148.339-148.336-148.339l0 0z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      )}
    </Popover>
  );
};
