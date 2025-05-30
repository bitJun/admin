import { PageContainer } from '@ant-design/pro-components';
import React, { useState, useEffect } from 'react';
import {
  Button,
  Flex,
  Input,
  Table,
  Select,
  Space,
  DatePicker
} from 'antd';
import type { TableColumnsType, TableProps } from 'antd';

const { Search } = Input;
const { RangePicker } = DatePicker;

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const columns: TableColumnsType<DataType> = [
  { title: '序号', dataIndex: 'name' },
  { title: '微信昵称', dataIndex: 'age' },
  { title: '注册手机号', dataIndex: 'address' },
  { title: '注册时间', dataIndex: 'address' },
  { title: '学生姓名', dataIndex: 'address' },
  { title: '性别', dataIndex: 'address' },
  { title: '年龄', dataIndex: 'address' },
  { title: '高考年份', dataIndex: 'address' },
  { title: '科目', dataIndex: 'address' },
  { title: '省份', dataIndex: 'address' },
  { title: '成绩', dataIndex: 'address' },
  { title: '会员卡号', dataIndex: 'address' },
  { title: '目标院校', dataIndex: 'address' },
];

const dataSource = Array.from<DataType>({ length: 46 }).map<DataType>((_, i) => ({
  key: i,
  name: `Edward King ${i}`,
  age: 32,
  address: `London, Park Lane no. ${i}`,
}));


const MemberList = () => {

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);

  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const onSearch = () => {
    
  }

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  

  return (
    <PageContainer
      ghost
      header={{
        title: '用户管理',
      }}
    >
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Flex justify={'space-between'} align={'center'}>
          {/* <Button type="primary">Primary</Button> */}
          <Search
            placeholder="来源标识/学生/家长/老师/手机号/卡号"
            onSearch={onSearch}
            style={{
              width: 400,
            }}
            enterButton="搜索"
          />
          <Flex justify={'flex-start'} align={'center'} gap={10}>
            <Button type="primary">创建用户</Button>
            <Button type="primary">导出Excel</Button>
          </Flex>
        </Flex>
        <Flex justify={'flex-start'} align={'center'} gap={10}>
          <Select
            defaultValue="lucy"
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              { value: 'jack', label: 'Jack' },
              { value: 'lucy', label: 'Lucy' },
              { value: 'Yiminghe', label: 'yiminghe' },
              { value: 'disabled', label: 'Disabled', disabled: true },
            ]}
          />
          <Select
            defaultValue="lucy"
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              { value: 'jack', label: 'Jack' },
              { value: 'lucy', label: 'Lucy' },
              { value: 'Yiminghe', label: 'yiminghe' },
              { value: 'disabled', label: 'Disabled', disabled: true },
            ]}
          />
          <Select
            defaultValue="lucy"
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              { value: 'jack', label: 'Jack' },
              { value: 'lucy', label: 'Lucy' },
              { value: 'Yiminghe', label: 'yiminghe' },
              { value: 'disabled', label: 'Disabled', disabled: true },
            ]}
          />
          <Select
            defaultValue="lucy"
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              { value: 'jack', label: 'Jack' },
              { value: 'lucy', label: 'Lucy' },
              { value: 'Yiminghe', label: 'yiminghe' },
              { value: 'disabled', label: 'Disabled', disabled: true },
            ]}
          />
          <Select
            defaultValue="lucy"
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              { value: 'jack', label: 'Jack' },
              { value: 'lucy', label: 'Lucy' },
              { value: 'Yiminghe', label: 'yiminghe' },
              { value: 'disabled', label: 'Disabled', disabled: true },
            ]}
          />
          <RangePicker />
          成绩:
          <Input style={{ width: 120 }} />
          -
          <Input style={{ width: 120 }} />
          <Button
            type="primary"
          >
            筛选
          </Button>
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
      </Space>
    </PageContainer>
  );
};

export default MemberList;
