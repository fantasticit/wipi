import React, { useState, useCallback, useRef } from 'react';
import { Alert, Drawer, Card, List, message } from 'antd';
import { FileProvider } from '@providers/file';
import { SPTDataTable } from '@/components/SPTDataTable';
import style from './index.module.scss';

const { Meta } = Card;

interface IFileProps {
  isCopy?: boolean;
  visible: boolean;
  closeAfterClick?: boolean;
  onClose: () => void;
  onChange?: (arg: any) => void;
}

const copy = (value) => {
  const textarea: any = document.createElement('textarea');
  textarea.id = 't';
  textarea.style.height = 0;
  document.body.appendChild(textarea);
  textarea.value = value;
  const selector: any = document.querySelector('#t');
  selector.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
  message.success('链接已复制到剪切板');
};

export const FileSelectDrawer: React.FC<IFileProps> = ({
  visible,
  isCopy = false,
  closeAfterClick = false,
  onClose,
  onChange,
}) => {
  const ref = useRef();
  const [loading, setLoading] = useState<boolean>(false);
  const [files, setFiles] = useState<IFile[]>([]);
  const [params, setParams] = useState(null);

  const getFiles = useCallback((params) => {
    return FileProvider.getFiles(params)
      .then((res) => {
        setFiles(res[0]);
        setLoading(false);
        return res;
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

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
        <div style={{ marginBottom: 24 }}>
          <Alert message="点击卡片复制链接，点击图片查看大图" type="info" />
        </div>
      )}
      <div ref={ref}>
        <SPTDataTable
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
          onSearch={getFiles}
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
                      <div className={style.preview}>
                        <img alt={file.originalname} src={file.url} />
                      </div>
                    }
                    onClick={() => {
                      isCopy && copy(file.url);
                      onChange && onChange(file.url);
                      closeAfterClick && onClose();
                    }}
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
