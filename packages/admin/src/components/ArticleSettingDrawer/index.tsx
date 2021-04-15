import React, { useState, useEffect } from 'react';
import { Drawer, Button, Input, Switch, Select } from 'antd';
import { FileSelectDrawer } from '@/components/FileSelectDrawer';
import { CategoryProvider } from '@/providers/category';
import { TagProvider } from '@/providers/tag';
import style from './index.module.scss';

interface IProps {
  visible: boolean;
  article?: IArticle;
  onClose: () => void;
  onChange?: (arg) => void;
}

const FormItem = ({ label, content }) => {
  return (
    <div className={style.formItem}>
      <span>{label}</span>
      <div>{content}</div>
    </div>
  );
};

export const ArticleSettingDrawer: React.FC<IProps> = ({
  article = {},
  visible,
  onClose,
  onChange,
}) => {
  const [fileVisible, setFileVisible] = useState(false);
  const [summary, setSummary] = useState(article.summary || null);
  const [categorys, setCategorys] = useState<Array<ICategory>>([]);
  const [tags, setTags] = useState<Array<ITag>>([]);
  const [password, setPassWord] = useState(article.password || null);
  const [isCommentable, setCommentable] = useState<boolean>(article.isCommentable || true);
  const [isRecommended, setRecommended] = useState(article.isRecommended || false);
  const [selectedCategory, setSelectedCategory] = useState(
    (article.category && article.category.id) || null
  );
  const [selectedTags, setSelectedTags] = useState(
    (Array.isArray(article.tags) && (article.tags as ITag[]).map((tag) => tag.id)) || []
  );
  const [cover, setCover] = useState(article.cover || null);

  useEffect(() => {
    setSummary(article.summary);
    setCommentable(article.isCommentable || true);
    setRecommended(article.isRecommended || false);
    setSelectedCategory((article.category && article.category.id) || null);
    setSelectedTags(
      (Array.isArray(article.tags) && (article.tags as ITag[]).map((tag) => tag.id)) || []
    );
    setCover(article.cover || null);
  }, [
    article.summary,
    article.isCommentable,
    article.isRecommended,
    article.category,
    article.tags,
    article.cover,
  ]);

  useEffect(() => {
    CategoryProvider.getCategory().then((res) => setCategorys(res));
    TagProvider.getTags().then((tags) => setTags(tags));
  }, []);

  const save = () => {
    onChange({
      summary,
      password,
      isCommentable,
      isRecommended,
      category: selectedCategory,
      tags: selectedTags.join(','),
      cover,
      status: 'draft',
    });
  };

  const publish = () => {
    onChange({
      summary,
      password,
      isCommentable,
      isRecommended,
      tags: selectedTags.join(','),
      category: selectedCategory,
      cover,
      status: 'publish',
    });
  };

  return (
    <Drawer
      width={480}
      placement="right"
      title={'文章设置'}
      closable={true}
      onClose={onClose}
      visible={visible}
    >
      <FormItem
        label="文章摘要"
        content={
          <Input.TextArea
            className={style.formItem}
            placeholder="请输入文章摘要"
            autoSize={{ minRows: 6, maxRows: 8 }}
            value={summary}
            onChange={(e) => {
              setSummary(e.target.value);
            }}
          />
        }
      />
      <FormItem
        label="访问密码"
        content={
          <Input.Password
            value={password}
            onChange={(e) => {
              setPassWord(e.target.value);
            }}
            placeholder="输入后查看需要密码"
          />
        }
      />
      <FormItem
        label="开启评论"
        content={<Switch checked={isCommentable} onChange={setCommentable} />}
      />
      <FormItem
        label="首页推荐"
        content={<Switch checked={isRecommended} onChange={setRecommended} />}
      />
      <FormItem
        label="选择分类"
        content={
          <Select value={selectedCategory} onChange={setSelectedCategory} style={{ width: '100%' }}>
            {categorys.map((t) => (
              <Select.Option key={t.id} value={t.id}>
                {t.label}
              </Select.Option>
            ))}
          </Select>
        }
      />
      <FormItem
        label="选择标签"
        content={
          <Select
            mode="tags"
            value={selectedTags}
            onChange={setSelectedTags}
            style={{ width: '100%' }}
          >
            {tags.map((tag) => (
              <Select.Option key={tag.id} value={tag.id}>
                {tag.label}
              </Select.Option>
            ))}
          </Select>
        }
      />
      <FormItem
        label="文章封面"
        content={
          <div className={style.cover}>
            <div onClick={() => setFileVisible(true)} className={style.preview}>
              <img src={cover} alt="预览图" />
            </div>

            <Input
              placeholder="或输入外部链接"
              value={cover}
              onChange={(e) => {
                setCover(e.target.value);
              }}
            />
            <Button onClick={() => setCover(null)}>移除</Button>
          </div>
        }
      />
      <FileSelectDrawer
        closeAfterClick={true}
        visible={fileVisible}
        onClose={() => setFileVisible(false)}
        onChange={(url) => setCover(url)}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e8e8e8',
          padding: '10px 16px',
          textAlign: 'right',
          left: 0,
          background: '#fff',
          borderRadius: '0 0 4px 4px',
        }}
      >
        <Button
          style={{
            marginRight: 8,
          }}
          onClick={save}
        >
          保存草稿
        </Button>
        <Button type="primary" onClick={publish}>
          发布
        </Button>
      </div>
    </Drawer>
  );
};
