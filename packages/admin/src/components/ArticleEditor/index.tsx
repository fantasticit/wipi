import React, { useState, useMemo, useCallback, useEffect } from 'react';
import cls from 'classnames';
import Router from 'next/router';
import { Button, Input, message, PageHeader, Icon } from 'antd';
import { Helmet } from 'react-helmet';
import { resolveUrl } from '@/utils';
import { Seo } from '@/components/Seo';
import { Editor as MDEditor } from '@components/Editor';
import { FileSelectDrawer } from '@/components/FileSelectDrawer';
import { ArticleSettingDrawer } from '@/components/ArticleSettingDrawer';
import { ArticleProvider } from '@/providers/article';
import { useSetting } from '@/hooks/useSetting';
import { useToggle } from '@/hooks/useToggle';
import style from './index.module.scss';
interface IProps {
  id?: string | number;
  article?: IArticle;
}

const REQUIRED_ARTICLE_ATTRS = [
  ['title', '请输入文章标题'],
  ['content', '请输入文章内容'],
];

// 副作用：传给服务端的 category 需要是 id
const transformCategory = (article) => {
  if (article.category && article.category.id) {
    article.category = article.category.id;
  }
};
const transformTags = (article) => {
  if (Array.isArray(article.tags)) {
    try {
      article.tags = (article.tags as ITag[]).map((t) => t.id).join(',');
    } catch (e) {
      console.log(e);
    }
  }
};

export const ArticleEditor: React.FC<IProps> = ({
  id: defaultId,
  article: defaultArticle = { title: '' },
}) => {
  const isCreate = !defaultId; // 一开始是否是新建
  const setting = useSetting();
  const [id, setId] = useState(defaultId);
  const [article, setArticle] = useState<Partial<IArticle>>(defaultArticle);
  const [fileDrawerVisible, toggleFileDrawerVisible] = useToggle(false);
  const [settingDrawerVisible, toggleSettingDrawerVisible] = useToggle(false);

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

  // 校验文章必要属性
  const check = useCallback(() => {
    let canPublish = true;
    let errorMsg = null;
    REQUIRED_ARTICLE_ATTRS.forEach(([key, msg]) => {
      if (!article[key]) {
        errorMsg = msg;
        canPublish = false;
      }
    });
    if (!canPublish) {
      return Promise.reject(new Error(errorMsg));
    } else {
      return Promise.resolve();
    }
  }, [article]);

  // 打开发布抽屉
  const openPublishDrawer = useCallback(() => {
    check()
      .then(() => {
        toggleSettingDrawerVisible();
      })
      .catch((err) => {
        message.warn(err.message);
      });
  }, [article, settingDrawerVisible, toggleSettingDrawerVisible]);

  // 保存草稿或者发布线上
  const saveOrPublish = useCallback(
    (patch = {}) => {
      const data = { ...article, ...patch };
      check()
        .then(() => {
          transformCategory(data);
          transformTags(data);
          const promise = !isCreate
            ? ArticleProvider.updateArticle(id, data)
            : ArticleProvider.addArticle(data);
          promise.then((res) => {
            setId(res.id);
            message.success(res.status === 'draft' ? '文章已保存为草稿' : '文章已发布');
          });
        })
        .catch((err) => {
          message.warn(err.message);
        });
    },
    [article, isCreate]
  );

  const saveDraft = useCallback(() => {
    saveOrPublish();
  }, [saveOrPublish]);

  // 预览文章
  const preview = useCallback(() => {
    if (id) {
      window.open(resolveUrl(setting.systemUrl, '/article/' + id));
    } else {
      message.warn('请先保存');
    }
  }, [id, setting.systemUrl]);

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
            <Button key="dradt" icon="book" onClick={saveDraft}>
              保存草稿
            </Button>,
            <Button key="publish" icon="cloud" onClick={openPublishDrawer}>
              发布
            </Button>,
            <Button key="preview" icon="eye" type="primary" disabled={!id} onClick={preview}>
              预览
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
