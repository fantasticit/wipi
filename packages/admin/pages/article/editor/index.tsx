import React, { useState, useRef, useCallback, useEffect } from 'react';
import cls from 'classnames';
import { NextPage } from 'next';
import { Helmet } from 'react-helmet';
import { Helmet as CommeonHelmet } from '@/components/Helmet';
import { Button, Input, message, PageHeader, Icon } from 'antd';
import { Editor as MDEditor } from '@components/Editor';
import { FileSelectDrawer } from '@/components/FileSelectDrawer';
import { ArticleSettingDrawer } from '@/components/ArticleSettingDrawer';
import { ArticleProvider } from '@providers/article';
import { useSetting } from '@/hooks/useSetting';
import style from './index.module.scss';
const url = require('url');

const Editor: NextPage = () => {
  const setting = useSetting();
  const [fileDrawerVisible, setFileDrawerVisible] = useState(false);
  const [settingDrawerVisible, setSettingDrawerVisible] = useState(false);
  const [id, setId] = useState(null);
  const [article, setArticle] = useState<any>({});

  const save = useCallback(() => {
    if (!article.title) {
      message.warn('至少输入文章标题');
      return;
    }

    article.status = 'draft';

    if (Array.isArray(article.tags)) {
      try {
        article.tags = article.tags.map((t) => t.id).join(',');
      } catch (e) {
        console.log(e);
      }
    }

    if (id) {
      return ArticleProvider.updateArticle(id, article).then((res) => {
        setId(res.id);
        message.success('文章已保存为草稿');
      });
    }
    return ArticleProvider.addArticle(article).then((res) => {
      setId(res.id);
      message.success('文章已保存为草稿');
    });
  }, [article, id]);

  const preview = useCallback(() => {
    if (id) {
      window.open(url.resolve(setting.systemUrl || '', '/article/' + id));
    } else {
      message.warn('请先保存');
    }
  }, [id, setting.systemUrl]);

  const publish = useCallback(() => {
    let canPublish = true;
    void [
      ['title', '请输入文章标题'],
      ['content', '请输入文章内容'],
    ].forEach(([key, msg]) => {
      if (!article[key]) {
        message.warn(msg);
        canPublish = false;
      }
    });

    if (!canPublish) {
      return;
    }

    setSettingDrawerVisible(true);
  }, [article, id]);

  const saveOrPublish = (patch) => {
    const data = { ...article, ...patch };

    const handle = (res) => {
      setId(res.id);
      message.success(data.status === 'draft' ? '文章已保存为草稿' : '文章已发布');
    };

    if (id) {
      ArticleProvider.updateArticle(id, data).then(handle);
    } else {
      ArticleProvider.addArticle(data).then(handle);
    }
  };

  return (
    <div className={style.wrapper}>
      <CommeonHelmet />
      <Helmet>
        <title>新建文章</title>
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
              placeholder="请输入文章标题"
              defaultValue={article.title}
              onChange={(e) => {
                const value = e.target.value;
                setArticle((article) => {
                  article.title = value;
                  return article;
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
            <Button onClick={save}>保存草稿</Button>,
            <Button onClick={preview}>预览</Button>,
            <Button type="primary" onClick={publish}>
              发布
            </Button>,
          ]}
        />
      </header>
      <div className={cls(style.content)}>
        <article>
          <MDEditor
            value={article.content}
            onChange={(value) => {
              setArticle((article) => {
                article.content = value;
                return article;
              });
            }}
          />
        </article>
      </div>
      <FileSelectDrawer
        isCopy={true}
        closeAfterClick={true}
        visible={fileDrawerVisible}
        onClose={() => {
          setFileDrawerVisible(false);
        }}
      />
      <ArticleSettingDrawer
        visible={settingDrawerVisible}
        onClose={() => setSettingDrawerVisible(false)}
        onChange={saveOrPublish}
      />
    </div>
  );
};

export default Editor;
