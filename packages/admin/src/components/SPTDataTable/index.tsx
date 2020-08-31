import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { Pagination } from '@/components/Pagination';
import { Search } from '@/components/Search';
import style from './index.module.scss';

interface IProps {
  searchFields: Array<any>;
  columns: Array<any>;
  data: Array<any>;
  customDataTable?: (data) => React.ReactNode;
  defaultTotal: number;
  onSearch: (arg: any) => Promise<any>;
}

export const SPTDataTable: React.FC<IProps> = ({
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
  const [total, setTotal] = useState(defaultTotal);
  const [searchParams, updateSearchParams] = useState({});

  useEffect(() => {
    setLoading(true);
    const params = { page, pageSize, ...searchParams };
    onSearch(params)
      .then(res => {
        setTotal(res[1]);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
      });
  }, [page, pageSize, searchParams]);

  return (
    <div className={style.wrapper}>
      <Search
        fields={searchFields}
        onSearch={params => {
          setPage(1);
          updateSearchParams(params);
        }}
      />
      {customDataTable ? (
        customDataTable(data)
      ) : (
        <Table
          loading={loading}
          columns={columns}
          dataSource={data}
          rowKey={'id'}
          pagination={false}
        />
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
  );
};

export default SPTDataTable;
