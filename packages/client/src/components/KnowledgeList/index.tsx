import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Divider } from 'antd';
import { EyeOutlined, ShareAltOutlined } from '@ant-design/icons';
import LazyLoad from 'react-lazyload';
import { Opacity } from '@/components/Animation/Opacity';
import { LocaleTime } from '@/components/LocaleTime';
import { Share } from '@/components/Share';
import style from './index.module.scss';

interface IProps {
  knowledges: IKnowledge[];
}

export const KnowledgeList: React.FC<IProps> = ({ knowledges = [] }) => {
  const t = useTranslations();
  return (
    <div className={style.wrapper}>
      {knowledges && knowledges.length ? (
        knowledges.map((knowledge) => {
          return (
            <div key={knowledge.id} className={style.articleItem}>
              <Opacity>
                <Link
                  key={knowledge.id}
                  href={`/knowledge/[pId]`}
                  as={`/knowledge/${knowledge.id}`}
                  scroll={false}
                >
                  <a>
                    <header>
                      <div className={style.title}>{knowledge.title}</div>
                      <div className={style.info}>
                        <Divider type="vertical" />
                        <span className={style.time}>
                          <LocaleTime date={knowledge.publishAt} timeago={true} />
                        </span>
                      </div>
                    </header>
                    <main>
                      {knowledge.cover && (
                        <LazyLoad height={120}>
                          <div className={style.coverWrapper}>
                            <img src={knowledge.cover} alt="cover" />
                          </div>
                        </LazyLoad>
                      )}
                      <div className={style.contentWrapper}>
                        <div className={style.desc}>{knowledge.summary}</div>
                        <div className={style.meta}>
                          <span>
                            <EyeOutlined />
                            <span className={style.number}>{knowledge.views}</span>
                          </span>
                          <span className={style.seperator}>·</span>
                          <Share
                            cover={knowledge.cover}
                            title={knowledge.title}
                            desc={knowledge.summary}
                            url={`/knowledge/${knowledge.id}`}
                          >
                            <span>
                              <ShareAltOutlined />
                              <span className={style.number}>{t('share')}</span>
                            </span>
                          </Share>
                        </div>
                      </div>
                    </main>
                  </a>
                </Link>
              </Opacity>
            </div>
          );
        })
      ) : (
        <div className={'empty'}>{t('empty')}</div>
      )}
    </div>
  );
};
