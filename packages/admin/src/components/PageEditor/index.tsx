import React, { useState, useCallback, useMemo, useEffect } from 'react';
import cls from 'classnames';
import Router from 'next/router';
import { Helmet } from 'react-helmet';
import { Seo } from '@/components/Seo';
import { Button, Input, InputNumber, message, PageHeader, Icon, Drawer } from 'antd';
import { Editor as CodeEditor } from '@components/Editor';
import { FileSelectDrawer } from '@/components/FileSelectDrawer';
import { PageProvider } from '@/providers/page';
import { useSetting } from '@/hooks/useSetting';
import style from './index.module.scss';
const url = require('url');

interface IProps {
  id?: string | number;
  page?: IPage;
}

const FormItem = ({ label, content }) => {
  return (
    <div className={style.formItem}>
      <span>{label}</span>
      <div>{content}</div>
    </div>
  );
};

const drawerFooterStyle: React.CSSProperties = {
  position: 'absolute',
  bottom: 0,
  width: '100%',
  borderTop: '1px solid #e8e8e8',
  padding: '10px 16px',
  textAlign: 'right',
  left: 0,
  background: '#fff',
  borderRadius: '0 0 4px 4px',
};

export const PageEditor: React.FC<IProps> = ({ id: defaultId, page: defaultPage = {} }) => {
  const setting = useSetting();
  const isCreate = !defaultId; // 一开始是否是新建
  const [fileDrawerVisible, setFileDrawerVisible] = useState(false);
  const [id, setId] = useState(defaultId);
  const [page, setPage] = useState<Partial<IPage>>(defaultPage);
  const [pageDrawerVisible, setPageDrawerVisible] = useState(false);

  const patchPage = useMemo(
    () => (key) => (value) => {
      if (value.target) {
        value = value.target.value;
      }
      setPage((page) => {
        page[key] = value;
        return page;
      });
    },
    []
  );

  const toggleFileDrawerVisible = useCallback(() => {
    setFileDrawerVisible((v) => !v);
  }, []);

  const beforeSave = useCallback(() => {
    if (!page.name) {
      message.warn('请输入页面名称');
      return;
    }
    setPageDrawerVisible(true);
  }, [page]);

  const save = useCallback(() => {
    if (!page.name) {
      message.warn('请输入页面名称');
      return Promise.reject(new Error('请输入页面名称'));
    }
    page.status = 'draft';
    if (id) {
      return PageProvider.updatePage(id, page).then((res) => {
        setId(res.id);
        message.success('页面已保存为草稿');
      });
    }
    return PageProvider.addPage(page).then((res) => {
      setId(res.id);
      message.success('页面已保存为草稿');
    });
  }, [page, id]);

  const preview = useCallback(() => {
    if (id) {
      window.open(url.resolve(setting.systemUrl || '', '/page/' + id));
    } else {
      message.warn('请先保存');
    }
  }, [id, setting.systemUrl]);

  const publish = useCallback(() => {
    let canPublish = true;
    void [
      ['name', '请输入页面名称'],
      ['path', '请输入页面路径'],
      ['content', '请输入页面内容'],
    ].forEach(([key, msg]) => {
      if (!page[key]) {
        message.warn(msg);
        canPublish = false;
      }
    });
    if (!canPublish) {
      return Promise.reject(new Error('信息不全'));
    }
    page.status = 'publish';
    if (id) {
      return PageProvider.updatePage(id, page).then((res) => {
        setId(res.id);
        message.success('页面已更新');
      });
    }
    return PageProvider.addPage(page).then((res) => {
      setId(res.id);
      message.success('页面已发布');
    });
  }, [page, id]);

  useEffect(() => {
    if (isCreate && id) {
      Router.replace('/page/editor/' + id);
    }
  }, [isCreate, id]);

  return (
    <div className={style.wrapper}>
      <Seo />
      <Helmet>
        <title>{id ? `编辑页面 ${page.name ? '-' + page.name : ''}` : '新建页面'}</title>
      </Helmet>
      <header className={style.header}>
        <PageHeader
          style={{
            borderBottom: '1px solid rgb(235, 237, 240)',
            background: '#fff',
          }}
          backIcon={<Button size="small" icon="close" />}
          onBack={() => window.close()}
          title={
            <Input
              style={{ width: 300 }}
              placeholder="请输入页面名称"
              defaultValue={page.name}
              onChange={patchPage('name')}
            />
          }
          extra={[
            <Button key="file" type="dashed" onClick={toggleFileDrawerVisible}>
              文件库
            </Button>,
            page.path && (
              <Button key="draft" onClick={save}>
                保存
              </Button>
            ),
            <Button key="preview" onClick={preview}>
              预览
            </Button>,
            <Button key="save" type="primary" onClick={beforeSave}>
              保存/发布
            </Button>,
          ]}
        />
      </header>
      <main className={cls(style.main)}>
        <CodeEditor
          defaultValue={page.content}
          onChange={({ value, html, toc }) => {
            patchPage('content')(value);
            patchPage('html')(html);
            patchPage('toc')(toc);
          }}
        />
      </main>
      <Drawer
        title={'页面属性'}
        width={480}
        visible={pageDrawerVisible}
        onClose={() => setPageDrawerVisible(false)}
      >
        <FormItem
          label="封面"
          content={
            <Input
              placeholder="请输入页面封面"
              addonAfter={<Icon type="file-image" onClick={toggleFileDrawerVisible} />}
              defaultValue={page.cover}
              onChange={patchPage('cover')}
            />
          }
        />
        <FormItem
          label="路径"
          content={
            <Input
              placeholder="请配置页面路径"
              defaultValue={page.path}
              onChange={patchPage('path')}
            />
          }
        />
        <FormItem
          label="顺序"
          content={<InputNumber defaultValue={page.order || 0} onChange={patchPage('order')} />}
        />
        <div style={drawerFooterStyle}>
          <Button
            style={{
              marginRight: 8,
            }}
            onClick={save}
          >
            保存草稿
          </Button>
          <Button type="primary" onClick={publish}>
            发布
          </Button>
        </div>
      </Drawer>
      <FileSelectDrawer
        isCopy={true}
        closeAfterClick={true}
        visible={fileDrawerVisible}
        onClose={toggleFileDrawerVisible}
      />
    </div>
  );
};
