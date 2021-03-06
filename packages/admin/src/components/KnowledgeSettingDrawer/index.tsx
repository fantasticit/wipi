import React, { useState, useCallback, useEffect } from 'react';
import { Icon, Input, Upload, Button, Switch, message, Drawer } from 'antd';
import { UploadListType } from 'antd/es/upload/interface';
import { useToggle } from '@/hooks/useToggle';
import { useAsyncLoading } from '@/hooks/useAsyncLoading';
import { FileProvider } from '@/providers/file';
import { KnowledgeProvider } from '@/providers/knowledge';
import { FileSelectDrawer } from '@/components/FileSelectDrawer';

export const KnowledgeSettingDrawer = ({ visible, toggleVisible, book = null, onOk }) => {
  const isUpdate = book !== null;
  const [loading, toggleLoading] = useToggle(false);
  const [fileVisible, toggleFileVisible] = useToggle(false);
  const [createBookApi, createLoading] = useAsyncLoading(KnowledgeProvider.createBook);
  const [updateBookApi, updateLoading] = useAsyncLoading(KnowledgeProvider.updateKnowledge);
  const [title, setTitle] = useState((book && book.title) || '');
  const [summary, setSummary] = useState((book && book.summary) || '');
  const [isCommentable, setCommentable] = useState((book && book.isCommentable) || false);
  const [cover, setCover] = useState((book && book.cover) || '');

  const uploadProps = {
    name: 'avatar',
    listType: 'picture' as UploadListType,
    accept: `.jpg, .jpeg, .pjpeg, .png, .apng, .bmp, .gif, .svg, .webp`,
    multiple: false,
    action: '',
    beforeUpload(file) {
      toggleLoading();
      FileProvider.uploadFile(file)
        .then((res) => {
          setCover(res.url);
          toggleLoading();
        })
        .catch(() => {
          message.error('上传失败');
          toggleLoading();
        });
      return Promise.reject();
    },
  };

  const uploadContent = (
    <>
      <p className="ant-upload-drag-icon">
        {loading ? <Icon type="loading" /> : <Icon type="plus" />}
      </p>
      <p className="ant-upload-text">点击选择文件或将文件拖拽到此处</p>
      <p className="ant-upload-hint">文件将上传到 阿里云 OSS, 如未配置请先配置</p>
    </>
  );

  const ok = useCallback(() => {
    const data = { title: title.trim(), cover, summary: summary.trim(), isCommentable };
    const promise = isUpdate ? updateBookApi(book.id, data) : createBookApi(data);
    promise.then(() => {
      message.success(isUpdate ? '更新成功' : '创建成功');
      toggleVisible();
      onOk();
    });
  }, [title, summary, isCommentable, cover, onOk]);

  useEffect(() => {
    setTitle((book && book.title) || '');
    setSummary((book && book.summary) || '');
    setCommentable((book && book.isCommentable) || false);
    setCover((book && book.cover) || '');
  }, [book]);

  return (
    <Drawer
      title={isUpdate ? '更新知识库' : '新建知识库'}
      width={600}
      visible={visible}
      onClose={toggleVisible}
    >
      <div className="form-item">
        <label htmlFor="title">名称</label>
        <div>
          <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
      </div>
      <div className="form-item">
        <label htmlFor="summary">描述</label>
        <div>
          <Input.TextArea
            autoSize={{ minRows: 3, maxRows: 6 }}
            id="summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </div>
      </div>
      <div className="form-item">
        <label htmlFor="title">评论</label>
        <div>
          <Switch checked={isCommentable} onChange={setCommentable} />
        </div>
      </div>
      <div className="form-item">
        <label htmlFor="upload">封面</label>
        <div>
          <Upload.Dragger
            {...uploadProps}
            style={{
              width: '100%',
              minHeight: 160,
            }}
          >
            {cover ? <img src={cover} alt="avatar" style={{ width: '100%' }} /> : uploadContent}
          </Upload.Dragger>
          <Input value={cover} style={{ marginTop: 12 }}></Input>
          <Button style={{ marginTop: 12 }} onClick={toggleFileVisible}>
            选择文件
          </Button>
          {cover && (
            <Button
              style={{ marginTop: 12, marginLeft: 12 }}
              type="danger"
              onClick={() => setCover('')}
            >
              移除
            </Button>
          )}
        </div>
      </div>
      <FileSelectDrawer
        visible={fileVisible}
        onClose={toggleFileVisible}
        onChange={(url) => {
          setCover(url);
          toggleFileVisible();
        }}
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
        <Button onClick={toggleVisible}>取消</Button>
        <Button
          style={{ marginLeft: 8 }}
          type="primary"
          disabled={!title.trim()}
          loading={isUpdate ? updateLoading : createLoading}
          onClick={ok}
        >
          {isUpdate ? '更新' : '创建'}
        </Button>
      </div>
    </Drawer>
  );
};
