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
import dayjs from 'dayjs';
import {
  queryCardList
} from '@/services/api';

const { Search } = Input;
const { RangePicker } = DatePicker;

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];


const columns: TableColumnsType<any> = [
  { title: '卡号', dataIndex: 'cardNumber' },
  { title: '发行时间', dataIndex: 'createTime' },
  { title: '绑定状态', dataIndex: 'userTel' },
  { title: '激活', dataIndex: 'createdTime', render: (text, record, index) => record.bound ? '已激活' : '未激活' },
  { title: '激活时间', dataIndex: 'updateTime' },
  // { title: '操作', dataIndex: 'score' }
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
  const [range, setRange] = useState<any>([dayjs().startOf('month').format('YYYY-MM-DD'), dayjs().endOf('month').format('YYYY-MM-DD')]);
  const [range1, setRange1] = useState<any>([dayjs().startOf('month').format('YYYY-MM-DD'), dayjs().endOf('month').format('YYYY-MM-DD')]);
  const [total, setTotal] = useState(0);
  const [info, setInfo] = useState<any>({
    range: [dayjs().startOf('month').format('YYYY-MM-DD'), dayjs().endOf('month').format('YYYY-MM-DD')],
    range1: [dayjs().startOf('month').format('YYYY-MM-DD'), dayjs().endOf('month').format('YYYY-MM-DD')],
    rangeStart: '',
    rangeEnd: '',
    state: 0
  });

  useEffect(()=>{
    onLoadList();
  }, [info]);

  const onLoadList = () => {
    let params = {
      keyword: keyword,
      startCreateTime: `${info.range[0]} 00:00:00`,
      endCreateTime: `${info.range[1]} 23:59:59`,
      startActiveTime: info.state == 1 ? `${info.range1[0]} 00:00:00` : '',
      endActiveTime: info.state == 1 ? `${info.range1[1]} 23:59:59` : '',
      state: info.state,
      page_id: pageIndex.current,
      page_size: pageSize.current,
      rangeStart: Number(info.rangeStart) || '',
      rangeEnd: Number(info.rangeEnd) || '',
    }
    queryCardList(params)
      .then(res=>{
        setList(res.singleCards);
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
        title: '卡列表',
      }}
    >
      <Card>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <Flex justify={'space-between'} align={'center'}>
            {/* <Button type="primary">Primary</Button> */}
            <Search
              placeholder="请输入卡号/用户手机号"
              onSearch={onSearch}
              onChange={e=>setKeyword(e.target.value)}
              style={{
                width: 400,
              }}
              enterButton="搜索"
            />
            {/* <Flex justify={'flex-start'} align={'center'} gap={10}>
              <Button type="primary">导出Excel</Button>
            </Flex> */}
          </Flex>
          <Flex justify={'flex-start'} align={'center'} gap={10}>
            激活状态:
            <Select
              value={info.state}
              onChange={(value:any)=>{setInfo({...info, state: value})}}
            >
              <Select.Option value={''}>全部</Select.Option>
              <Select.Option value={1}>已激活</Select.Option>
              <Select.Option value={0}>未激活</Select.Option>
            </Select>
            卡区间:
            <Input
              type='number' 
              value={info.rangeStart}
              onInput={(e:any)=>{setInfo({...info, rangeStart: e.target.value})}}
              style={{
                width: '130px'
              }}
            />
            -
            <Input
              type='number'
              value={info.rangeEnd}
              onInput={(e:any)=>{setInfo({...info, rangeEnd: e.target.value})}}
              style={{
                width: '130px'
              }}
            />
          </Flex>
          <Flex justify={'flex-start'} align={'center'} gap={10}>
            发行时间:
            <RangePicker
              format="YYYY-MM-DD"
              value={[dayjs(info.range[0]), dayjs(info.range[1])]}
              // defaultValue={range}
              onChange={(value:any)=>{
                setInfo({
                  ...info,
                  range: [value[0].format('YYYY-MM-DD'), value[1].format('YYYY-MM-DD')],
                })
              }}
            />
            {
              info.state == 1 &&
              <span>激活时间:</span>
            }
            {
              info.state == 1 &&
              <RangePicker
                format="YYYY-MM-DD"
                value={[dayjs(info.range1[0]), dayjs(info.range1[1])]}
                // defaultValue={range}
                onChange={(value:any)=>{
                  setInfo({
                    ...info,
                    range1: [value[0].format('YYYY-MM-DD'), value[1].format('YYYY-MM-DD')],
                  })
                }}
              />
            }
          </Flex>
          <Table<any>
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
