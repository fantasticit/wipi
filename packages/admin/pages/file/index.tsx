import React, { useState, useCallback, useRef } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import {
  Row,
  Col,
  Drawer,
  Button,
  Spin,
  Upload,
  Icon,
  message,
  Card,
  List,
  Popconfirm,
  Alert,
} from 'antd';
import Viewer from 'viewerjs';
import { copy, formatFileSize } from '@/utils';
import { AdminLayout } from '@/layout/AdminLayout';
import { useSetting } from '@/hooks/useSetting';
import { FileProvider } from '@/providers/file';
import { LocaleTime } from '@/components/LocaleTime';
import { DataTable } from '@/components/DataTable';
import style from './index.module.scss';

const { Meta } = Card;

const drawerFooterStyle: React.CSSProperties = {
  position: 'absolute',
  bottom: 0,
  width: '100%',
  borderTop: '1px solid #e8e8e8',
  padding: '10px 16px',
  textAlign: 'right',
  left: 0,
  background: '#fff',
  borderRadius: '0 0 4px 4px',
};

const DescriptionItem = ({ title, content }) => (
  <div className={style.description}>
    <p>{title}:</p>
    <div>{content}</div>
  </div>
);

interface IFileProps {
  files: IFile[];
  total: number;
}

let viewer = null;

const File: NextPage<IFileProps> = ({ files: defaultFiles = [], total }) => {
  const ref = useRef();
  const setting = useSetting();
  const [loading, setLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [files, setFiles] = useState<IFile[]>(defaultFiles);
  const [currentFile, setCurrentFile] = useState<IFile | null>(null);
  const [params, setParams] = useState(null);

  const isOSSSettingFullFiled =
    setting &&
    setting.ossRegion &&
    setting.ossAccessKeyId &&
    setting.ossAccessKeySecret &&
    setting.ossBucket;

  const uploadProps = {
    name: 'file',
    multiple: true,
    action: '',
    beforeUpload(file) {
      setLoading(true);
      FileProvider.uploadFile(file)
        .then(() => {
          message.success('上传成功');
          getFiles(params);
        })
        .catch(() => {
          setLoading(false);
        });
      return Promise.reject();
    },
  };

  const getFiles = useCallback((params = {}) => {
    return FileProvider.getFiles(params)
      .then((res) => {
        setParams(params);
        setFiles(res[0]);
        setLoading(false);
        return res;
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  const deleteFile = useCallback(
    (id) => {
      FileProvider.deleteFile(id).then(() => {
        setVisible(false);
        setLoading(true);
        getFiles(params);
      });
    },
    [params]
  );

  return (
    <AdminLayout>
      <div className={style.wrapper}>
        {!isOSSSettingFullFiled ? (
          <div style={{ marginBottom: 24 }}>
            <Alert
              message={
                <span>
                  系统检测到<strong>阿里云OSS配置</strong>未完善，
                  <Link href="/setting?type=OSS%20设置">
                    <a>点我立即完善</a>
                  </Link>
                </span>
              }
              type="warning"
            />
          </div>
        ) : (
          <div style={{ marginBottom: 24 }}>
            <Spin tip="文件上传中..." spinning={loading}>
              <Upload.Dragger {...uploadProps}>
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">点击选择文件或将文件拖拽到此处</p>
                <p className="ant-upload-hint">文件将上传到 阿里云 OSS, 如未配置请先配置</p>
              </Upload.Dragger>
            </Spin>
          </div>
        )}

        <DataTable
          data={files}
          defaultTotal={total}
          columns={[]}
          searchFields={[
            {
              label: '文件名称',
              field: 'originalname',
              msg: '请输入文件名称',
            },
            {
              label: '文件类型',
              field: 'type',
              msg: '请输入文件类型',
            },
          ]}
          onSearch={getFiles}
          customDataTable={(data) => (
            <List
              className={style.imgs}
              grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 4,
                lg: 4,
                xl: 4,
                xxl: 6,
              }}
              dataSource={data}
              renderItem={(file: IFile) => (
                <List.Item key={file.id}>
                  <Card
                    hoverable={true}
                    cover={
                      <div className={style.preview}>
                        <img alt={file.originalname} src={file.url} />
                      </div>
                    }
                    onClick={() => {
                      setCurrentFile(file);
                      setVisible(true);
                      Promise.resolve().then(() => {
                        if (!viewer) {
                          viewer = new Viewer(ref.current, { inline: false });
                        } else {
                          viewer.update();
                        }
                      });
                    }}
                  >
                    <Meta
                      title={file.originalname}
                      description={'上传于 ' + <LocaleTime date={file.createAt} />}
                    />
                  </Card>
                </List.Item>
              )}
            />
          )}
        />

        <Drawer
          width={640}
          placement="right"
          title={'文件信息'}
          closable={true}
          onClose={() => setVisible(false)}
          visible={visible}
        >
          <div ref={ref} className={style.previewContainer}>
            <img
              alt={currentFile && currentFile.originalname}
              src={currentFile && currentFile.url}
            />
          </div>
          <Row>
            <Col span={24}>
              <DescriptionItem title="文件名称" content={currentFile && currentFile.originalname} />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem title="存储路径" content={currentFile && currentFile.filename} />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="文件类型" content={currentFile && currentFile.type} />
            </Col>
            <Col span={12}>
              <DescriptionItem
                title="文件大小"
                content={formatFileSize((currentFile && currentFile.size) || 0)}
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="访问链接"
                content={
                  <>
                    <div
                      className={style.urlContainer}
                      onClick={() => {
                        copy(currentFile && currentFile.url);
                      }}
                    >
                      {currentFile && currentFile.url}
                    </div>
                    <Button
                      type="link"
                      onClick={() => {
                        copy(currentFile && currentFile.url);
                      }}
                    >
                      复制
                    </Button>
                  </>
                }
              />
            </Col>
          </Row>
          <div style={drawerFooterStyle}>
            <Button
              style={{
                marginRight: 8,
              }}
              onClick={() => setVisible(false)}
            >
              关闭
            </Button>
            <Popconfirm
              placement="topRight"
              title="确认删除这个文件？"
              onConfirm={() => deleteFile(currentFile && currentFile.id)}
              okText="确认"
              cancelText="取消"
            >
              <Button type="danger">删除</Button>
            </Popconfirm>
          </div>
        </Drawer>
      </div>
    </AdminLayout>
  );
};

File.getInitialProps = async () => {
  const files = await FileProvider.getFiles({ page: 1, pageSize: 12 });
  return { files: files[0], total: files[1] };
};

export default File;
