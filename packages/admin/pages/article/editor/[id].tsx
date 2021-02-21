import React, { useState, useEffect, useCallback } from 'react';
import cls from 'classnames';
import { NextPage } from 'next';
import { Helmet } from 'react-helmet';
import { Button, Input, message, PageHeader, Icon } from 'antd';
import { Helmet as CommeonHelmet } from '@/components/Helmet';
import { Editor as MDEditor } from '@components/Editor';
import { FileSelectDrawer } from '@/components/FileSelectDrawer';
import { ArticleSettingDrawer } from '@/components/ArticleSettingDrawer';
import { ArticleProvider } from '@providers/article';
import { useSetting } from '@/hooks/useSetting';
import style from './index.module.scss';
const url = require('url');

interface IProps {
  id: any;
}

const Editor: NextPage<IProps> = ({ id }) => {
  const setting = useSetting();
  const [fileDrawerVisible, setFileDrawerVisible] = useState(false);
  const [settingDrawerVisible, setSettingDrawerVisible] = useState(false);
  const [article, setArticle] = useState<any>({});
  const [title, setArticleTitle] = useState<any>(null);

  useEffect(() => {
    ArticleProvider.getArticle(id).then((res) => {
      setArticle(res);
      setArticleTitle(res.title);
    });
  }, [id]);

  const save = useCallback(() => {
    if (!article.title && !title) {
      message.warn('至少输入文章标题');
      return;
    }

    article.title = title;

    if (article.category && article.category.id) {
      article.category = article.category.id;
    }

    if (Array.isArray(article.tags)) {
      try {
        article.tags = article.tags.map((t) => t.id).join(',');
      } catch (e) {
        console.log(e);
      }
    }

    if (id) {
      ArticleProvider.updateArticle(id, article).then((res) => {
        message.success(res.status === 'draft' ? '文章已保存为草稿' : '文章已发布');
      });
    } else {
      ArticleProvider.addArticle(article).then((res) => {
        message.success(res.status === 'draft' ? '文章已保存为草稿' : '文章已发布');
      });
    }
  }, [article, id, title]);

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

    if (data.category && data.category.id) {
      data.category = data.category.id;
    }

    if (!data.title && !title) {
      message.warn('至少输入文章标题');
      return;
    }

    data.title = title;

    if (Array.isArray(data.tags)) {
      try {
        data.tags = data.tags.map((t) => t.id).join(',');
      } catch (e) {
        console.log(e);
      }
    }

    const handle = (res) => {
      message.success(data.status === 'draft' ? '文章已保存' : '文章已发布');
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
        <title>编辑文章</title>
      </Helmet>
      <header className={style.header}>
        <PageHeader
          backIcon={<Icon type="close" />}
          style={{
            borderBottom: '1px solid rgb(235, 237, 240)',
          }}
          onBack={() => window.close()}
          title={
            <Input
              style={{ width: 300 }}
              placeholder="请输入文章标题"
              value={title}
              onChange={(e) => {
                setArticleTitle(e.target.value);
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
            <Button onClick={save}>更新</Button>,
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
        article={article}
        visible={settingDrawerVisible}
        onClose={() => setSettingDrawerVisible(false)}
        onChange={saveOrPublish}
      />
    </div>
  );
};

Editor.getInitialProps = async (ctx) => {
  const { id } = ctx.query;
  return { id };
};

export default Editor;
