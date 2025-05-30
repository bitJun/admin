import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import {
  Flex,
  Space,
  Button,
  Input,
} from 'antd';
import {
  postMembershipCards
} from '@/services/api';
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';

interface CardItemProps {
  id: number;
  cardType: string;
  price: number;
  createdTime: string;
  updatedTime: string;
}

const AccessPage: React.FC = () => {
  
  const [list, setList] = useState<Array<CardItemProps> | []>([]);

  useEffect(()=>{
    onLoadList();
  }, []);

  const onLoadList = () => {
    postMembershipCards({})
      .then((res) => {
        console.log(res);
      })
  }


  return (
    <PageContainer
      ghost
      header={{
        title: '会员类型',
      }}
    >
      <div style={{width: '700px'}}>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <p style={{marginBottom: 0}}>月卡</p>
          <Flex justify={'flex-start'} align={'center'}>
            设置月卡价格：
            &nbsp;&nbsp;&nbsp;
            <Input prefix="￥" suffix="元" style={{width: '400px'}}/>
            &nbsp;&nbsp;&nbsp;
            <Button type='primary'>保存设置</Button>
          </Flex>
          <p style={{marginBottom: 0}}>季卡</p>
          <Flex justify={'flex-start'} align={'center'}>
            设置季卡价格：
            &nbsp;&nbsp;&nbsp;
            <Input prefix="￥" suffix="元" style={{width: '400px'}}/>
            &nbsp;&nbsp;&nbsp;
            <Button type='primary'>保存设置</Button>
          </Flex>
          <p style={{marginBottom: 0}}>年卡</p>
          <Flex justify={'flex-start'} align={'center'}>
            设置年卡价格：
            &nbsp;&nbsp;&nbsp;
            <Input prefix="￥" suffix="元" style={{width: '400px'}}/>
            &nbsp;&nbsp;&nbsp;
            <Button type='primary'>保存设置</Button>
          </Flex>
          <Flex justify={'center'} align={'center'}>
            <Button type='primary'>确认价格</Button>
          </Flex>
        </Space>
      </div>

    </PageContainer>
  );
};

export default AccessPage;
