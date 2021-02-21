import React, { useState, useEffect, useCallback } from 'react';
import { Table, Menu, Dropdown, Icon, Tooltip } from 'antd';
import { Pagination } from '@/components/Pagination';
import { Search } from '@/components/Search';
import style from './index.module.scss';

interface IProps {
  title?: React.ReactNode;
  rightNode?: React.ReactNode;
  scroll?: any;
  searchFields: Array<any>;
  columns: Array<any>;
  data: Array<any>;
  customDataTable?: (data) => React.ReactNode;
  defaultTotal: number;
  onSearch: (arg: any) => Promise<any>;
}

export const SPTDataTable: React.FC<IProps> = ({
  title,
  rightNode,
  scroll = null,
  searchFields = [],
  columns = [],
  data,
  defaultTotal,
  onSearch,
  customDataTable = null,
}) => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [size, setSize] = useState<any>('default');
  const [total, setTotal] = useState(defaultTotal);
  const [searchParams, updateSearchParams] = useState({});

  const getData = useCallback(() => {
    setLoading(true);
    const params = { page, pageSize, ...searchParams };
    onSearch(params)
      .then((res) => {
        setTotal(res[1]);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, [page, pageSize, searchParams]);

  useEffect(() => {
    getData();
  }, [page, pageSize, searchParams]);

  const menu = (
    <Menu>
      <Menu.Item onClick={() => setSize('default')}>默认</Menu.Item>
      <Menu.Item onClick={() => setSize('small')}>紧凑</Menu.Item>
      <Menu.Item onClick={() => setSize('medium')}>中等</Menu.Item>
    </Menu>
  );

  return (
    <div className={style.wrapper}>
      <Search
        fields={searchFields}
        onSearch={(params) => {
          setPage(1);
          updateSearchParams(params);
        }}
      />
      <div style={{ background: '#fff', padding: 24 }}>
        {customDataTable ? (
          customDataTable(data)
        ) : (
          <>
            <div className={style.tableHeader}>
              <div>{title}</div>
              <div>
                {rightNode}
                <Tooltip title="刷新">
                  <Icon type="reload" onClick={getData} style={{ marginLeft: 12 }} />
                </Tooltip>
                <Tooltip title="密度">
                  <Dropdown overlay={menu} placement="bottomLeft" trigger={['click']}>
                    <Icon type="column-height" style={{ marginLeft: 12 }} />
                  </Dropdown>
                </Tooltip>
              </div>
            </div>
            <Table
              size={size}
              loading={loading}
              columns={columns}
              dataSource={data}
              rowKey={'id'}
              pagination={false}
              {...(scroll ? { scroll } : {})}
            />
          </>
        )}
        <Pagination
          page={page}
          pageSize={pageSize}
          total={total}
          onChange={(page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          }}
        />
      </div>
    </div>
  );
};

export default SPTDataTable;
