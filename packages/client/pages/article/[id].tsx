import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { NextPage } from 'next';
import Router from 'next/router';
import Link from 'next/link';
import { Icon, Modal, Form, Input, message } from 'antd';
import cls from 'classnames';
import { GlobalContext } from '@/context/global';
import { DoubleColumnLayout } from '@/layout/DoubleColumnLayout';
import { ArticleProvider } from '@/providers/article';
import { LocaleTime } from '@/components/LocaleTime';
import { ImageViewer } from '@/components/ImageViewer';
import { Comment } from '@/components/Comment';
import { ArticleRecommend } from '@/components/ArticleRecommend';
import { MarkdownReader } from '@/components/MarkdownReader';
import { Toc } from '@/components/Toc';
import style from './index.module.scss';
const url = require('url');

interface IProps {
  article: IArticle;
}

const Article: NextPage<IProps> = ({ article }) => {
  const { setting } = useContext(GlobalContext);
  const [password, setPassword] = useState(null);
  const [shouldCheckPassWord, setShouldCheckPassword] = useState(article && article.needPassword);

  // 检查文章密码
  const checkPassWord = useCallback(() => {
    ArticleProvider.checkPassword(article.id, password).then((res) => {
      if (res.pass) {
        Object.assign(article, res);
        setShouldCheckPassword(false);
      } else {
        message.error('密码错误');
        setShouldCheckPassword(true);
      }
    });
  }, [article.id, password]);

  const back = useCallback(() => {
    Router.push('/');
  }, []);

  const checkPassWordModal = (
    <Modal
      title="文章受保护，请输入访问密码"
      cancelText={'回首页'}
      okText={'确认'}
      visible={shouldCheckPassWord}
      onOk={checkPassWord}
      onCancel={back}
    >
      <Form.Item label={'密码'}>
        <Input.Password
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </Form.Item>
    </Modal>
  );

  useEffect(() => {
    setShouldCheckPassword(article && article.needPassword);
  }, [article.id]);

  // 更新阅读量
  useEffect(() => {
    if (!shouldCheckPassWord) {
      ArticleProvider.updateArticleViews(article.id);
    }
  }, [shouldCheckPassWord]);

  const Content = (
    <>
      {checkPassWordModal}
      <Helmet>
        <title>{(article.title || '未知标题') + ' | ' + setting.systemTitle}</title>
      </Helmet>
      <ImageViewer containerSelector="#js-article-wrapper">
        <article id="js-article-wrapper" className={style.articleWrap}>
          {/* S 文章 Seo 信息 */}
          {setting.systemUrl && (
            <meta
              itemProp="url"
              content={url.resolve(setting.systemUrl, `/article/${article.id}`)}
            />
          )}
          <meta itemProp="headline" content={article.title} />
          {article.tags && (
            <meta itemProp="keywords" content={article.tags.map((tag) => tag.label).join(' ')} />
          )}
          <meta itemProp="dataPublished" content={article.publishAt} />
          {article.cover && <meta itemProp="image" content={article.cover} />}
          {/* E 文章 Seo 信息 */}

          {/* S 文章封面 */}
          {article.cover && (
            <div className={style.coverWrapper}>
              <img src={article.cover} alt="文章封面" />
            </div>
          )}
          {/* E 文章封面 */}

          {/* S 文章元信息 */}
          <div className={style.metaInfoWrap}>
            <h1 className={style.title}>{article.title}</h1>
            <p className={style.desc}>
              <span>
                发布于
                <LocaleTime date={article.publishAt} />
              </span>
              <span> • </span>
              <span>阅读量 {article.views}</span>
            </p>
          </div>
          {/* E 文章元信息 */}

          {/* S 文章内容 */}
          <MarkdownReader content={article.html} />
          {/* E 文章内容 */}

          {/* S 文章脚部 */}
          <div className={style.footerInfoWrap}>
            {/* S 文章版权 */}
            <div className={style.copyrightInfo}>
              发布时间：
              <LocaleTime date={article.publishAt} /> | 版权信息：
              <a href="https://creativecommons.org/licenses/by-nc/3.0/cn/deed.zh" target="_blank">
                非商用-署名-自由转载
              </a>
            </div>
            {/* E 文章版权 */}

            {/* S 文章标签 */}
            {article.tags && article.tags.length ? (
              <div className={style.tagWrap}>
                {article.tags.map((tag) => {
                  return (
                    <div className={style.tag} key={tag.id}>
                      <Link href={'/tag/[tag]'} as={'/tag/' + tag.value} scroll={false}>
                        <a>
                          <Icon type="tag" />
                          <span>{tag.label}</span>
                        </a>
                      </Link>
                    </div>
                  );
                })}
              </div>
            ) : null}
            {/* E 文章标签 */}
          </div>
          {/* E 文章脚部 */}
        </article>

        {/* S 文章评论 */}
        {article.isCommentable && (
          <div className={style.commentWrap}>
            <p className={style.title}>评论</p>
            <Comment hostId={article.id} />
          </div>
        )}
        {/* E 文章评论 */}
      </ImageViewer>
    </>
  );

  const Aside = article.toc ? (
    <>
      <ArticleRecommend articleId={article.id} mode="inline" />
      <div className={'sticky'}>
        {article.toc && <Toc tocs={JSON.parse(article.toc)} maxHeight={'80vh'} />}
      </div>
    </>
  ) : (
    <div className={'sticky'}>
      <ArticleRecommend articleId={article.id} mode="inline" />
    </div>
  );

  return <DoubleColumnLayout leftNode={Content} rightNode={Aside} />;
};

Article.getInitialProps = async (ctx) => {
  const { id } = ctx.query;
  const article = await ArticleProvider.getArticle(id);
  return { article };
};

export default Article;
