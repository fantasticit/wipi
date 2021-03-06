import React, { useState, useCallback, useEffect } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { Icon, Card, Button, List, Tooltip, Select, Popconfirm } from 'antd';
import { AdminLayout } from '@/layout/AdminLayout';
import { useToggle } from '@/hooks/useToggle';
import { useAsyncLoading } from '@/hooks/useAsyncLoading';
import { KnowledgeProvider } from '@/providers/knowledge';
import { KnowledgeSettingDrawer } from '@/components/KnowledgeSettingDrawer';
import { DataTable } from '@/components/DataTable';
import style from './index.module.scss';

interface IProps {
  books: IKnowledge[];
  total: number;
}

const Page: NextPage<IProps> = ({ books: defaultBooks, total }) => {
  const [visible, toggleVisible] = useToggle(false);
  const [params, setParams] = useState({});
  const [books, setBooks] = useState<IKnowledge[]>(defaultBooks);
  const [selectedBook, setSelectedBook] = useState<IKnowledge | null>(null);
  const [getKnowledgesApi, getLoading] = useAsyncLoading(KnowledgeProvider.getKnowledges);
  const [updateBookApi, updateLoading] = useAsyncLoading(KnowledgeProvider.updateKnowledge);
  const [deleteKnowledgeApi, deleteLoading] = useAsyncLoading(KnowledgeProvider.deleteKnowledge);

  const getBooks = useCallback((params = {}) => {
    setSelectedBook(null);
    return getKnowledgesApi(params).then((res) => {
      setBooks(res[0]);
      setParams(params);
      return res;
    });
  }, []);

  const editBook = useCallback((book) => {
    setSelectedBook(book);
    toggleVisible();
  }, []);

  const toggleBookStatus = useCallback(
    (book) => {
      updateBookApi(book.id, {
        status: book.status === 'draft' ? 'publish' : 'draft',
      }).then(() => {
        getBooks(params);
      });
    },
    [params]
  );

  const deleteBook = useCallback(
    (book) => {
      deleteKnowledgeApi(book.id).then(() => {
        getBooks(params);
      });
    },
    [params]
  );

  useEffect(() => {
    if (!visible && selectedBook) {
      setSelectedBook(null);
    }
  }, [visible]);

  const renderBook = useCallback(
    (book: IKnowledge) => (
      <List.Item key={book.id}>
        <Card
          loading={getLoading}
          style={{ width: '100%' }}
          cover={<img className={style.cover} alt={book.title} src={book.cover} />}
          actions={[
            <Link href={`/knowledge/editor/[id]`} as={`/knowledge/editor/` + book.id}>
              <a>
                <Icon type="edit" key="edit" />
              </a>
            </Link>,
            <Tooltip title={book.status === 'draft' ? '发布线上' : '设为草稿'}>
              <Icon
                onClick={() => toggleBookStatus(book)}
                type={book.status === 'draft' ? 'cloud-upload' : 'cloud-download'}
              />
            </Tooltip>,
            <Icon type="setting" key="setting" onClick={() => editBook(book)} />,
            <Popconfirm
              title="确认删除？"
              okText="确认"
              cancelText="取消"
              onConfirm={() => deleteBook(book)}
            >
              <Icon type="delete" key="setting" />
            </Popconfirm>,
          ]}
        >
          <Card.Meta title={book.title} description={book.summary} />
        </Card>
      </List.Item>
    ),
    []
  );

  return (
    <AdminLayout>
      <DataTable
        data={books}
        defaultTotal={total}
        columns={[]}
        searchFields={[
          {
            label: '名称',
            field: 'title',
            msg: '请输入知识库名称',
          },
          {
            label: '状态',
            field: 'status',
            children: (
              <Select style={{ width: 180 }}>
                {[
                  { label: '已发布', value: 'publish' },
                  { label: '草稿', value: 'draft' },
                ].map((t) => {
                  return (
                    <Select.Option key={t.label} value={t.value}>
                      {t.label}
                    </Select.Option>
                  );
                })}
              </Select>
            ),
          },
        ]}
        onSearch={getBooks}
        rightNode={
          <Button type="primary" onClick={toggleVisible}>
            <Icon type="plus" />
            新建
          </Button>
        }
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
            renderItem={renderBook}
          />
        )}
      />
      <KnowledgeSettingDrawer
        visible={visible}
        toggleVisible={toggleVisible}
        book={selectedBook}
        onOk={getBooks}
      />
    </AdminLayout>
  );
};

Page.getInitialProps = async () => {
  const [books, total] = await KnowledgeProvider.getKnowledges();
  return { books, total };
};

export default Page;
