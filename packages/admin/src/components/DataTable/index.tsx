import React, { useState, useEffect, useCallback, useReducer } from 'react';
import { Table, Icon, Tooltip } from 'antd';
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

const initialParams = { page: 1, pageSize: 12 };
function reducer(state: typeof initialParams, action) {
  switch (action.type) {
    case 'page':
      return { ...state, page: action.payload };
    case 'pageSize':
      return { ...state, pageSize: action.payload };
    case 'params':
      return { ...state, ...action.payload };
    default:
      return state;
  }
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
  const [size, setSize] = useState<TableSize>('default');
  const [total, setTotal] = useState(defaultTotal);
  const [params, dispatch] = useReducer(reducer, initialParams);

  const getData = useCallback(() => {
    setLoading(true);
    onSearch(params)
      .then((res) => {
        setTotal(res[1]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [onSearch, params]);

  useEffect(() => {
    getData();
  }, [params]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={style.wrapper}>
      <Search
        fields={searchFields}
        showLabel={showSearchLabel}
        padding={padding}
        onSearch={(params) => {
          dispatch({ type: 'page', payload: 1 });
          dispatch({ type: 'params', payload: params });
        }}
      />
      <div style={{ background: '#fff', padding }}>
        {customDataTable ? (
          <>
            <div className={style.tableHeader}>
              <div>{title}</div>
              <div>{rightNode}</div>
            </div>
            {customDataTable(data)}
          </>
        ) : (
          <>
            <div className={style.tableHeader}>
              <div>{title}</div>
              <div>
                {rightNode}
                <Tooltip title="刷新">
                  <Icon type="reload" onClick={getData} style={{ marginLeft: 12 }} />
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
          page={params.page}
          pageSize={params.pageSize}
          total={total}
          onChange={(page, pageSize) => {
            dispatch({ type: 'page', payload: page });
            dispatch({ type: 'pageSize', payload: pageSize });
          }}
        />
      </div>
    </div>
  );
};

export default DataTable;
