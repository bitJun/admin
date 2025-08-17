import { PageContainer } from '@ant-design/pro-components';
import React, { useState, useEffect } from 'react';
import {
  Button,
  Flex,
  Input,
  Table,
  Card
} from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import {
  queryFinanceList
} from '@/services/api';

const { Search } = Input;

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];


const columns: TableColumnsType= [
  { title: '序号', dataIndex: 'index' },
  { title: '用户名', dataIndex: 'userName', render: (text, record, index) => record.username },
  { title: '用户ID', dataIndex: 'userId', render: (text, record, index) => record.order.buyerId },
  { title: '充值时间', dataIndex: 'createdTime', render: (text, record, index) => record.order.createTime },
  { title: '充值金额(元)', dataIndex: 'address', render: (text, record, index) => <span>{record.order.amount}元</span> },
  { title: '有效期', dataIndex: 'address', render: (text, record, index) => record.order.durationTime },
  { title: '充值类型', dataIndex: 'address', render: (text, record, index) => record.orderType },
];

const FinancePage = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [userId, setUserId] = useState<number>();
  const [userName, setUserName] = useState<string>('');
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  useEffect(()=>{
    onLoadData();
  }, [pageIndex, userId]);

  const onLoadData = () => {
    let params = {
      page_id: pageIndex,
      page_size: pageSize,
      user_name: userName
    }
    queryFinanceList(params)
      .then((res)=>{
        console.log('res', res);
        let {
          orders
        } = res;
        orders = orders.map((item:any, index:number)=>{
          item.index = index;
          return item;
        })
        setList(orders);
      })
  }

  const rowSelection: TableRowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  const onSearch = () => {
    onLoadData();
  }

  return (
    <PageContainer
      ghost
      header={{
        title: '财务管理',
      }}
    >
      <Card>
        <Flex justify={'space-between'} align={'center'}>
          {/* <Button type="primary">Primary</Button> */}
          <Search
            placeholder="搜索用户ID"
            onSearch={onSearch}
            style={{
              width: 300,
            }}
            value={userName}
            onInput={(val:any)=>{
              console.log('val', val.target.value);
              setUserName(val.target.value);
            }}
            enterButton="搜索"
          />
          {/* <Button type="primary">导出Excel</Button> */}
        </Flex>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={list}
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
      </Card>
    </PageContainer>
  );
};

export default FinancePage;
