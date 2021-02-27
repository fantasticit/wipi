import React, { useState, useEffect, useCallback } from 'react';
import { Table, Menu, Dropdown, Icon, Tooltip } from 'antd';
import { TableSize } from 'antd/es/table';
import { Pagination } from '@/components/Pagination';
import { IFieldItem, Search } from '@/components/Search';
import style from './index.module.scss';

interface IProps {
  title?: React.ReactNode;
  rightNode?: React.ReactNode;
  padding?: number;
  scroll?: { x?: number; y?: number };
  searchFields: Array<IFieldItem>;
  showSearchLabel?: boolean;
  columns: Array<unknown>;
  data: Array<unknown>;
  customDataTable?: (data) => React.ReactNode;
  defaultTotal: number;
  onSearch: (arg) => Promise<unknown>;
}

export const DataTable: React.FC<IProps> = ({
  title,
  rightNode,
  padding = 24,
  scroll = null,
  searchFields = [],
  showSearchLabel = true,
  columns = [],
  data,
  defaultTotal,
  onSearch,
  customDataTable = null,
}) => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [size, setSize] = useState<TableSize>('default');
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
      <Menu.Item onClick={() => setSize('middle')}>中等</Menu.Item>
    </Menu>
  );

  return (
    <div className={style.wrapper}>
      <Search
        fields={searchFields}
        showLabel={showSearchLabel}
        onSearch={(params) => {
          setPage(1);
          updateSearchParams(params);
        }}
      />
      <div style={{ background: '#fff', padding }}>
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

export default DataTable;
