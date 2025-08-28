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
  queryCardOrder
} from '@/services/api';

const { Search } = Input;
const { RangePicker } = DatePicker;

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];


const columns: TableColumnsType<any> = [
  { title: '序号', dataIndex: 'id' },
  { title: '卡号区间', dataIndex: 'range', render: (text, record, index) => `${record.rangeStart} - ${record.rangeEnd}`},
  { title: '发行张数', dataIndex: 'createNum' },
  // { title: '发行费用', dataIndex: 'register_time' },
  { title: '发行人', dataIndex: 'createdUser' },
  { title: '发行时间', dataIndex: 'createdTime' },
  { title: '备注', dataIndex: 'remark' },
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
  const [total, setTotal] = useState(0);

  useEffect(()=>{
    onLoadList();
  }, [range]);

  const onLoadList = () => {
    let params = {
      keyword: keyword,
      startCreateTime: `${range[0]} 00:00:00`,
      endCreateTime: `${range[1]} 23:59:59`,
      page_id: pageIndex.current,
      page_size: pageSize.current,
    }
    console.log(range)
    queryCardOrder(params)
      .then(res=>{
        console.log('res', res);
        setList(res.orders);
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
        title: '发行记录',
      }}
    >
      <Card>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <Flex justify={'space-between'} align={'center'}>
            {/* <Button type="primary">Primary</Button> */}
            <Search
              placeholder="请输入备注/卡号"
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
            <RangePicker
              format="YYYY-MM-DD"
              value={[dayjs(range[0]), dayjs(range[1])]}
              // defaultValue={range}
              onChange={(value:any)=>{setRange([value[0].format('YYYY-MM-DD'), value[1].format('YYYY-MM-DD')])}}
            />
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
