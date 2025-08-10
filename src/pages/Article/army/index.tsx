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
import dayjs from 'dayjs';
import type { PopconfirmProps } from 'antd';
import React, { useState, useEffect, useRef } from 'react';
import {
  queryArticlesTags,
  updateArticles,
  addArticles,
  queryArticlesList,
  delArticles,
  queryArticlesFields,
  queryArticlesById
} from '@/services/api';
import styles from './index.less';

const { TextArea } = Input;
const AccessPage: React.FC = () => {
  const access = useAccess();
  const [tags, setTags] = useState([]);
  const [category, setCategory] = useState('');
  const [id, setId] = useState(null);
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const pageIndex = useRef(1);
  const pageSize = useRef(10);
  const [range, setRange] = useState([]);
  const downTime = useRef('');
  const upTime = useRef('');
  const [show, setShow] = useState(false);
  const [type, setType] = useState('');
  const [title, setTitle] = useState('');
  const [fieldIds, setFieldIds] = useState([]);
  const [article, setArticle] = useState({
    title: '',
    author: '',
    publishTime: '',
    coverImage: '',
    content: '',
    category: '',
    tagIds: [],
    id: undefined
  });
  const [form] = Form.useForm();

  useEffect(()=>{
    onLoadTag(); 
    onLoadList();
    onLoadArticlesFields();
  }, []);

  useEffect(()=>{
    if (category) {
      pageIndex.current = 1;
      onLoadList();
    }
  }, [category]);

  const onLoadTag = () => {
    queryArticlesTags()
      .then(res=>{
        setTags(res.data.filter((item:any)=>item.category === 'military'));
      });
  }

  const onLoadArticlesFields = () => {
    queryArticlesFields()
      .then(res=>{
        setFieldIds(res.data);
      });
  }

  const onLoadList = () => {
    let params = {
      pageIndex: pageIndex.current,
      pageSize: pageSize.current,
      category: category,
      orderBy: 'publishTime',
      orderDirection: 'DESC',
      groupBy: '',
      keyword: '',
      tagIds: [],
      downTime: downTime.current,
      upTime: upTime.current,
      offset: 0
    }
    queryArticlesList(params)
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

  const onClose = () => {
    setShow(false);
    setType('');
    setTitle('');
  }

  useEffect(()=>{
    if (!show) {
      
      setType('');
      setTitle('');
      setArticle({
        title: '',
        author: '',
        publishTime: '',
        coverImage: '',
        content: '',
        category: '',
        tagIds: [],
        id: undefined
      });
    }
  }, [show]);

  useEffect(()=>{
    console.log('article', article);
  }, [article]);

  const onSubmit = () => {
    let params = {
      ...article
    }
    console.log('params',params)
    params.category = 'military';
    if (params.id) {
      updateArticles(params)
        .then(res=>{
          message.success('编辑成功');
          onLoadList();
          setShow(false);
        })
    } else {
      params.publishTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
      addArticles(params)
        .then(res=>{
          message.success('新增成功');
          pageIndex.current = 1;
          onLoadList();
          setShow(false);
        })
    }
  }

  const onAdd = () => {
    setType('add');
    setTitle('新增文章');
    setShow(true);
  }

  const onDetail = (id: number) => {
    queryArticlesById(id)
      .then(res=>{
        let json = {...res.data};
        if (json.tags) {
          let ids:any = [];
          json.tags.forEach((item:any)=>{
            ids.push(item.id);
          })
          json.tagIds = ids;
        }
        setArticle(json);
        setType('detail');
        setTitle('文章详情');
        setShow(true);
      });
  }

  const onEdit = (id: number) => {
    queryArticlesById(id)
      .then(res=>{
        console.log('res', res.data)
        let json = {...res.data};
        if (json.tags) {
          let ids:any = [];
          json.tags.forEach((item:any)=>{
            ids.push(item.id);
          })
          json.tagIds = ids;
        }
        setArticle(json);
        setType('edit');
        setTitle('编辑文章');
        setShow(true);
      });
  }

  useEffect(()=>{
    console.log('range', range)
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
        title: '权限示例',
      }}
    >
      <Card>
        <Flex
          justify={'space-between'}
        >
          <Flex
            align={'center'}
          >
            {
              tags.map((item:any)=>
                <div
                  onClick={()=>{
                    setCategory(item.category);
                    setId(item.id)
                  }}
                  className={`${styles.tag} ${item.id === id ? `${styles.active}` : ''}`}
                  key={item.id}
                >
                  {item.name}
                </div>
              )
            }
          </Flex>
          <Flex
            align={'center'}
          >
            <Button
              type='primary'
              onClick={()=>{onAdd()}}
            >
              新增
            </Button>
          </Flex>
        </Flex>
        <Flex
          align={'center'}
          style={{
            marginTop: '20px',
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
        </Flex>
        <Row gutter={16}>
          {
            list.map((item:any)=>
              <Col span={8} style={{marginBottom: '20px'}}>
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
                      title="Delete the task"
                      description="Are you sure to delete this task?"
                      onConfirm={()=>{onDel(item.id)}}
                      onCancel={cancel}
                      okText="Yes"
                      cancelText="No"
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
      <Drawer
        title={title}
        placement={'right'}
        closable={false}
        onClose={onClose}
        open={show}
        footer={
          <Flex justify='flex-end' gap={'10px'}>
            <Button onClick={onClose}>取消</Button>
            {
              type != 'detail' &&
              <Button type='primary' onClick={onSubmit}>确定</Button>
            }
          </Flex>
        }
      >
        <Form
          form={form}
          initialValues={article} 
          onValuesChange={(val)=>{
            console.log('val', val);
            setArticle({
              ...article,
              ...val
            })
          }}
        >
          <Form.Item
            label='标题'
            name='title'
          >
            <Input 
              value={article.title}
              placeholder='请输入标题'
              readOnly={type === 'detail'}
              // onInput={(e:any)=>{
              //   setArticle({
              //     ...article,
              //     title: e.target.value
              //   })
              // }}
            />
          </Form.Item>
          <Form.Item
            label='作者'
            name='author'
          >
            <Input 
              value={article.author}
              placeholder='请输入作者'
              readOnly={type === 'detail'}
              // onInput={(e:any)=>{
              //   setArticle({
              //     ...article,
              //     author: e.target.value
              //   })
              // }}
            />
          </Form.Item>
          <Form.Item
            label='内容'
            name='content'
          >
            <TextArea 
              value={article.content}
              placeholder='请输入内容'
              readOnly={type === 'detail'}
              // onInput={(e:any)=>{
              //   setArticle({
              //     ...article,
              //     content: e.target.value
              //   })
              // }}
            />
          </Form.Item>
          <Form.Item
            label='标签'
            name='tag'
          >
            <Select
              mode='multiple'
              value={article.tagIds}
              disabled={type === 'detail'}
              // onChange={(val)=>{
              //   setArticle({
              //     ...article,
              //     tagIds: val
              //   })
              // }}
            >
              {
                tags.map((item:any)=>
                  <Select.Option
                    key={item.id}
                    value={item.id}
                  >
                    {item.name}
                  </Select.Option>
                )
              }
            </Select>
          </Form.Item>
        </Form>
      </Drawer>
    </PageContainer>
  );
};

export default AccessPage
