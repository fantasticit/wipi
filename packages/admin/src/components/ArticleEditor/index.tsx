import React, { useState, useMemo, useCallback, useEffect } from 'react';
import cls from 'classnames';
import Router from 'next/router';
import { Button, Input, message, PageHeader, Icon } from 'antd';
import { Helmet } from 'react-helmet';
import { Seo } from '@/components/Seo';
import { Editor as MDEditor } from '@components/Editor';
import { FileSelectDrawer } from '@/components/FileSelectDrawer';
import { ArticleSettingDrawer } from '@/components/ArticleSettingDrawer';
import { ArticleProvider } from '@/providers/article';
import { useSetting } from '@/hooks/useSetting';
import style from './index.module.scss';
const url = require('url');

interface IProps {
  id?: string | number;
  article?: IArticle;
}

export const ArticleEditor: React.FC<IProps> = ({
  id: defaultId,
  article: defaultArticle = { title: '' },
}) => {
  const setting = useSetting();
  const isCreate = !defaultId; // 一开始是否是新建
  const [fileDrawerVisible, setFileDrawerVisible] = useState(false);
  const [settingDrawerVisible, setSettingDrawerVisible] = useState(false);
  const [id, setId] = useState(defaultId);
  const [article, setArticle] = useState<Partial<IArticle>>(defaultArticle);

  const patchArticle = useMemo(
    () => (key) => (value) => {
      if (value.target) {
        value = value.target.value;
      }
      setArticle((article) => {
        article[key] = value;
        return article;
      });
    },
    []
  );

  const toggleFileDrawerVisible = useCallback(() => {
    setFileDrawerVisible((v) => !v);
  }, []);

  const toggleSettingDrawerVisible = useCallback(() => {
    setSettingDrawerVisible((v) => !v);
  }, []);

  const save = useCallback(() => {
    if (!article.title) {
      message.warn('至少输入文章标题');
      return;
    }
    if (article.category && article.category.id) {
      article.category = article.category.id;
    }
    if (Array.isArray(article.tags)) {
      try {
        article.tags = (article.tags as ITag[]).map((t) => t.id).join(',');
      } catch (e) {
        console.log(e);
      }
    }
    if (id) {
      ArticleProvider.updateArticle(id, article).then((res) => {
        setId(res.id);
        message.success(res.status === 'draft' ? '文章已保存为草稿' : '文章已发布');
      });
    } else {
      ArticleProvider.addArticle(article).then((res) => {
        setId(res.id);
        message.success(res.status === 'draft' ? '文章已保存为草稿' : '文章已发布');
      });
    }
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
    toggleSettingDrawerVisible();
  }, [article, toggleSettingDrawerVisible]);

  const saveOrPublish = (patch) => {
    const data = { ...article, ...patch };
    if (data.category && data.category.id) {
      data.category = data.category.id;
    }
    if (!data.title) {
      message.warn('至少输入文章标题');
      return;
    }
    if (Array.isArray(data.tags)) {
      try {
        data.tags = data.tags.map((t) => t.id).join(',');
      } catch (e) {
        console.log(e);
      }
    }
    const handle = (res) => {
      setId(res.id);
      message.success(data.status === 'draft' ? '文章已保存' : '文章已发布');
    };
    if (id) {
      ArticleProvider.updateArticle(id, data).then(handle);
    } else {
      ArticleProvider.addArticle(data).then(handle);
    }
  };

  useEffect(() => {
    if (isCreate && id) {
      Router.replace('/article/editor/' + id);
    }
  }, [id, isCreate]);

  return (
    <div className={style.wrapper}>
      <Seo />
      <Helmet>
        <title>{id ? `编辑文章 ${article.title ? '-' + article.title : ''}` : '新建文章'}</title>
      </Helmet>
      <header className={style.header}>
        <PageHeader
          backIcon={<Button size="small" icon="close" />}
          style={{
            borderBottom: '1px solid rgb(235, 237, 240)',
          }}
          onBack={() => window.close()}
          title={
            <Input
              style={{ width: 300 }}
              placeholder="请输入文章标题"
              defaultValue={article.title}
              onChange={patchArticle('title')}
            />
          }
          extra={[
            <Button key="file" type="dashed" icon="appstore" onClick={toggleFileDrawerVisible}>
              文件库
            </Button>,
            <Button key="dradt" icon="book" onClick={save}>
              保存草稿
            </Button>,
            <Button key="preview" icon="eye" onClick={preview}>
              预览
            </Button>,
            <Button key="publish" type="primary" icon="cloud" onClick={publish}>
              发布
            </Button>,
          ]}
        />
      </header>
      <main className={cls(style.main)}>
        <MDEditor
          defaultValue={article.content}
          onChange={({ value, html, toc }) => {
            patchArticle('content')(value);
            patchArticle('html')(html);
            patchArticle('toc')(toc);
          }}
        />
      </main>
      <FileSelectDrawer
        isCopy={true}
        closeAfterClick={true}
        visible={fileDrawerVisible}
        onClose={toggleFileDrawerVisible}
      />
      <ArticleSettingDrawer
        article={article as IArticle}
        visible={settingDrawerVisible}
        onClose={toggleSettingDrawerVisible}
        onChange={saveOrPublish}
      />
    </div>
  );
};
