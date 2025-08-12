import { PageContainer } from '@ant-design/pro-components';
import React, { useState, useEffect, useRef } from 'react';
import {
  Button,
  Flex,
  Input,
  Table,
  Select,
  Space,
  DatePicker,
  Card
} from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import {
  queryUserList
} from '@/services/api';

const { Search } = Input;
const { RangePicker } = DatePicker;

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];


const columns: TableColumnsType<any> = [
  { title: '序号', dataIndex: 'id' },
  { title: '微信昵称', dataIndex: 'name' },
  { title: '注册手机号', dataIndex: 'tel' },
  { title: '注册时间', dataIndex: 'register_time' },
  { title: '高考年份', dataIndex: 'examination_year' },
  { title: '科目', dataIndex: 'high_school_subject' },
  { title: '省份', dataIndex: 'province' },
  { title: '成绩', dataIndex: 'score' },
  { title: '会员级别', dataIndex: 'vip_level' },
];

const dataSource = Array.from<any>({ length: 46 }).map<any>((_, i) => ({
  key: i,
  name: `Edward King ${i}`,
  age: 32,
  address: `London, Park Lane no. ${i}`,
}));


const MemberList = () => {

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState('');
  const pageIndex = useRef(1);
  const pageSize = useRef(10);
  const [list, setList] = useState([]);
  const examinationYear = useRef('');
  const [total, setTotal] = useState(0);

  useEffect(()=>{
    onLoadList();
  }, []);

  const onLoadList = () => {
    let params = {
      pageSize: pageSize.current,
      pageIndex: pageIndex.current,
      vip_level: 0,
      key_word: keyword,
      examination_year: examinationYear.current,
      subject: '',
      province: '',
      begin_register_time: '',
      end_register_time: '',
      lowerest_score: '',
      highest_score: ''
    }
    queryUserList(params)
      .then(res=>{
        console.log('res', res);
        setList(res.data);
        setTotal(res.total)
      })
  }

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

  const rowSelection: TableRowSelection<any> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const onSearch = () => {
    pageIndex.current = 1;
    onLoadList();
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
      <Card>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <Flex justify={'space-between'} align={'center'}>
            {/* <Button type="primary">Primary</Button> */}
            <Search
              placeholder="来源标识/学生/家长/老师/手机号/卡号"
              onSearch={onSearch}
              onChange={e=>setKeyword(e.target.value)}
              style={{
                width: 400,
              }}
              enterButton="搜索"
            />
            <Flex justify={'flex-start'} align={'center'} gap={10}>
              <Button type="primary">导出Excel</Button>
            </Flex>
          </Flex>
          <Flex justify={'flex-start'} align={'center'} gap={10}>
            <Select
              defaultValue="高考年份"
              style={{ width: 120 }}
              value={examinationYear.current}
              onChange={(value)=>{
                console.log('value', value)
                examinationYear.current = value;
                pageIndex.current = 1;
                onLoadList();
              }}
              options={[
                { value: '2021', label: '2021' },
                { value: '2022', label: '2022' },
                { value: '2023', label: '2023' },
                { value: '2024', label: '2024' },
                { value: '2025', label: '2025' },
                { value: '2026', label: '2026' },
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
          <Table<any>
            rowSelection={rowSelection}
            columns={columns}
            dataSource={list}
            pagination={{
              total: total,
              defaultCurrent: 1,
              defaultPageSize: 10,
              showSizeChanger: true,
              showTotal: total => `Total ${total} Items`,
              onChange: (page, size) => {
                pageIndex.current = page;
                pageSize.current = size;
                onLoadList();
                console.log(page, pageSize);
              },
              onShowSizeChange: (current, size) => {
                console.log(current, size);
              }
            }}
          />
        </Space>
      </Card>
    </PageContainer>
  );
};

export default MemberList;
