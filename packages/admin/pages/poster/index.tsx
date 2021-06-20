import React, { useState, useCallback, useRef, useMemo } from 'react';
import Link from 'next/link';
import { Row, Col, Drawer, Button, message, Card, List, Popconfirm, Alert, Typography } from 'antd';
import Viewer from 'viewerjs';
import { formatFileSize } from '@/utils';
import { copy } from '@/utils/copy';
import { AdminLayout } from '@/layout/AdminLayout';
import { useSetting } from '@/hooks/useSetting';
import { PosterProvider } from '@/providers/poster';
import { LocaleTime } from '@/components/LocaleTime';
import { Upload } from '@/components/Upload';
import { useToggle } from '@/hooks/useToggle';
import { useAsyncLoading } from '@/hooks/useAsyncLoading';
import { usePagination } from '@/hooks/usePagination';
import { PaginationTable } from '@/components/PaginationTable';
import style from './index.module.scss';

const { Meta } = Card;
const { Paragraph } = Typography;

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
    <Paragraph ellipsis={true}>{content}</Paragraph>
  </div>
);

const SEARCH_FIELDS = [
  {
    label: '文件名称',
    field: 'name',
    msg: '请输入文件名称',
  },
];

const GRID = {
  gutter: 16,
  xs: 1,
  sm: 2,
  md: 4,
  lg: 4,
  xl: 4,
  xxl: 6,
};

let viewer = null;

const Poster = () => {
  const ref = useRef();
  const setting = useSetting();
  const [visible, toggleVisible] = useToggle(false);
  const [current, setCurrent] = useState<IPoster | null>(null);
  const { loading, data, refresh, ...resetPagination } = usePagination<IPoster>(
    PosterProvider.getPosters
  );
  const [deleteApi, deleteLoading] = useAsyncLoading(PosterProvider.deletePoster);
  const isOSSSettingFullFiled = useMemo(() => setting && setting.oss, [setting]);

  const deleteAction = useCallback(
    (ids, resetSelectedRows = null) => {
      if (!Array.isArray(ids)) {
        ids = [ids];
      }
      return () => {
        Promise.all(ids.map((id) => deleteApi(id))).then(() => {
          message.success('操作成功');
          resetSelectedRows && resetSelectedRows();
          setCurrent(null);
          toggleVisible();
          refresh();
        });
      };
    },
    [deleteApi, toggleVisible, refresh]
  );

  const renderList = useCallback(
    (data) => {
      const onClick = (item) => () => {
        setCurrent(item);
        toggleVisible();
        Promise.resolve().then(() => {
          if (!viewer) {
            viewer = new Viewer(ref.current, { inline: false });
          } else {
            viewer.update();
          }
        });
      };

      const renderItem = (item: IPoster) => (
        <List.Item key={item.id}>
          <Card
            hoverable={true}
            cover={
              <div className={style.preview}>
                <img alt={item.name} src={item.imgUrl} />
              </div>
            }
            onClick={onClick(item)}
          >
            <Meta
              title={item.name}
              description={
                <>
                  上传于
                  <LocaleTime date={item.createAt} />
                </>
              }
            />
          </Card>
        </List.Item>
      );
      return <List className={style.imgs} grid={GRID} dataSource={data} renderItem={renderItem} />;
    },
    [toggleVisible]
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
            <Upload onOK={refresh} />
          </div>
        )}
        <PaginationTable
          loading={loading}
          data={data}
          refresh={refresh}
          {...resetPagination}
          searchFields={SEARCH_FIELDS}
          customDataTable={renderList}
        />
        <Drawer
          width={640}
          placement="right"
          title={'文件信息'}
          closable={true}
          onClose={toggleVisible}
          visible={visible}
        >
          <div ref={ref} className={style.previewContainer}>
            <img alt={current && current.name} src={current && current.imgUrl} />
          </div>
          <Row>
            <Col span={24}>
              <DescriptionItem title="文件名称" content={current && current.name} />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="制作页面" content={current && current.pageUrl} />
            </Col>
            <Col span={12}>
              <DescriptionItem
                title="文件大小"
                content={formatFileSize((current && current.size) || 0)}
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
                        copy(current && current.imgUrl);
                      }}
                    >
                      {current && current.imgUrl}
                    </div>
                    <Button
                      type="link"
                      onClick={() => {
                        copy(current && current.imgUrl);
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
              onClick={toggleVisible}
            >
              关闭
            </Button>
            <Popconfirm
              placement="topRight"
              title="确认删除这个文件？"
              onConfirm={deleteAction(current && current.id)}
              okText="确认"
              cancelText="取消"
            >
              <Button danger={true} loading={deleteLoading}>
                删除
              </Button>
            </Popconfirm>
          </div>
        </Drawer>
      </div>
    </AdminLayout>
  );
};

export default Poster;
