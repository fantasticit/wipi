import React, { useContext, useMemo, useRef, useEffect } from 'react';
import { Modal, message } from 'antd';
import { useTranslations } from 'next-intl';
import { PosterProvider } from '@/providers/poster';
import { GlobalContext } from '@/context/global';
import style from './index.module.scss';
import { useToggle } from '@/hooks/useToggle';
import { download, getDocumentScrollTop } from '@/utils';
const urllib = require('url');
const QRCode = require('qrcode-svg');
export interface ShareProps {
  cover?: string;
  title: React.ReactNode;
  desc: React.ReactNode;
  url: string;
}

export const Share: React.FC<ShareProps> = ({ cover, title, desc, url, children }) => {
  const t = useTranslations('shareNamespace');
  const ref = useRef(null);
  const { setting, locale } = useContext(GlobalContext);
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
  const save = async (e) => {
    e.preventDefault();
    e.nativeEvent.stopImmediatePropagation();
    e.stopPropagation();
    toggleLoading();
    const node = ref.current;
    const target = node.firstChild;
    const hide = message.loading(t('createingPoster'), 0);
    try {
      const ret = await PosterProvider.createPoster({
        name: `${locale}-${title}`,
        html: node.innerHTML,
        width: target.offsetWidth + 16,
        height: target.offsetHeight,
        pageUrl: location.pathname,
      });
      message.success(t('createdPosterSuccess'));
      download(ret);
    } catch (e) {
      message.error(t('createdPosterError'));
    } finally {
      toggleLoading();
      hide();
    }
  };

  const content = (
    // 以下的内联样式，请勿修改，将用于服务端海报生成
    <div ref={ref} className={style.wrapper}>
      <div
        style={{
          width: 375,
          background: '#fff',
          overflow: 'hidden',
        }}
        ref={ref}
      >
        <div>
          {cover && (
            <img
              style={{
                width: '100%',
                borderRadius: '2px',
                objectFit: 'cover',
              }}
              src={cover}
            />
          )}
          <div
            style={{
              minWidth: 225,
              padding: '12px 0',
              border: 0,
              marginBottom: 0,
              color: 'rgba(0, 0, 0, 0.85)',
              overflow: 'hidden',
              fontWeight: 600,
              fontSize: '16px',
              lineHeight: '22px',
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: '-webkit-box',
              maxWidth: '100%',
              padding: '0 0 12px',
              color: 'rgba(0, 0, 0, 0.65)',
              fontSize: 14,
            }}
          >
            {desc}
          </div>
        </div>
        <div style={{ position: 'relative', height: 80 }}>
          <div
            style={{
              position: 'absolute',
              left: 0,
              width: 80,
              height: 80,
              padding: 0,
            }}
            dangerouslySetInnerHTML={{ __html: qrcode.svg() }}
          ></div>
          <div
            style={{
              position: 'absolute',
              left: 80,
              padding: '8px 16px',
              width: 295,
              height: 80,
            }}
          >
            <p
              style={{
                position: 'absolute',
                top: 0,
                width: '100%',
                color: 'rgba(0, 0, 0, 0.85)',
              }}
            >
              {t('qrcode')}
            </p>
            <p
              style={{
                position: 'absolute',
                bottom: 0,
                color: 'rgba(0, 0, 0, 0.65)',
                fontSize: '0.9em',
              }}
            >
              {t('shareFrom')}{' '}
              <a
                style={{
                  color: '#ff0064',
                }}
                href={fullUrl}
              >
                {setting.systemTitle}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    const handler = () => {
      const y = getDocumentScrollTop();
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
    <>
      <Modal
        title={t('title')}
        width={400}
        visible={visible}
        bodyStyle={{
          display: 'flex',
          justifyContent: 'center',
          overflowX: 'hidden',
        }}
        onCancel={(e) => {
          e.preventDefault();
          e.nativeEvent.stopImmediatePropagation();
          e.stopPropagation();
          toggleVisible(false);
        }}
        onOk={save}
        okText="下载"
        cancelText="关闭"
        okButtonProps={{ loading }}
        maskClosable={false}
        transitionName={''}
        maskTransitionName={''}
      >
        {content}
      </Modal>
      <span
        onClickCapture={(e) => {
          e.preventDefault();
          e.nativeEvent.stopImmediatePropagation();
          e.stopPropagation();
          toggleVisible();
        }}
      >
        {children || (
          <div className={style.iconWrap}>
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
      </span>
    </>
  );
};
