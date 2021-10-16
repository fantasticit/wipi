/**
 * 基于 sqlite3 fts 实现全文搜索
 */
import * as os from 'os';
import * as path from 'path';
import * as Database from 'better-sqlite3';

const CHINESE_TOKENIZE_EXT_PATH = {
  Windows_NT: './windows/simple',
  Darwin: './osx/libsimple',
  Linux: './linux/libsimple',
};
const chineseTokenizeExtPath = CHINESE_TOKENIZE_EXT_PATH[os.type()];

// 文章数据库
const db = new Database('./wipi.db');

let isChinesOk = false;
if (chineseTokenizeExtPath) {
  try {
    db.loadExtension(path.join(__dirname, '../../sqlite3-fts5-chinese', chineseTokenizeExtPath));
    isChinesOk = true;
  } catch (e) {
    console.error(`加载中文分词插件失败`, e.message || e);
  }
} else {
  console.warn('未知系统，无法加载中文分词插件');
}

db.exec(`
    CREATE VIRTUAL TABLE IF NOT EXISTS article USING fts5(id, title, summary, content, status ${
      isChinesOk ? ",tokenize = 'simple'" : ''
    });
  `);

const insertArticle = db.prepare(
  'INSERT INTO article (id, title, summary, content, status) VALUES (@id, @title, @summary, @content, @status)'
);

/**
 * 同步文章数据`
 * @param data
 */
export const syncArticle = (data) => {
  data = Array.isArray(data) ? data : [data];
  for (const item of data) {
    insertArticle.run(item);
  }
};

/**
 * 全文搜索
 * @param text
 * @returns
 */
export const searchArticle = (text) => {
  const query = db.prepare(`
    SELECT *
    FROM article
    WHERE article match ${isChinesOk ? "simple_query('" + text + "')" : "'" + text + "'"}
    ORDER BY rank;
  `);

  return query.all() || [];
};
