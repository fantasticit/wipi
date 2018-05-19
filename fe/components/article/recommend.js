import { Component } from 'react'
import Link from 'next/link'
import LinePanel from '../common/line-panel'
import Author from './author'

class Recommend extends Component {
  constructor() {
    super()
  }

  render() {
    const { articles = [] } = this.props

    return (
      <div className="recommend">
        <div className="container">
          <LinePanel color={'#676b6f'} title={'推荐文章'} />
          <ul>
            {articles.map((article, i) => (
              <li key={i} className={article.cover ? 'with-cover' : ''}>
                <Link as={`/article/${article._id}`} href={`/article?id=${article._id}`}>
                  <div>
                    {article.cover ? <img className="cover" src={article.cover} /> : ''}
                    <div>
                      <a className="title">{article.title}</a>
                      <p className="desc">{article.desc}</p>
                      <Author
                        author={{
                          avatar: article.author.avatar,
                          account: article.author.account,
                          createAt: article.createAt,
                          readingQuantity: article.readingQuantity
                        }}
                      />
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <style jsx>{`
          .recommend {
            padding: 1.5rem 0;
            color: #fff;
            background-image: url(https://assets-cdn.shimo.im/assets/images/home/index/pic05-c39de888ff.jpg);
            background-size: cover;
            background-position: center;
          }

          ul li {
            position: relative;
            margin: 2rem 0;
            list-style: none;
            min-height: 130px;
            cursor: pointer;
          }

          li.with-cover {
            padding-right: 180px;
          }

          li::after {
            content: '';
            display: table;
            clear: both;
          }

          li:not(:last-of-type) {
            border-bottom: 1px solid transparent;
          }

          .title {
            margin: -7px 0 10px;
            display: inherit;
            font-size: 1.5rem;
            font-weight: 500;
            line-height: 1.5;
          }

          .desc {
            margin-bottom: 12px;
            font-size: 13px;
            line-height: 23px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }

          .cover {
            position: absolute;
            right: 0;
            top: 0;
            width: 150px;
            height: 120px;
            border-radius: 6px;
          }

          @media (max-width: 768px) {
            .container {
              padding: 0 15px;
            }

            li.with-cover {
              padding-right: 0;
            }

            .cover {
              position: relative;
              width: 100%;
              height: auto;
              margin-bottom: 1.5rem;
              border-radius: 0;
            }
          }
        `}</style>
      </div>
    )
  }
}

export default Recommend
