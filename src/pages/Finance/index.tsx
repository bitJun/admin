import { PageContainer } from '@ant-design/pro-components';
import React, { useState, useEffect } from 'react';
import {
  Button,
  Flex,
  Input,
  Table
} from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import {
  queryCadrList
} from '@/services/api';

const { Search } = Input;

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const columns: TableColumnsType<DataType> = [
  { title: '序号', dataIndex: 'index' },
  { title: '用户ID', dataIndex: 'userId' },
  { title: '充值时间', dataIndex: 'createdTime' },
  { title: '充值金额(元)', dataIndex: 'address' },
  { title: '有效期', dataIndex: 'address' },
  { title: '充值类型', dataIndex: 'address' },
];

const dataSource = Array.from<DataType>({ length: 46 }).map<DataType>((_, i) => ({
  key: i,
  name: `Edward King ${i}`,
  age: 32,
  address: `London, Park Lane no. ${i}`,
}));


const FinancePage = () => {

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);

  const [pageIndex, setPageIndex] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [userId, setUserId] = useState<number>();

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  useEffect(()=>{
    onLoadData();
  }, [pageIndex, userId]);

  const onLoadData = () => {
    let params = {
      pageIndex,
      pageSize,
      userId
    }
    queryCadrList(params)
      .then((res)=>{
        console.log('res', res);
        let {
          data
        } = res;
        data = data.map((item:any, index:number)=>{
          item.index = index;
          return item;
        })
        setList(data);
      })
  }

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  const onSearch = () => {
    
  }

  return (
    <PageContainer
      ghost
      header={{
        title: '财务管理',
      }}
    >
      <Flex justify={'space-between'} align={'center'}>
        {/* <Button type="primary">Primary</Button> */}
        <Search
          placeholder="搜索用户ID"
          onSearch={onSearch}
          style={{
            width: 300,
          }}
          enterButton="搜索"
        />
        <Button type="primary">导出Excel</Button>
      </Flex>
      <Table<DataType>
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataSource}
        pagination={{
          total: 85,
          defaultCurrent: 1,
          defaultPageSize: 10,
          showSizeChanger: true,
          showTotal: total => `Total ${total} Items`,
          onChange: (page, pageSize) => {
            console.log(page, pageSize);
          },
          onShowSizeChange: (current, size) => {
            console.log(current, size);
          }
        }}
      />
    </PageContainer>
  );
};

export default FinancePage;
