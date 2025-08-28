import { PageContainer } from '@ant-design/pro-components';
import { Access, useAccess } from '@umijs/max';
import {
  Button,
  Card,
  Flex,
  Col,
  Row,
  DatePicker,
  Pagination,
  Popconfirm,
  Drawer,
  Form,
  Input,
  message,
  Select
} from 'antd';
import {history} from 'umi';
import dayjs from 'dayjs';
import type { PopconfirmProps } from 'antd';
import React, { useState, useEffect, useRef } from 'react';
import {
  queryActivityList,
  delArticles
} from '@/services/api';
import styles from './index.less';

const { TextArea } = Input;
const ActivityList: React.FC = () => {
  const [id, setId] = useState(null);
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const pageIndex = useRef(1);
  const pageSize = useRef(10);
  const [range, setRange] = useState([]);
  const downTime = useRef('');
  const upTime = useRef('');

  useEffect(()=>{
    onLoadList();
  }, []);

  useEffect(()=>{
    if (id) {
      pageIndex.current = 1;
      onLoadList();
    }
  }, [id]);

  const onLoadList = () => {
    let params = {
      pageIndex: pageIndex.current,
      pageSize: pageSize.current,
      category: '',
      orderBy: 'publishTime',
      orderDirection: 'DESC',
      groupBy: '',
      keyword: '',
      tagIds: [],
      downTime: downTime.current,
      upTime: upTime.current,
      offset: 0
    }
    queryActivityList(params)
      .then(res=>{
        setList(res.data)
        setTotal(res.totalCount);
      });
  }

  const onDel = (id: number) => {
    delArticles({id: id})
      .then(res=>{
        if (res.success) {
          onLoadList();
        }
      });
  }

  const cancel: PopconfirmProps['onCancel'] = (e) => {
    console.log(e);
  };

  const onAdd = () => {
    history.push({
      pathname: '/activity/detail',
      search: '?type=add'
    });
  }

  const onDetail = (id: number) => {
    history.push({
      pathname: '/activity/detail',
      search: `?type=detail&id=${id}`
    });
  }

  const onEdit = (id: number) => {
    history.push({
      pathname: '/activity/detail',
      search: `?type=edit&id=${id}`
    });
  }

  useEffect(()=>{
    if (range && range.length > 0) {
      downTime.current = dayjs(range[0]).format('YYYY-MM-DD HH:mm:ss');
      upTime.current = dayjs(range[1]).format('YYYY-MM-DD HH:mm:ss');
      pageIndex.current = 1;
      onLoadList();
    } else {
      downTime.current = '';
      upTime.current = '';
      pageIndex.current = 1;
      onLoadList();
    }
  }, [range])

  return (
    <PageContainer
      ghost
      header={{
        title: '活动列表',
      }}
    >
      <Card>
        <Flex
          align={'center'}
          justify={'space-between'}
          style={{
            marginBottom: '20px'
          }}
        >
          <DatePicker.RangePicker
            value={range}
            onChange={(val)=>{
              console.log('val', val);
              setRange(val);
            }}
          />
          <Button
            type='primary'
            onClick={()=>{onAdd()}}
          >
            新增
          </Button>
        </Flex>
        <Row gutter={16}>
          {
            list.map((item:any)=>
              <Col span={8} style={{marginBottom: '20px'}} key={item.id}>
                <Card>
                  <div className={styles.flexBox}>
                    <img
                      src={`https://youjia-admin.529603395.xyz/${item.coverImage}`}
                      className={styles.img}
                    />
                    <div className={styles.content}>
                      <div>
                        {item.title}
                      </div>
                      <Flex justify='space-between' style={{width: '100%'}}>
                        <div>
                          {item.category}:{item.publishTime}
                        </div>
                        <div>{item.readCount}人阅读</div>
                      </Flex>
                    </div>
                  </div>
                  <Flex justify='space-between'>
                    <Popconfirm
                      title="提示"
                      description="确定删除吗？"
                      onConfirm={()=>{onDel(item.id)}}
                      onCancel={cancel}
                      okText="确定"
                      cancelText="取消"
                    >
                      <Button danger>删除</Button>
                    </Popconfirm>
                    <Button color="primary" variant="outlined" onClick={()=>{onEdit(item.id)}}>编辑</Button>
                    <Button type="primary" onClick={()=>{onDetail(item.id)}}>查看详情</Button>
                  </Flex>
                </Card>
              </Col>
            )
          }
        </Row>
        <Flex justify='flex-end'>
          <Pagination
            total={total}
            current={pageIndex.current}
            onChange={(page, val)=>{
              pageIndex.current = page;
              console.log('val', val)
              pageSize.current = val;
              onLoadList();
            }}
            pageSize={pageSize.current}
            showSizeChanger
          />
        </Flex>
      </Card>
    </PageContainer>
  );
};

export default ActivityList
