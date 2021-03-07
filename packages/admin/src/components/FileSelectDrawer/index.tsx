import React, { useState, useCallback, useRef } from 'react';
import { Alert, Drawer, Card, List, Button } from 'antd';
import Viewer from 'viewerjs';
import { copy } from '@/utils';
import { FileProvider } from '@/providers/file';
import { DataTable } from '@/components/DataTable';
import { Upload } from '@/components/Upload';
import style from './index.module.scss';

const { Meta } = Card;
let viewer = null;

interface IFileProps {
  isCopy?: boolean;
  visible: boolean;
  closeAfterClick?: boolean;
  onClose: () => void;
  onChange?: (arg) => void;
}

export const FileSelectDrawer: React.FC<IFileProps> = ({
  visible,
  isCopy = false,
  closeAfterClick = false,
  onClose,
  onChange,
}) => {
  const ref = useRef();
  const [files, setFiles] = useState<IFile[]>([]);

  const getFiles = useCallback((params) => {
    return FileProvider.getFiles(params).then((res) => {
      setFiles(res[0]);
      return res;
    });
  }, []);

  const previewImage = useCallback((e) => {
    e.stopPropagation();
    if (!viewer) {
      viewer = new Viewer(ref.current, { inline: false });
    } else {
      viewer.update();
    }
  }, []);

  const clickImage = useCallback(
    (file) => {
      isCopy && copy(file.url);
      onChange && onChange(file.url);
      closeAfterClick && onClose();
    },
    [isCopy, onChange, closeAfterClick, onClose]
  );

  return (
    <Drawer
      width={786}
      placement="right"
      title={'文件选择'}
      closable={true}
      onClose={onClose}
      visible={visible}
    >
      {isCopy && (
        <div style={{ marginBottom: 16 }}>
          <Alert message="点击卡片复制链接，点击图片查看大图" type="info" />
        </div>
      )}

      <div ref={ref}>
        <DataTable
          data={files}
          defaultTotal={0}
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
          showSearchLabel={false}
          padding={0}
          onSearch={getFiles}
          rightNode={
            <Upload onOK={getFiles} useDragger={false}>
              <Button>上传文件</Button>
            </Upload>
          }
          customDataTable={(data) => (
            <List
              grid={{
                gutter: 16,
                sm: 3,
              }}
              dataSource={files}
              renderItem={(file: IFile) => (
                <List.Item key={file.id}>
                  <Card
                    hoverable={true}
                    cover={
                      <div className={style.preview} onClick={previewImage}>
                        <img alt={file.originalname} src={file.url} />
                      </div>
                    }
                    onClick={() => clickImage(file)}
                  >
                    <Meta title={file.originalname} />
                  </Card>
                </List.Item>
              )}
            />
          )}
        />
      </div>
    </Drawer>
  );
};
