import React, { useEffect, useContext } from 'react';
import { NextPage } from 'next';
import { Helmet } from 'react-helmet';
import { GlobalContext } from '@/context/global';
import { PageProvider } from '@/providers/page';
import { ImageViewer } from '@/components/ImageViewer';
import { CommentAndArticleRecommend } from '@/components/CommentAndArticleRecommend';
import { MarkdownReader } from '@/components/MarkdownReader';
import style from './index.module.scss';

interface IProps {
  page: IPage;
}

const Page: NextPage<IProps> = ({ page }) => {
  const { setting } = useContext(GlobalContext);

  useEffect(() => {
    PageProvider.updatePageViews(page.id);
  }, [page.id]);

  return (
    <>
      {!page ? (
        <div className="container">
          <p>页面不存在</p>
        </div>
      ) : (
        <ImageViewer containerSelector="#js-page-wrapper">
          <div id="js-page-wrapper" className={style.container}>
            <Helmet>
              <title>{page.name + ' | ' + setting.systemTitle}</title>
            </Helmet>

            <div className="container">
              {page.cover && (
                <div className={style.coverWrapper}>
                  <img src={page.cover} alt="文章封面" />
                </div>
              )}
              <div className={style.content}>
                <MarkdownReader content={page.html} />
              </div>
            </div>
            <CommentAndArticleRecommend pageId={page.id} isCommentable={true} />
          </div>
        </ImageViewer>
      )}
    </>
  );
};

Page.getInitialProps = async (ctx) => {
  const { id } = ctx.query;
  const page = await PageProvider.getPage(id);
  return { page };
};

export default Page;
