import React, { useState, useCallback } from 'react';
import cls from 'classnames';
import { Helmet } from 'react-helmet';
import { Helmet as CommeonHelmet } from '@/components/Helmet';
import { NextPage } from 'next';
import { Button, Input, InputNumber, message, PageHeader, Icon, Drawer } from 'antd';
import { Editor as MDEditor } from '@components/Editor';
import { FileSelectDrawer } from '@/components/FileSelectDrawer';
import { PageProvider } from '@providers/page';
import { useSetting } from '@/hooks/useSetting';
import style from './index.module.scss';
const url = require('url');

interface IProps {
  page: IPage;
}

const FormItem = ({ label, content }) => {
  return (
    <div className={style.formItem}>
      <span>{label}</span>
      <div>{content}</div>
    </div>
  );
};

const Editor: NextPage<IProps> = ({ page: defaultPage = {} }) => {
  const setting = useSetting();
  const [fileDrawerVisible, setFileDrawerVisible] = useState(false);
  const [id, setId] = useState(defaultPage.id);
  const [page, setPage] = useState<any>(defaultPage);
  const [pageDrawerVisible, setPageDrawerVisible] = useState(false);

  const save = useCallback(() => {
    if (!page.name) {
      message.warn('请输入页面名称');
      return;
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
      return;
    }

    page.status = 'publish';

    if (id) {
      return PageProvider.updatePage(id, page).then((res) => {
        setId(res.id);
        message.success('页面已发布');
      });
    }
    return PageProvider.addPage(page).then((res) => {
      setId(res.id);
      message.success('页面已发布');
    });
  }, [page, id]);

  return (
    <div className={style.wrapper}>
      <CommeonHelmet />
      <Helmet>
        <title>编辑文章</title>
      </Helmet>
      <header className={style.header}>
        <PageHeader
          style={{
            borderBottom: '1px solid rgb(235, 237, 240)',
            background: '#fff',
          }}
          backIcon={<Icon type="close" />}
          onBack={() => window.close()}
          title={
            <Input
              style={{ width: 300 }}
              placeholder="请输入页面名称"
              defaultValue={page.name}
              onChange={(e) => {
                const value = e.target.value;

                setPage((page) => {
                  page.name = value;
                  return page;
                });
              }}
            />
          }
          extra={[
            <Button
              type="dashed"
              onClick={() => {
                setFileDrawerVisible(true);
              }}
            >
              文件库
            </Button>,
            <Button onClick={preview}>预览</Button>,
            <Button
              onClick={() => {
                if (!page.name) {
                  message.warn('请输入页面名称');
                  return;
                }
                setPageDrawerVisible(true);
              }}
            >
              保存
            </Button>,
          ]}
        />
      </header>

      <div className={cls(style.content)}>
        <article>
          <div>
            <MDEditor
              value={page.content}
              onChange={(value) => {
                setPage((page) => {
                  page.content = value;
                  return page;
                });
              }}
            />
          </div>
        </article>
      </div>
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
              addonAfter={
                <Icon
                  type="file-image"
                  onClick={() => {
                    setFileDrawerVisible(true);
                  }}
                />
              }
              defaultValue={page.cover}
              onChange={(e) => {
                const value = e.target.value;
                setPage((page) => {
                  page.cover = value;
                  return page;
                });
              }}
            />
          }
        />
        <FormItem
          label="路径"
          content={
            <Input
              placeholder="请配置页面路径"
              defaultValue={page.path}
              onChange={(e) => {
                const value = e.target.value;
                setPage((page) => {
                  page.path = value;
                  return page;
                });
              }}
            />
          }
        />
        <FormItem
          label="顺序"
          content={
            <InputNumber
              defaultValue={page.order || 0}
              onChange={(value) => {
                setPage((page) => {
                  page.order = value;
                  return page;
                });
              }}
            />
          }
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            borderTop: '1px solid #e8e8e8',
            padding: '10px 16px',
            textAlign: 'right',
            left: 0,
            background: '#fff',
            borderRadius: '0 0 4px 4px',
          }}
        >
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
        onClose={() => {
          setFileDrawerVisible(false);
        }}
      />
    </div>
  );
};

Editor.getInitialProps = async (ctx) => {
  const { id } = ctx.query;
  const page = await PageProvider.getPage(id);
  return { page };
};

export default Editor;
