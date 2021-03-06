import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { NextPage } from 'next';
import Router from 'next/router';
import { Icon, Modal, Form, Input, message } from 'antd';
import Link from 'next/link';
import cls from 'classnames';
import { GlobalContext } from '@/context/global';
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
  const [affix, setAffix] = useState(false);

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

  useEffect(() => {
    const handler = () => {
      // @ts-ignore
      const y = window.scrollY;
      setAffix(y > 400);
    };
    document.addEventListener('scroll', handler);
    return () => {
      document.removeEventListener('scroll', handler);
    };
  }, []);

  useEffect(() => {
    setShouldCheckPassword(article && article.needPassword);
  }, [article.id]);

  // 更新阅读量
  useEffect(() => {
    if (!shouldCheckPassWord) {
      ArticleProvider.updateArticleViews(article.id);
    }
  }, [shouldCheckPassWord]);

  return (
    <>
      {/* S 密码检验 */}
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
      {/* E 密码检验 */}
      <div className={style.wrapper}>
        <div className={cls('container')}>
          <div className={style.main}>
            <div className={style.content}>
              <Helmet>
                <title>{(article.title || '未知标题') + ' | ' + setting.systemTitle}</title>
              </Helmet>
              <ImageViewer containerSelector="#js-article-wrapper">
                <article id="js-article-wrapper" className={cls(style.container)}>
                  {setting.systemUrl && (
                    <meta
                      itemProp="url"
                      content={url.resolve(setting.systemUrl, `/article/${article.id}`)}
                    />
                  )}
                  <meta itemProp="headline" content={article.title} />
                  {article.tags && (
                    <meta
                      itemProp="keywords"
                      content={article.tags.map((tag) => tag.label).join(' ')}
                    />
                  )}
                  <meta itemProp="dataPublished" content={article.publishAt} />
                  {article.cover && <meta itemProp="image" content={article.cover} />}
                  {article.cover && (
                    <div className={style.coverWrapper}>
                      <img src={article.cover} alt="文章封面" />
                    </div>
                  )}
                  <div className={style.meta}>
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
                  <div className={style.content}>
                    <MarkdownReader content={article.html} />
                    <div className={style.articleFooter}>
                      <div className={style.articleInfo}>
                        <p>
                          发布时间：
                          <LocaleTime date={article.publishAt} /> | 版权信息：
                          <a
                            href="https://creativecommons.org/licenses/by-nc/3.0/cn/deed.zh"
                            target="_blank"
                          >
                            非商用-署名-自由转载
                          </a>
                        </p>
                      </div>
                      {article.tags && article.tags.length ? (
                        <div className={style.tags}>
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
                    </div>
                  </div>
                </article>
                <p className={style.title}>评论</p>
                {article.isCommentable && <Comment hostId={article.id} />}
              </ImageViewer>
            </div>
            <aside className={style.aside}>
              {article.toc ? (
                <>
                  <ArticleRecommend articleId={article.id} mode="inline" />
                  <div className={cls(affix ? style.isFixed : false)}>
                    {article.toc && (
                      <div className={style.infoWrapper}>
                        <header>目录</header>
                        <main>
                          <Toc tocs={JSON.parse(article.toc)} />
                        </main>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className={cls(affix ? style.isFixed : false)}>
                  <ArticleRecommend articleId={article.id} mode="inline" />
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

Article.getInitialProps = async (ctx) => {
  const { id } = ctx.query;
  const article = await ArticleProvider.getArticle(id);
  return { article };
};

export default Article;
