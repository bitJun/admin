import { PageContainer } from '@ant-design/pro-components';
import { Access, useAccess } from '@umijs/max';
import {
  Button,
  Card,
  Flex,
  Col,
  Row,
  DatePicker
} from 'antd';
import React, { useState, useEffect } from 'react';
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

const AccessPage: React.FC = () => {
  const access = useAccess();
  const [pageIndex, setPageIndex] = useState(1);
  const [tags, setTags] = useState([]);
  const [category, setCategory] = useState('');
  const [id, setId] = useState(null);
  const [list, setList] = useState([]);

  useEffect(()=>{
    onLoadTag(); 
    onLoadList();
  }, []);

  useEffect(()=>{
    if (category) {
      onLoadList();
    }
  }, [category]);

  const onLoadTag = () => {
    queryArticlesTags()
      .then(res=>{
        console.log('res', res)
        setTags(res.data);
      });
  }

  const onLoadList = () => {
    let params = {
      pageIndex: pageIndex,
      pageSize: 10,
      category: category
    }
    queryArticlesList(params)
      .then(res=>{
        setList(res.data)
      });
  }

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
            
          />
        </Flex>
        <Row gutter={16}>
          {
            list.map((item:any)=>
              <Col span={6}>
                <Card>
                  <div>
                    <div>
                      {item.title}
                    </div>
                    <div>
                      {item.content}
                    </div>
                  </div>
                </Card>
              </Col>
            )
          }
        </Row>
      </Card>
    </PageContainer>
  );
};

export default AccessPage
